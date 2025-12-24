import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gift, Users, Bell, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Gift className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold text-foreground">Regal</span>
            </div>
            <Button asChild>
              <Link href="/create">Crear Intercambio</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Organiza intercambios de regalos sin complicaciones
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Regal automatiza todo el proceso: asignaciones secretas, seguimiento de preferencias, y sugerencias de
            regalos personalizadas dentro de tu presupuesto.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/create">Comenzar Ahora</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/exchange/demo">Ver Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Asignación Automática</h3>
              <p className="text-muted-foreground leading-relaxed">
                El sistema asigna aleatoriamente quién le regala a quién. Sin sorteos manuales.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Bell className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Notificaciones Inteligentes</h3>
              <p className="text-muted-foreground leading-relaxed">
                Recibe actualizaciones cuando tu persona actualice sus preferencias o enlaces.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Sugerencias de Regalos</h3>
              <p className="text-muted-foreground leading-relaxed">
                Obtén ideas basadas en las preferencias y dentro del presupuesto establecido.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-balance text-3xl font-bold text-foreground sm:text-4xl">
            Listo para tu próximo intercambio
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Configura tu evento en minutos y comparte el enlace con tus participantes.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/create">Crear Mi Intercambio</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            Regal © {new Date().getFullYear()} - Hecho con cariño para tus intercambios
          </p>
        </div>
      </footer>
    </div>
  )
}
