import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import type { Data } from '@generated/data'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Lightbox } from '#marketing/ui/components/lightbox'

export const AnimatedPictures = ({
  pictures,
  autoplay = false,
}: {
  pictures: Data.Picture.Picture[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const handleNext = () => setActive((prev) => (prev + 1) % pictures.length);
  const handlePrev = () => setActive((prev) => (prev - 1 + pictures.length) % pictures.length);

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => Math.floor(Math.random() * 21) - 10;

  if (!pictures.length) return null;

  return (
    <div className="w-full">
      {/* Image with gradient overlay */}
      <div
        className="relative h-80 w-full rounded-3xl overflow-hidden cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
      >
        <AnimatePresence>
          {pictures.map((picture, index) => (
            <motion.div
              key={picture.fileUrl}
              initial={{ opacity: 0, scale: 0.9, z: -100, rotate: randomRotateY() }}
              animate={{
                opacity: index === active ? 1 : 0.7,
                scale: index === active ? 1 : 0.95,
                z: index === active ? 0 : -100,
                rotate: index === active ? 0 : randomRotateY(),
                zIndex: index === active ? 40 : pictures.length + 2 - index,
                y: index === active ? [0, -80, 0] : 0,
              }}
              exit={{ opacity: 0, scale: 0.9, z: 100, rotate: randomRotateY() }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 origin-bottom"
            >
              <img
                src={picture.fileUrl || ""}
                alt={picture.title}
                draggable={false}
                className="h-full w-full object-cover object-center"
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-50 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Title + description */}
        <motion.div
          key={active}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 right-0 z-50 p-4"
        >
          <p className="text-base font-semibold text-white leading-tight">
            {pictures[active].title}
          </p>
          {pictures[active].description && (
            <p className="text-sm text-white/70 mt-0.5 line-clamp-2">
              {pictures[active].description}
            </p>
          )}
        </motion.div>
      </div>

      {/* Buttons below */}
      <div className="flex items-center justify-between mt-5 px-1">
        <button
          onClick={handlePrev}
          className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-200"
        >
          <span className="flex items-center justify-center size-8 rounded-full border border-white/10 group-hover:border-white/30 bg-white/5 group-hover:bg-white/10 transition-all duration-200">
            <ArrowLeft className="size-3.5" />
          </span>
          <span className="text-xs tracking-widest uppercase font-medium">Précédent</span>
        </button>

        {/* Dots or counter */}
        {pictures.length < 6 ? (
          <div className="flex gap-1.5">
            {pictures.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === active ? 'w-5 bg-white' : 'w-1.5 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        ) : (
          <span className="text-xs font-medium tabular-nums text-white">
            {active + 1} / {pictures.length}
          </span>
        )}

        <button
          onClick={handleNext}
          className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-200"
        >
          <span className="text-xs tracking-widest uppercase font-medium">Suivant</span>
          <span className="flex items-center justify-center size-8 rounded-full border border-white/10 group-hover:border-white/30 bg-white/5 group-hover:bg-white/10 transition-all duration-200">
            <ArrowRight className="size-3.5" />
          </span>
        </button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            pictures={pictures}
            index={active}
            onClose={() => setLightboxOpen(false)}
            onPrev={() => setActive((i) => (i - 1 + pictures.length) % pictures.length)}
            onNext={() => setActive((i) => (i + 1) % pictures.length)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
