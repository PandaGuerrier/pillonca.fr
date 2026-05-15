import type { InertiaProps } from '#core/ui/types'
import type { Data } from '@generated/data'

import HeaderSection from '#marketing/ui/components/header'
import HeroSection from '#marketing/ui/components/hero'

type PageProps = InertiaProps<{
  pictures: Data.Picture.Picture[]
}>

export default function Page({ pictures }: PageProps) {
  return (
    <div className="dark flex flex-col min-h-screen bg-black overflow-hidden max-h-screen ">
      <HeaderSection />
      <main className="flex-1">
        <HeroSection pictures={pictures} />
      </main>
    </div>
  )
}
