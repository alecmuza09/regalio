"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Gift, Copy, Check, Calendar, Users, DollarSign, Share2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getExchange, addParticipantToExchange } from "@/lib/storage"
import { mockExchange } from "@/lib/mock-data"
import type { Exchange, Participant } from "@/lib/mock-data"

export default function ExchangeOrganizerPage() {
  const params = useParams()
  const [copied, setCopied] = useState(false)
  const [exchange, setExchange] = useState<Exchange | null>(null)
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [participantForm, setParticipantForm] = useState({
    name: "",
    email: "",
    budget: "",
  })

  const loadExchange = async () => {
    const exchangeId = params.id as string
    
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
      // En caso de error, usar mock data como fallback
      if (params.id === "demo") {
        setExchange(mockExchange)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadExchange()
  }, [params.id])

  const shareLink = `${typeof window !== "undefined" ? window.location.origin : ""}/exchange/${params.id}/join`

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAddParticipant = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!exchange) return

    try {
      // Generar ID del participante
      const participantId = `p-${Date.now()}`

      // Crear el participante
      const participant: Participant = {
        id: participantId,
        name: participantForm.name,
        email: participantForm.email,
        budget: Number(participantForm.budget),
        preferences: [],
        links: [],
        notes: "",
        assignedTo: null,
        status: "pendiente",
      }

      // Agregar el participante al intercambio
      const success = await addParticipantToExchange(exchange.id, participant)

      if (success) {
        // Recargar el intercambio
        await loadExchange()

        // Limpiar el formulario y cerrar el diálogo
        setParticipantForm({ name: "", email: "", budget: "" })
        setDialogOpen(false)
      } else {
        alert("Error al agregar el participante. Por favor, intenta de nuevo.")
      }
    } catch (error) {
      console.error("Error adding participant:", error)
      alert("Error al agregar el participante. Por favor, intenta de nuevo.")
    }
  }

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

  const completeParticipants = exchange.participants.filter((p) => p.status === "completo").length
  const totalParticipants = exchange.participants.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Gift className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold text-foreground">Regal</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{exchange.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="secondary">{exchange.eventType}</Badge>
                <span className="text-sm text-muted-foreground">{totalParticipants} participantes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Share Link Card */}
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Invita Participantes
            </CardTitle>
            <CardDescription>
              Comparte este enlace con las personas que quieres que participen en el intercambio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input readOnly value={shareLink} className="font-mono text-sm" />
              <Button onClick={handleCopyLink} variant="secondary" className="shrink-0">
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Fecha del Evento</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Date(exchange.exchangeDate).toLocaleDateString("es-MX", {
                  day: "numeric",
                  month: "short",
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                Límite preferencias: {new Date(exchange.preferenceDeadline).toLocaleDateString("es-MX")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Participantes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalParticipants}</div>
              <p className="text-xs text-muted-foreground">{completeParticipants} con preferencias completas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Presupuesto</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${exchange.budgetMin} - ${exchange.budgetMax}
              </div>
              <p className="text-xs text-muted-foreground">Rango sugerido</p>
            </CardContent>
          </Card>
        </div>

        {/* Participants List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Participantes Registrados</CardTitle>
                <CardDescription>Estado de las preferencias de cada participante</CardDescription>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Agregar Participante
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agregar Nuevo Participante</DialogTitle>
                    <DialogDescription>
                      Agrega un participante manualmente al intercambio. Puedes completar sus preferencias más tarde.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddParticipant} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="participant-name">Nombre Completo</Label>
                      <Input
                        id="participant-name"
                        placeholder="María González"
                        value={participantForm.name}
                        onChange={(e) => setParticipantForm({ ...participantForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="participant-email">Correo Electrónico</Label>
                      <Input
                        id="participant-email"
                        type="email"
                        placeholder="maria@example.com"
                        value={participantForm.email}
                        onChange={(e) => setParticipantForm({ ...participantForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="participant-budget">Presupuesto ($)</Label>
                      <Input
                        id="participant-budget"
                        type="number"
                        placeholder={`Entre $${exchange.budgetMin} y $${exchange.budgetMax}`}
                        value={participantForm.budget}
                        onChange={(e) => setParticipantForm({ ...participantForm, budget: e.target.value })}
                        min={exchange.budgetMin}
                        max={exchange.budgetMax}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Presupuesto sugerido: ${exchange.budgetMin} - ${exchange.budgetMax}
                      </p>
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                        Cancelar
                      </Button>
                      <Button type="submit">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Agregar Participante
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {exchange.participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                      {participant.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{participant.name}</div>
                      <div className="text-sm text-muted-foreground">{participant.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium">${participant.budget}</div>
                      <div className="text-xs text-muted-foreground">{participant.preferences.length} preferencias</div>
                    </div>
                    <Badge variant={participant.status === "completo" ? "default" : "secondary"}>
                      {participant.status === "completo" ? "Completo" : "Pendiente"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {exchange.participants.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aún no hay participantes registrados</p>
                <p className="text-sm text-muted-foreground mt-2">Comparte el enlace de arriba para que se unan</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
