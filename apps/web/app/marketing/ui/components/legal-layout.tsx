import { Link } from '@inertiajs/react'
import { ArrowLeft } from 'lucide-react'

interface LegalLayoutProps {
  title: string
  children: React.ReactNode
}

export default function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="dark min-h-screen bg-black text-white">
      {/* Header */}
      <header className="w-full py-8 flex flex-col items-center gap-2 border-b border-white/5">
        <Link href="/" className="text-4xl font-bold tracking-widest uppercase text-foreground hover:text-white/80 transition-colors">
          PILLONCA
        </Link>
        <div className="flex items-center gap-3 w-full max-w-5xl px-6">
          <span className="flex-1 border-t border-foreground/30" />
          <span className="text-sm tracking-widest text-muted-foreground whitespace-nowrap">
            Menuiserie • Bois
          </span>
          <span className="flex-1 border-t border-foreground/30" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-14">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors mb-10 group"
        >
          <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Retour
        </Link>

        <h1 className="text-3xl font-bold tracking-tight mb-10">{title}</h1>

        <div className="prose-legal">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/30 tracking-widest uppercase">
        © {new Date().getFullYear()} Laurent Pillonca
      </footer>
    </div>
  )
}
