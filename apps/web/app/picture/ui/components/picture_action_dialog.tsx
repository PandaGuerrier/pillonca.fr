import { useForm } from '@inertiajs/react'
import { useEffect, useRef, useState } from 'react'

import { urlFor } from '~/app/client'

import { Button } from '@workspace/ui/components/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@workspace/ui/components/dialog'
import { Field, FieldLabel } from '@workspace/ui/components/field'
import { FieldErrorBag } from '@workspace/ui/components/field-error-bag'
import { Input } from '@workspace/ui/components/input'
import { Progress } from '@workspace/ui/components/progress'
import { ScrollArea } from '@workspace/ui/components/scroll-area'
import { Textarea } from '@workspace/ui/components/textarea'
import { Checkbox } from '@workspace/ui/components/checkbox'
import { ImageIcon, UploadIcon } from 'lucide-react'
import { toast } from '@workspace/ui/hooks/use-toast'
import { cn } from '@workspace/ui/lib/utils'

export interface Picture {
  uuid: string
  title: string
  description: string | null
  isActive: boolean
  fileUrl: string | null
  createdAt: string
  updatedAt: string | null
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Picture
}

export function PictureActionDialog({ open, onOpenChange, currentRow }: Props) {
  const isEdit = !!currentRow
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(currentRow?.fileUrl ?? null)

  const { data, setData, errors, post, put, progress, clearErrors, reset, processing } = useForm<{
    title: string
    description: string
    isActive: boolean
    file: File | null
  }>({
    title: currentRow?.title ?? '',
    description: currentRow?.description ?? '',
    isActive: currentRow?.isActive ?? true,
    file: null,
  })

  useEffect(() => {
    if (open) {
      setPreview(currentRow?.fileUrl ?? null)
    }
  }, [open, currentRow])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setData('file', file)
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const url = isEdit
      ? urlFor('pictures.update', { id: currentRow!.uuid })
      : urlFor('pictures.store')

    const method = isEdit ? put : post

    method(url, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => {
        onOpenChange(false)
        setTimeout(() => {
          reset()
          clearErrors()
          setPreview(null)
        }, 300)
        toast(isEdit ? 'Photo mise à jour' : 'Photo ajoutée', {
          description: data.title,
        })
      },
    })
  }

  function handleClose(state: boolean) {
    onOpenChange(state)
    if (!state) {
      setTimeout(() => {
        reset()
        clearErrors()
        setPreview(currentRow?.fileUrl ?? null)
      }, 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>{isEdit ? 'Modifier la photo' : 'Ajouter une photo'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Modifiez les informations de la photo.'
              : 'Ajoutez une nouvelle photo à la galerie.'}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <form id="picture-form" onSubmit={handleSubmit} className="space-y-4 p-0.5">
            {/* File upload zone */}
            <Field>
              <FieldLabel>Image</FieldLabel>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  'relative w-full overflow-hidden rounded-lg border-2 border-dashed transition-colors',
                  'hover:border-primary/60 hover:bg-primary/5',
                  errors.file ? 'border-destructive' : 'border-border',
                  preview ? 'h-52' : 'h-36'
                )}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Aperçu"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
                    <ImageIcon className="size-8 opacity-50" />
                    <span className="text-sm font-medium">Cliquer pour choisir une image</span>
                    <span className="text-xs opacity-60">PNG, JPG, GIF, WebP — max 10 Mo</span>
                  </div>
                )}
                {preview && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
                    <UploadIcon className="size-6 text-white" />
                    <span className="ml-2 text-sm font-medium text-white">Changer l'image</span>
                  </div>
                )}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/gif,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
              <FieldErrorBag errors={errors} field="file" />
            </Field>

            <Field>
              <FieldLabel htmlFor="title">Titre</FieldLabel>
              <Input
                id="title"
                placeholder="Nom de la réalisation"
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className={cn(errors.title && 'border-destructive')}
              />
              <FieldErrorBag errors={errors} field="title" />
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                placeholder="Description optionnelle..."
                rows={3}
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className={cn(errors.description && 'border-destructive')}
              />
              <FieldErrorBag errors={errors} field="description" />
            </Field>

            <Field className="flex flex-row items-center gap-3">
              <Checkbox
                id="isActive"
                checked={data.isActive}
                onCheckedChange={(checked) => setData('isActive', !!checked)}
              />
              <FieldLabel htmlFor="isActive" className="cursor-pointer font-normal">
                Visible sur le site
              </FieldLabel>
            </Field>

            {progress && (
              <Progress value={progress.percentage} max={100} className="h-1.5 w-full rounded" />
            )}
          </form>
        </ScrollArea>

        <DialogFooter className="gap-y-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={processing}>
              Annuler
            </Button>
          </DialogClose>
          <Button type="submit" form="picture-form" disabled={processing}>
            {isEdit ? 'Enregistrer' : 'Ajouter'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
