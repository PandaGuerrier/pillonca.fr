import { Link } from '@inertiajs/react'

export default function FooterSection() {
  return (
    <footer className="border-t border-white/5 py-6">
      <div className="flex flex-col items-center gap-3 max-w-5xl mx-auto px-6">
        <p className="text-xs text-white/20 tracking-widest uppercase">
          © {new Date().getFullYear()} Laurent Pillonca
        </p>
        <nav className="flex items-center gap-1 text-xs text-white/30">
          <Link
            href="/mentions-legales"
            className="hover:text-white/70 transition-colors px-2 py-1"
          >
            Mentions légales
          </Link>
          <span className="text-white/10">•</span>
          <Link
            href="/politique-de-confidentialite"
            className="hover:text-white/70 transition-colors px-2 py-1"
          >
            Politique de confidentialité
          </Link>
        </nav>
      </div>
    </footer>
  )
}
