import type { InertiaProps } from '#core/ui/types'
import type { Data } from '@generated/data'

import { Head } from '@inertiajs/react'
import HeaderSection from '#marketing/ui/components/header'
import HeroSection from '#marketing/ui/components/hero'
import FooterSection from '#marketing/ui/components/footer'

type PageProps = InertiaProps<{
  pictures: Data.Picture.Picture[]
}>

const TITLE = 'Laurent Pillonca — Menuisier Artisan | Charente-Maritime (17)'
const DESCRIPTION =
  'Menuisier artisan basé à Saint-Palais-de-Négrignac (17210). Création sur mesure en bois : meubles, agencement intérieur, escaliers. Devis gratuit en Charente-Maritime.'

export default function Page({ pictures }: PageProps) {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content="https://pillonca.fr/" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <link rel="canonical" href="https://pillonca.fr/" />
      </Head>
      <div className="dark flex flex-col h-screen overflow-hidden bg-black">
        <HeaderSection />
        <main className="flex-1 min-h-0 overflow-y-auto md:overflow-hidden">
          <HeroSection pictures={pictures} />
        </main>
      </div>
    </>
  )
}
