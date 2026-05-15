import { useState } from 'react'

import type { InertiaProps } from '#core/ui/types'
import AppLayout from '#common/ui/components/app_layout'
import Heading from '#common/ui/components/heading'
import { Main } from '#common/ui/components/main'

import {
  PictureActionDialog,
  type Picture,
} from '#picture/ui/components/picture_action_dialog'
import { PictureDeleteDialog } from '#picture/ui/components/picture_delete_dialog'

import { Button } from '@workspace/ui/components/button'
import { Badge } from '@workspace/ui/components/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@workspace/ui/components/dropdown-menu'
import { ImageIcon, MoreHorizontalIcon, PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { cn } from '@workspace/ui/lib/utils'

type PageProps = InertiaProps<{
  pictures: {
    data: Picture[]
    metadata: {
      total: number
      perPage: number
      currentPage: number
      lastPage: number
    }
  }
  q?: string
}>

type DialogState = 'create' | 'edit' | 'delete' | null

export default function PictureIndexPage({ pictures, q }: PageProps) {
  const [dialogState, setDialogState] = useState<DialogState>(null)
  const [currentRow, setCurrentRow] = useState<Picture | null>(null)

  function openEdit(picture: Picture) {
    setCurrentRow(picture)
    setDialogState('edit')
  }

  function openDelete(picture: Picture) {
    setCurrentRow(picture)
    setDialogState('delete')
  }

  function closeDialog(state: boolean) {
    if (!state) {
      setDialogState(null)
      setTimeout(() => setCurrentRow(null), 300)
    }
  }

  return (
    <AppLayout breadcrumbs={[{ label: 'Tableau de bord', href: '/dashboard' }, { label: 'Photos' }]}>
      <Main>
        <Heading
          title="Galerie photos"
          description={`${pictures.metadata.total} photo${pictures.metadata.total !== 1 ? 's' : ''} au total`}
        >
          <Button onClick={() => setDialogState('create')} className="gap-2">
            <PlusIcon className="size-4" />
            Ajouter une photo
          </Button>
        </Heading>

        {pictures.data.length === 0 ? (
          <EmptyState onAdd={() => setDialogState('create')} />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pictures.data.map((picture) => (
              <PictureCard
                key={picture.uuid}
                picture={picture}
                onEdit={() => openEdit(picture)}
                onDelete={() => openDelete(picture)}
              />
            ))}
          </div>
        )}
      </Main>

      {/* Dialogs */}
      <PictureActionDialog
        key="picture-create"
        open={dialogState === 'create'}
        onOpenChange={(state) => {
          if (!state) setDialogState(null)
        }}
      />

      {currentRow && (
        <>
          <PictureActionDialog
            key={`picture-edit-${currentRow.uuid}`}
            open={dialogState === 'edit'}
            onOpenChange={closeDialog}
            currentRow={currentRow}
          />

          <PictureDeleteDialog
            key={`picture-delete-${currentRow.uuid}`}
            open={dialogState === 'delete'}
            onOpenChange={closeDialog}
            currentRow={currentRow}
          />
        </>
      )}
    </AppLayout>
  )
}

function PictureCard({
  picture,
  onEdit,
  onDelete,
}: {
  picture: Picture
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {picture.fileUrl ? (
          <img
            src={picture.fileUrl}
            alt={picture.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <ImageIcon className="size-10 opacity-30" />
          </div>
        )}

        {/* Active badge overlay */}
        <div className="absolute left-2 top-2">
          <Badge
            variant={picture.isActive ? 'default' : 'secondary'}
            className={cn(
              'text-xs shadow',
              picture.isActive
                ? 'bg-emerald-600/90 text-white hover:bg-emerald-600'
                : 'bg-muted/80 text-muted-foreground'
            )}
          >
            {picture.isActive ? 'Visible' : 'Masquée'}
          </Badge>
        </div>

        {/* Actions menu overlay */}
        <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="size-7 rounded-full bg-background/80 shadow backdrop-blur-sm hover:bg-background"
              >
                <MoreHorizontalIcon className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit} className="gap-2">
                <PencilIcon className="size-3.5" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onDelete}
                className="gap-2 text-destructive focus:text-destructive"
              >
                <Trash2Icon className="size-3.5" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Card body */}
      <div className="p-3">
        <p className="truncate text-sm font-semibold text-card-foreground">{picture.title}</p>
        {picture.description && (
          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{picture.description}</p>
        )}
      </div>
    </div>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 py-20 text-center">
      <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-muted">
        <ImageIcon className="size-6 text-muted-foreground" />
      </div>
      <p className="mb-1 text-base font-semibold text-foreground">Aucune photo</p>
      <p className="mb-5 text-sm text-muted-foreground">
        Commencez par ajouter vos premières réalisations.
      </p>
      <Button onClick={onAdd} className="gap-2">
        <PlusIcon className="size-4" />
        Ajouter une photo
      </Button>
    </div>
  )
}
