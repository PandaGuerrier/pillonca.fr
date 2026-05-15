export default function HeaderSection() {
  return (
    <header className="w-full py-8 flex flex-col items-center gap-2">
      <h1 className="text-4xl font-bold tracking-widest uppercase text-primary">PILLONCA</h1>
      <div className="flex items-center gap-3 w-full max-w-5xl">
        <span className="flex-1 border-t border-foreground/30" />
        <span className="text-sm tracking-widest text-muted-foreground whitespace-nowrap">
          Menuiserie • Bois
        </span>
        <span className="flex-1 border-t border-foreground/30" />
      </div>
    </header>
  )
}
