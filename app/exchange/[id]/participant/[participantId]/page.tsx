"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Gift, Edit, Sparkles, Bell, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getExchange } from "@/lib/storage"
import { mockExchange, mockNotifications } from "@/lib/mock-data"
import type { Exchange, Participant } from "@/lib/mock-data"

export default function ParticipantDashboardPage() {
  const params = useParams()
  const [exchange, setExchange] = useState<Exchange | null>(null)
  const [loading, setLoading] = useState(true)
  const exchangeId = params.id as string
  const participantId = params.participantId as string

  useEffect(() => {
    const loadExchange = async () => {
      try {
        // Intentar cargar desde Supabase
        const savedExchange = await getExchange(exchangeId)

        if (savedExchange) {
          setExchange(savedExchange)
        } else if (exchangeId === "demo") {
          // Si es "demo", usar el mock data
          setExchange(mockExchange)
        } else {
          // Si no existe, usar el mock como fallback
          setExchange(mockExchange)
        }
      } catch (error) {
        console.error("Error loading exchange:", error)
        if (exchangeId === "demo") {
          setExchange(mockExchange)
        }
      } finally {
        setLoading(false)
      }
    }

    loadExchange()
  }, [exchangeId])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Cargando...</div>
      </div>
    )
  }

  if (!exchange) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Intercambio no encontrado</h1>
          <Button asChild>
            <Link href="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    )
  }

  const currentParticipant = exchange.participants.find((p) => p.id === participantId)
  const assignedPerson = currentParticipant?.assignedTo
    ? exchange.participants.find((p) => p.id === currentParticipant.assignedTo)
    : null
  const recentNotifications = mockNotifications.slice(0, 3)

  if (!currentParticipant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Participante no encontrado</h1>
          <Button asChild>
            <Link href={`/exchange/${exchangeId}`}>Volver al intercambio</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Si no hay persona asignada, mostrar mensaje
  if (!assignedPerson) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-2">
                <Gift className="h-6 w-6 text-primary" />
                <span className="text-xl font-semibold text-foreground">Regal</span>
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Esperando asignación</CardTitle>
              <CardDescription>
                Aún no se ha asignado a tu persona. Por favor espera a que el organizador complete las asignaciones.
              </CardDescription>
            </CardHeader>
          </Card>
        </main>
      </div>
    )
  }

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
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Hola, <span className="font-medium text-foreground">{currentParticipant.name}</span>
              </span>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/exchange/${exchangeId}/participant/${participantId}/notifications`}>
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notificaciones</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">{exchange.name}</h1>
          <p className="mt-2 text-muted-foreground">
            Fecha del intercambio:{" "}
            {new Date(exchange.exchangeDate).toLocaleDateString("es-MX", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Assigned Person Card */}
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">A quién le regalo</CardTitle>
                    <CardDescription className="mt-1">Esta es tu persona asignada para el intercambio</CardDescription>
                  </div>
                  <Badge variant={assignedPerson.status === "completo" ? "default" : "secondary"}>
                    {assignedPerson.status === "completo" ? "Completo" : "Pendiente"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground">{assignedPerson.name}</h3>
                  <p className="text-sm text-muted-foreground">{assignedPerson.email}</p>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Presupuesto: <span className="font-medium text-foreground">${assignedPerson.budget}</span>
                  </span>
                </div>

                {assignedPerson.preferences.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-foreground">Preferencias:</h4>
                    <div className="flex flex-wrap gap-2">
                      {assignedPerson.preferences.map((pref, idx) => (
                        <Badge key={idx} variant="outline">
                          {pref}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {assignedPerson.links.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-foreground">Enlaces de interés:</h4>
                    <ul className="space-y-2">
                      {assignedPerson.links.map((link, idx) => (
                        <li key={idx}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            {link.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {assignedPerson.notes && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-foreground">Notas adicionales:</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">{assignedPerson.notes}</p>
                  </div>
                )}

                <Button className="w-full" size="lg" asChild>
                  <Link href={`/exchange/${exchangeId}/participant/${participantId}/suggestions`}>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Ver Sugerencias de Regalos
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* My Preferences Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Mis Preferencias</CardTitle>
                    <CardDescription>Tu persona asignada verá esta información</CardDescription>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/exchange/${exchangeId}/participant/${participantId}/preferences`}>
                      <Edit className="mr-2 h-3 w-3" />
                      Editar
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Mi presupuesto: <span className="font-medium text-foreground">${currentParticipant.budget}</span>
                  </span>
                </div>

                {currentParticipant.preferences.length > 0 ? (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-foreground">Mis preferencias:</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentParticipant.preferences.map((pref, idx) => (
                        <Badge key={idx} variant="secondary">
                          {pref}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No has agregado preferencias aún</p>
                )}

                {currentParticipant.links.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-foreground">Mis enlaces:</h4>
                    <p className="text-sm text-muted-foreground">{currentParticipant.links.length} enlaces agregados</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Resumen de Presupuesto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rango del evento:</span>
                  <span className="font-medium text-foreground">
                    ${exchange.budgetMin} - ${exchange.budgetMax}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tu presupuesto:</span>
                  <span className="font-medium text-foreground">${currentParticipant.budget}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Presupuesto de {assignedPerson.name}:</span>
                  <span className="font-medium text-foreground">${assignedPerson.budget}</span>
                </div>
              </CardContent>
            </Card>

            {/* Important Dates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Fechas Importantes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Límite de preferencias</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(exchange.preferenceDeadline).toLocaleDateString("es-MX", {
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Fecha del intercambio</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(exchange.exchangeDate).toLocaleDateString("es-MX", {
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Actualizaciones</CardTitle>
                  <Button size="sm" variant="ghost" asChild>
                    <Link href={`/exchange/${exchangeId}/participant/${participantId}/notifications`}>
                      Ver todas
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentNotifications.map((notif) => (
                  <div key={notif.id} className="space-y-1">
                    <p className="text-sm leading-relaxed text-foreground">{notif.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(notif.timestamp).toLocaleDateString("es-MX", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
