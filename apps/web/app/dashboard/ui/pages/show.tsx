import AppLayout from '#common/ui/components/app_layout'

export default function DashboardPage() {
  return (
    <AppLayout breadcrumbs={[{ label: 'Tableau de bord', href: '/dashboard' }]}>
      <div className="flex flex-col gap-4 p-6">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">Bienvenue sur l'interface d'administration.</p>
      </div>
    </AppLayout>
  )
}
