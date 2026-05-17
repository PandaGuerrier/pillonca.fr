import { useCallback, useRef, useState } from 'react'
import { router } from '@inertiajs/react'
import { urlFor } from '~/app/client'
import { Button } from '@workspace/ui/components/button'
import { Progress } from '@workspace/ui/components/progress'
import { cn } from '@workspace/ui/lib/utils'
import { CheckCircle2, FolderOpen, Loader2, XCircle, UploadCloud } from 'lucide-react'

interface QueuedFile {
  id: string
  file: File
  title: string
  preview: string
  status: 'pending' | 'uploading' | 'done' | 'error'
}

function nameWithoutExt(filename: string) {
  return filename.replace(/\.[^.]+$/, '')
}

function readFileEntry(entry: FileSystemFileEntry): Promise<File> {
  return new Promise((resolve, reject) => entry.file(resolve, reject))
}

function readDirEntries(reader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
  return new Promise((resolve, reject) => reader.readEntries(resolve, reject))
}

async function collectFilesFromEntry(entry: FileSystemEntry): Promise<File[]> {
  if (entry.isFile) {
    const file = await readFileEntry(entry as FileSystemFileEntry)
    return file.type.startsWith('image/') ? [file] : []
  }
  if (entry.isDirectory) {
    const reader = (entry as FileSystemDirectoryEntry).createReader()
    const files: File[] = []
    let batch: FileSystemEntry[]
    do {
      batch = await readDirEntries(reader)
      for (const child of batch) {
        files.push(...(await collectFilesFromEntry(child)))
      }
    } while (batch.length > 0)
    return files
  }
  return []
}

export function FolderUpload() {
  const [queue, setQueue] = useState<QueuedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback((files: File[]) => {
    const imageFiles = files.filter((f) => f.type.startsWith('image/'))
    if (!imageFiles.length) return
    const items: QueuedFile[] = imageFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      title: nameWithoutExt(file.name),
      preview: URL.createObjectURL(file),
      status: 'pending',
    }))
    setQueue((prev) => [...prev, ...items])
  }, [])

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)

    const files: File[] = []
    if (e.dataTransfer.items) {
      for (const item of Array.from(e.dataTransfer.items)) {
        const entry = item.webkitGetAsEntry()
        if (entry) files.push(...(await collectFilesFromEntry(entry)))
      }
    } else {
      files.push(...Array.from(e.dataTransfer.files))
    }
    addFiles(files)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    addFiles(Array.from(e.target.files ?? []))
    e.target.value = ''
  }

  function uploadOne(item: QueuedFile): Promise<void> {
    return new Promise((resolve) => {
      setQueue((prev) => prev.map((f) => (f.id === item.id ? { ...f, status: 'uploading' } : f)))
      router.post(
        urlFor('pictures.store'),
        { title: item.title, description: 'bois', isActive: true, file: item.file },
        {
          forceFormData: true,
          preserveScroll: true,
          preserveState: true,
          onSuccess: () => {
            setQueue((prev) => prev.map((f) => (f.id === item.id ? { ...f, status: 'done' } : f)))
            resolve()
          },
          onError: () => {
            setQueue((prev) => prev.map((f) => (f.id === item.id ? { ...f, status: 'error' } : f)))
            resolve()
          },
        }
      )
    })
  }

  async function startUpload() {
    setIsUploading(true)
    for (const item of queue.filter((f) => f.status === 'pending')) {
      await uploadOne(item)
    }
    setIsUploading(false)
  }

  function reset() {
    queue.forEach((f) => URL.revokeObjectURL(f.preview))
    setQueue([])
  }

  const pending = queue.filter((f) => f.status === 'pending').length
  const done = queue.filter((f) => f.status === 'done').length
  const total = queue.length
  const allDone = total > 0 && done === total

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors',
          isDragging
            ? 'border-primary bg-primary/5 text-primary'
            : 'border-border text-muted-foreground hover:border-primary/50 hover:bg-muted/40'
        )}
      >
        <div className={cn('flex size-12 items-center justify-center rounded-full transition-colors', isDragging ? 'bg-primary/10' : 'bg-muted')}>
          <FolderOpen className="size-6" />
        </div>
        <div>
          <p className="text-sm font-medium">Glisser un dossier ou des photos ici</p>
          <p className="text-xs opacity-60 mt-0.5">PNG, JPG, WebP — titre = nom du fichier, description = "bois"</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          // @ts-ignore — webkitdirectory not in TS types
          webkitdirectory=""
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {/* Queue */}
      {queue.length > 0 && (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Progress header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <p className="text-sm font-medium">
              {allDone ? `${done} photo${done > 1 ? 's' : ''} importée${done > 1 ? 's' : ''}` : `${done} / ${total}`}
            </p>
            <div className="flex items-center gap-2">
              {allDone ? (
                <Button variant="ghost" size="sm" onClick={reset} className="h-7 text-xs">
                  Réinitialiser
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={startUpload}
                  disabled={isUploading || pending === 0}
                  className="h-7 gap-1.5 text-xs"
                >
                  {isUploading ? (
                    <Loader2 className="size-3 animate-spin" />
                  ) : (
                    <UploadCloud className="size-3" />
                  )}
                  Importer {pending > 0 ? `${pending} photo${pending > 1 ? 's' : ''}` : ''}
                </Button>
              )}
            </div>
          </div>

          {total > 1 && (
            <Progress value={(done / total) * 100} className="h-0.5 rounded-none" />
          )}

          {/* File list */}
          <ul className="divide-y divide-border max-h-64 overflow-y-auto">
            {queue.map((item) => (
              <li key={item.id} className="flex items-center gap-3 px-4 py-2.5">
                <img
                  src={item.preview}
                  alt={item.title}
                  className="size-10 rounded-md object-cover shrink-0 bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground">bois</p>
                </div>
                <StatusIcon status={item.status} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function StatusIcon({ status }: { status: QueuedFile['status'] }) {
  if (status === 'uploading') return <Loader2 className="size-4 animate-spin text-muted-foreground shrink-0" />
  if (status === 'done') return <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
  if (status === 'error') return <XCircle className="size-4 text-destructive shrink-0" />
  return <div className="size-4 rounded-full border-2 border-border shrink-0" />
}
