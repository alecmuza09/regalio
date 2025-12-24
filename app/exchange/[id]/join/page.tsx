"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Gift, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getExchange, addParticipantToExchange } from "@/lib/storage"
import { mockExchange } from "@/lib/mock-data"
import type { Exchange, Participant } from "@/lib/mock-data"

export default function JoinExchangePage() {
  const params = useParams()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
  })
  const [exchange, setExchange] = useState<Exchange | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
        if (params.id === "demo") {
          setExchange(mockExchange)
        }
      } finally {
        setLoading(false)
      }
    }

    loadExchange()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!exchange) return

    try {
      // Generar ID del participante
      const participantId = `p-${Date.now()}`

      // Crear el participante
      const participant: Participant = {
        id: participantId,
        name: formData.name,
        email: formData.email,
        budget: Number(formData.budget),
        preferences: [],
        links: [],
        notes: "",
        assignedTo: null,
        status: "pendiente",
      }

      // Guardar el participante en el intercambio
      const success = await addParticipantToExchange(exchange.id, participant)

      if (success) {
        // Redirigir al dashboard del participante
        router.push(`/exchange/${params.id}/participant/${participantId}`)
      } else {
        alert("Error al unirse al intercambio. Por favor, intenta de nuevo.")
      }
    } catch (error) {
      console.error("Error joining exchange:", error)
      alert("Error al unirse al intercambio. Por favor, intenta de nuevo.")
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
      <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Link>
        </Button>

        {/* Exchange Info */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Te invitaron a participar en</h1>
          <p className="text-2xl text-primary font-semibold">{exchange.name}</p>
          <p className="text-muted-foreground mt-2">
            {exchange.eventType} •{" "}
            {new Date(exchange.exchangeDate).toLocaleDateString("es-MX", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Únete al Intercambio</CardTitle>
            <CardDescription>Completa tus datos para participar en el intercambio de regalos</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  placeholder="María González"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="maria@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Usaremos tu correo para enviarte notificaciones importantes
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Tu Presupuesto ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  placeholder={`Entre $${exchange.budgetMin} y $${exchange.budgetMax}`}
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  min={exchange.budgetMin}
                  max={exchange.budgetMax}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Presupuesto sugerido: ${exchange.budgetMin} - ${exchange.budgetMax}
                </p>
              </div>

              <div className="rounded-lg bg-muted p-4">
                <h3 className="font-medium text-sm mb-2">Próximos pasos:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>1. Completa tus preferencias de regalo</li>
                  <li>2. Espera la asignación automática</li>
                  <li>3. Recibe sugerencias personalizadas</li>
                  <li>4. Compra el regalo perfecto</li>
                </ul>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Unirme al Intercambio
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
