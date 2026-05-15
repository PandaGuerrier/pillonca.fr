import { useForm } from '@inertiajs/react'

import { ConfirmDialog } from '#common/ui/components/confirm_dialog'
import { urlFor } from '~/app/client'
import { toast } from '@workspace/ui/hooks/use-toast'
import { AlertTriangleIcon } from 'lucide-react'

import type { Picture } from '#picture/ui/components/picture_action_dialog'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Picture
}

export function PictureDeleteDialog({ open, onOpenChange, currentRow }: Props) {
  const { delete: destroy, processing } = useForm()

  function handleDelete() {
    destroy(urlFor('pictures.destroy', { id: currentRow.uuid }), {
      preserveScroll: true,
      onSuccess: () => {
        onOpenChange(false)
        toast('Photo supprimée', { description: currentRow.title })
      },
    })
  }

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      isLoading={processing}
      destructive
      title={
        <span className="flex items-center gap-2 text-destructive">
          <AlertTriangleIcon className="size-4" />
          Supprimer la photo
        </span>
      }
      desc={
        <span>
          La photo{' '}
          <span className="font-semibold">« {currentRow.title} »</span> sera supprimée
          définitivement. Cette action est irréversible.
        </span>
      }
      confirmText="Supprimer"
      cancelBtnText="Annuler"
    />
  )
}
