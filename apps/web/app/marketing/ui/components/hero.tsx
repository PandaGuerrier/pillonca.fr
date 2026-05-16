import type { Data } from '@generated/data'
import { AnimatedPictures } from '#marketing/ui/components/animated-pictures'
import { ParallaxScroll } from '#marketing/ui/components/parallax-pictures'
import { MobileContact, DesktopContactFloat } from '#marketing/ui/components/contact'

interface HeroSectionProps {
  pictures: Data.Picture.Picture[]
}

export default function HeroSection({ pictures }: HeroSectionProps) {
  return (
    <section className="flex flex-col w-full items-center md:h-full">
      {/* Titre */}
      <h2 className="px-6 pt-6 pb-3 text-3xl font-bold max-w-5xl tracking-tight md:px-10 text-foreground w-full shrink-0">
        Mes créations
      </h2>

      {/* Mobile */}
      <div className="md:hidden flex flex-col items-center w-full px-3 pb-8">
        <AnimatedPictures autoplay={true} pictures={pictures} />
        <MobileContact />
      </div>

      {/* Desktop */}
      <div className="hidden md:block w-full flex-1 min-h-0">
        <ParallaxScroll pictures={pictures} />
        <DesktopContactFloat />
      </div>
    </section>
  )
}
