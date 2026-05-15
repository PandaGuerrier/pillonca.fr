import type { Data } from '@generated/data'
import { AnimatedPictures } from '#marketing/ui/components/animated-pictures'
import { ParallaxScroll } from '#marketing/ui/components/parallax-pictures'
import { MobileContact, DesktopContactFloat } from '#marketing/ui/components/contact'

interface HeroSectionProps {
  pictures: Data.Picture.Picture[]
}

export default function HeroSection({ pictures }: HeroSectionProps) {
  return (
    <section className="flex flex-col w-full items-center justify-center">
      {/* Titre */}
      <h2 className="px-6 pt-8 pb-4 text-3xl font-bold max-w-5xl tracking-tight md:px-10 text-foreground w-full">
        Mes créations
      </h2>

      {/* Mobile */}
      <div className="md:hidden flex flex-col items-center pb-12  w-full px-3">
        <AnimatedPictures autoplay={true} pictures={pictures} />
        <MobileContact />
      </div>

      {/* Desktop — collé en haut, plein écran */}
      <div className="hidden md:block w-full">
        <ParallaxScroll pictures={pictures} />
        <DesktopContactFloat />
      </div>
    </section>
  )
}
