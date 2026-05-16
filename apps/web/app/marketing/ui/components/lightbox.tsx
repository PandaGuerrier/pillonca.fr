import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useCallback } from 'react'
import type { Data } from '@generated/data'

interface LightboxProps {
  pictures: Data.Picture.Picture[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ pictures, index, onClose, onPrev, onNext }: LightboxProps) {
  const picture = pictures[index]
  const hasMany = pictures.length > 1

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="size-5" />
      </button>

      {/* Counter */}
      {hasMany && (
        <span className="absolute top-5 left-1/2 -translate-x-1/2 text-xs tabular-nums text-white/40 font-medium tracking-widest">
          {index + 1} / {pictures.length}
        </span>
      )}

      {/* Prev */}
      {hasMany && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 z-10 flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}

      {/* Image + infos */}
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.18 }}
        className="flex flex-col items-center w-full h-full px-16 py-14 max-w-6xl mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={picture.fileUrl || ''}
          alt={picture.title}
          className="w-full flex-1 min-h-0 object-contain rounded-lg"
        />
        <div className="mt-4 text-center shrink-0">
          <p className="text-white font-semibold">{picture.title}</p>
          {picture.description && (
            <p className="text-white/50 text-sm mt-1">{picture.description}</p>
          )}
        </div>
      </motion.div>

      {/* Next */}
      {hasMany && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 z-10 flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronRight className="size-5" />
        </button>
      )}
    </motion.div>
  )
}
