import { Head } from '@inertiajs/react'
import LegalLayout from '#marketing/ui/components/legal-layout'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-sm font-semibold tracking-widest uppercase text-white/30 mb-3">{title}</h2>
      <div className="space-y-2 text-white/70 text-sm leading-relaxed">{children}</div>
    </section>
  )
}

function Divider() {
  return <div className="border-t border-white/5 mb-10" />
}

export default function MentionsLegales() {
  return (
    <>
      <Head>
        <title>Mentions légales — Laurent Pillonca</title>
        <meta name="description" content="Mentions légales du site pillonca.fr — Laurent Pillonca, menuisier artisan en Charente-Maritime." />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <LegalLayout title="Mentions légales">
        <Section title="Éditeur du site">
          <p><span className="text-white/40">Nom :</span> Laurent Pillonca</p>
          <p><span className="text-white/40">Activité :</span> Menuisier artisan</p>
          <p><span className="text-white/40">Adresse :</span> 17210 Saint-Palais-de-Négrignac, Charente-Maritime</p>
          <p><span className="text-white/40">Téléphone :</span>{' '}
            <a href="tel:+33675374522" className="text-white/70 hover:text-white transition-colors">06 75 37 45 22</a>
          </p>
          <p><span className="text-white/40">Email :</span>{' '}
            <a href="mailto:lpillonca29@gmail.com" className="text-white/70 hover:text-white transition-colors">lpillonca29@gmail.com</a>
          </p>
          <p><span className="text-white/40">SIRET :</span> 53751411900057</p>
          <p><span className="text-white/40">Directeur de publication :</span> Laurent Pillonca</p>
        </Section>

        <Divider />

        <Section title="Hébergement">
          <p><span className="text-white/40">Hébergeur :</span> juleslofficial.fr</p>
          <p><span className="text-white/40">Adresse :</span> 3 rue de la fontaine - 17210 Saint palais de Negrignac</p>
        </Section>

        <Divider />

        <Section title="Propriété intellectuelle">
          <p>
            L'ensemble du contenu de ce site (photographies, textes, design) est la propriété exclusive de Laurent Pillonca et est protégé par les lois françaises et internationales relatives au droit d'auteur et à la propriété intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation préalable et écrite de Laurent Pillonca.
          </p>
        </Section>

        <Divider />

        <Section title="Limitation de responsabilité">
          <p>
            Laurent Pillonca s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Cependant, il ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
          </p>
          <p>
            En conséquence, Laurent Pillonca décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.
          </p>
        </Section>

        <Divider />

        <Section title="Droit applicable">
          <p>
            Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
          </p>
          <p className="text-white/30">Dernière mise à jour : mai 2026</p>
        </Section>
      </LegalLayout>
    </>
  )
}
