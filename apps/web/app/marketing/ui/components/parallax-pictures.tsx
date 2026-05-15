import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";
import type { Data } from '@generated/data'

export const ParallaxScroll = ({
  pictures,
}: {
  pictures: Data.Picture.Picture[];
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ["start start", "end start"],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(pictures.length / 3);
  const firstPart = pictures.slice(0, third);
  const secondPart = pictures.slice(third, 2 * third);
  const thirdPart = pictures.slice(2 * third);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      {/* Scrollable grid */}
      <div
        ref={gridRef}
        className="h-full w-full overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 pt-6 pb-40 px-10">
          <div className="grid gap-10">
            {firstPart.map((picture, idx) => (
              <PictureCard key={"grid-1-" + idx} picture={picture} style={{ y: translateFirst }} />
            ))}
          </div>
          <div className="grid gap-10">
            {secondPart.map((picture, idx) => (
              <PictureCard key={"grid-2-" + idx} picture={picture} style={{ y: translateSecond }} />
            ))}
          </div>
          <div className="grid gap-10">
            {thirdPart.map((picture, idx) => (
              <PictureCard key={"grid-3-" + idx} picture={picture} style={{ y: translateThird }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function PictureCard({
  picture,
  style,
}: {
  picture: Data.Picture.Picture;
  style?: any;
}) {
  return (
    <motion.div style={style} className="relative h-80 w-full overflow-hidden rounded-lg">
      <img
        src={picture.fileUrl || ""}
        alt={picture.title}
        className="h-full w-full object-cover object-center"
      />

      {/* Card gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Title + description */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-sm font-semibold text-white leading-tight truncate">
          {picture.title}
        </p>
        {picture.description && (
          <p className="text-xs text-white/70 mt-0.5 line-clamp-2">
            {picture.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
