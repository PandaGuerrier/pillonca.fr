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

export default function PolitiqueDeConfidentialite() {
  return (
    <>
      <Head>
        <title>Politique de confidentialité — Laurent Pillonca</title>
        <meta name="description" content="Politique de confidentialité et traitement des données personnelles — pillonca.fr." />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <LegalLayout title="Politique de confidentialité">
        <Section title="Responsable du traitement">
          <p>
            Le responsable du traitement des données collectées sur ce site est Laurent Pillonca, menuisier artisan,
            joignable à l'adresse suivante :{' '}
            <a href="mailto:lpillonca29@gmail.com" className="text-white/70 hover:text-white transition-colors">
              lpillonca29@gmail.com
            </a>
          </p>
        </Section>

        <Divider />

        <Section title="Données collectées">
          <p>
            Ce site est un site vitrine. Il ne dispose d'aucun formulaire de contact, d'aucun espace membre et ne collecte aucune donnée personnelle vous concernant.
          </p>
          <p>
            Les seules données à caractère personnel présentes sur ce site sont les coordonnées de Laurent Pillonca (téléphone, adresse e-mail), mises à disposition pour vous permettre de le contacter directement.
          </p>
        </Section>

        <Divider />

        <Section title="Cookies">
          <p>
            Ce site n'utilise pas de cookies de suivi, de publicité ou d'analyse d'audience (pas de Google Analytics, ni d'outil équivalent).
          </p>
          <p>
            Un cookie technique de session peut être déposé par le serveur afin d'assurer le bon fonctionnement du site. Ce cookie est strictement nécessaire et ne permet pas de vous identifier personnellement. Il est supprimé à la fermeture de votre navigateur.
          </p>
          <p>
            Conformément à la recommandation de la CNIL, ce cookie technique ne nécessite pas votre consentement.
          </p>
        </Section>

        <Divider />

        <Section title="Vos droits">
          <p>
            Conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés, vous disposez des droits suivants sur vos données personnelles :
          </p>
          <ul className="list-none space-y-1 pl-0 mt-2">
            {[
              'Droit d\'accès',
              'Droit de rectification',
              'Droit à l\'effacement',
              'Droit à la limitation du traitement',
              'Droit à la portabilité',
              'Droit d\'opposition',
            ].map((right) => (
              <li key={right} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-white/20 shrink-0" />
                {right}
              </li>
            ))}
          </ul>
          <p className="mt-3">
            Pour exercer ces droits, contactez Laurent Pillonca à l'adresse :{' '}
            <a href="mailto:lpillonca29@gmail.com" className="text-white/70 hover:text-white transition-colors">
              lpillonca29@gmail.com
            </a>
          </p>
          <p>
            En cas de réponse insatisfaisante, vous pouvez introduire une réclamation auprès de la{' '}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              CNIL
            </a>
            .
          </p>
        </Section>

        <Divider />

        <Section title="Hébergement et transfert de données">
          <p>
            Ce site est hébergé en France. Aucune donnée n'est transférée en dehors de l'Union européenne.
          </p>
        </Section>

        <Divider />

        <Section title="Modifications">
          <p>
            Cette politique de confidentialité peut être mise à jour à tout moment. La date de dernière mise à jour est indiquée ci-dessous.
          </p>
          <p className="text-white/30">Dernière mise à jour : mai 2026</p>
        </Section>
      </LegalLayout>
    </>
  )
}
