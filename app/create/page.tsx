"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Gift, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveExchange } from "@/lib/storage"
import type { Exchange } from "@/lib/mock-data"

export default function CreateExchangePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    eventType: "",
    preferenceDeadline: "",
    exchangeDate: "",
    budgetMin: "",
    budgetMax: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const newExchangeId = `${Date.now()}`

      // Crear el intercambio con tipos de datos correctos
      const exchangeData: Exchange = {
        id: newExchangeId,
        name: formData.name,
        eventType: formData.eventType,
        preferenceDeadline: formData.preferenceDeadline,
        exchangeDate: formData.exchangeDate,
        budgetMin: Number(formData.budgetMin),
        budgetMax: Number(formData.budgetMax),
        participants: [],
      }

      // Guardar en Supabase
      await saveExchange(exchangeData)

      router.push(`/exchange/${newExchangeId}`)
    } catch (error) {
      console.error("Error creating exchange:", error)
      alert("Error al crear el intercambio. Por favor, intenta de nuevo.")
      setIsSubmitting(false)
    }
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

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Crear Nuevo Intercambio</CardTitle>
            <CardDescription>
              Configura los detalles de tu evento y comparte el enlace con los participantes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Intercambio</Label>
                <Input
                  id="name"
                  placeholder="Ej: Navidad Familia 2024"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventType">Tipo de Evento</Label>
                <Select
                  value={formData.eventType}
                  onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                  required
                >
                  <SelectTrigger id="eventType">
                    <SelectValue placeholder="Selecciona el tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="navidad">Navidad</SelectItem>
                    <SelectItem value="cumpleanos">Cumpleaños</SelectItem>
                    <SelectItem value="equipo">Equipo de Trabajo</SelectItem>
                    <SelectItem value="amigos">Amigos</SelectItem>
                    <SelectItem value="familia">Familia</SelectItem>
                    <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="preferenceDeadline">Fecha Límite Preferencias</Label>
                  <Input
                    id="preferenceDeadline"
                    type="date"
                    value={formData.preferenceDeadline}
                    onChange={(e) => setFormData({ ...formData, preferenceDeadline: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="exchangeDate">Fecha del Intercambio</Label>
                  <Input
                    id="exchangeDate"
                    type="date"
                    value={formData.exchangeDate}
                    onChange={(e) => setFormData({ ...formData, exchangeDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="budgetMin">Presupuesto Mínimo ($)</Label>
                  <Input
                    id="budgetMin"
                    type="number"
                    placeholder="500"
                    value={formData.budgetMin}
                    onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budgetMax">Presupuesto Máximo ($)</Label>
                  <Input
                    id="budgetMax"
                    type="number"
                    placeholder="1500"
                    value={formData.budgetMax}
                    onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Creando..." : "Crear Intercambio"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
