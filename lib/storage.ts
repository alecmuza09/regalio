import type { Exchange, Participant } from "./mock-data"
import { supabase } from "./supabase"

/**
 * Convierte un participante de la base de datos al formato de la app
 */
function dbParticipantToApp(participant: any): Participant {
  return {
    id: participant.id,
    name: participant.name,
    email: participant.email,
    budget: Number(participant.budget),
    preferences: participant.preferences || [],
    links: participant.links || [],
    notes: participant.notes || "",
    assignedTo: participant.assigned_to,
    status: participant.status as "completo" | "pendiente",
  }
}

/**
 * Convierte un intercambio de la base de datos al formato de la app
 */
function dbExchangeToApp(exchange: any, participants: Participant[] = []): Exchange {
  return {
    id: exchange.id,
    name: exchange.name,
    eventType: exchange.event_type,
    preferenceDeadline: exchange.preference_deadline,
    exchangeDate: exchange.exchange_date,
    budgetMin: Number(exchange.budget_min),
    budgetMax: Number(exchange.budget_max),
    participants,
  }
}

/**
 * Guarda un intercambio en Supabase
 */
export async function saveExchange(exchange: Exchange): Promise<void> {
  try {
    const { error } = await supabase
      .from("exchanges")
      .upsert({
        id: exchange.id,
        name: exchange.name,
        event_type: exchange.eventType,
        preference_deadline: exchange.preferenceDeadline,
        exchange_date: exchange.exchangeDate,
        budget_min: exchange.budgetMin,
        budget_max: exchange.budgetMax,
        updated_at: new Date().toISOString(),
      })

    if (error) {
      console.error("Error saving exchange:", error)
      throw error
    }

    // Guardar participantes si existen
    if (exchange.participants && exchange.participants.length > 0) {
      const participantsData = exchange.participants.map((p) => ({
        id: p.id,
        exchange_id: exchange.id,
        name: p.name,
        email: p.email,
        budget: p.budget,
        preferences: p.preferences,
        links: p.links,
        notes: p.notes,
        assigned_to: p.assignedTo,
        status: p.status,
        updated_at: new Date().toISOString(),
      }))

      const { error: participantsError } = await supabase
        .from("participants")
        .upsert(participantsData)

      if (participantsError) {
        console.error("Error saving participants:", participantsError)
        throw participantsError
      }
    }
  } catch (error) {
    console.error("Error in saveExchange:", error)
    throw error
  }
}

/**
 * Obtiene un intercambio por ID desde Supabase
 */
export async function getExchange(id: string): Promise<Exchange | null> {
  try {
    // Obtener el intercambio
    const { data: exchange, error: exchangeError } = await supabase
      .from("exchanges")
      .select("*")
      .eq("id", id)
      .single()

    if (exchangeError || !exchange) {
      return null
    }

    // Obtener los participantes
    const { data: participants, error: participantsError } = await supabase
      .from("participants")
      .select("*")
      .eq("exchange_id", id)

    if (participantsError) {
      console.error("Error getting participants:", participantsError)
    }

    const appParticipants = (participants || []).map(dbParticipantToApp)

    return dbExchangeToApp(exchange, appParticipants)
  } catch (error) {
    console.error("Error getting exchange:", error)
    return null
  }
}

/**
 * Actualiza un intercambio existente
 */
export async function updateExchange(exchange: Exchange): Promise<void> {
  await saveExchange(exchange)
}

/**
 * Agrega un participante a un intercambio
 */
export async function addParticipantToExchange(
  exchangeId: string,
  participant: Participant
): Promise<boolean> {
  try {
    const { error } = await supabase.from("participants").upsert({
      id: participant.id,
      exchange_id: exchangeId,
      name: participant.name,
      email: participant.email,
      budget: participant.budget,
      preferences: participant.preferences || [],
      links: participant.links || [],
      notes: participant.notes || "",
      assigned_to: participant.assignedTo,
      status: participant.status,
      updated_at: new Date().toISOString(),
    })

    if (error) {
      console.error("Error adding participant:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in addParticipantToExchange:", error)
    return false
  }
}

/**
 * Obtiene todos los intercambios
 */
export async function getAllExchanges(): Promise<Exchange[]> {
  try {
    const { data: exchanges, error } = await supabase
      .from("exchanges")
      .select("*")
      .order("created_at", { ascending: false })

    if (error || !exchanges) {
      console.error("Error getting exchanges:", error)
      return []
    }

    // Obtener participantes para cada intercambio
    const exchangesWithParticipants = await Promise.all(
      exchanges.map(async (exchange) => {
        const { data: participants } = await supabase
          .from("participants")
          .select("*")
          .eq("exchange_id", exchange.id)

        const appParticipants = (participants || []).map(dbParticipantToApp)
        return dbExchangeToApp(exchange, appParticipants)
      })
    )

    return exchangesWithParticipants
  } catch (error) {
    console.error("Error in getAllExchanges:", error)
    return []
  }
}

/**
 * Actualiza un participante
 */
export async function updateParticipant(participant: Participant): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("participants")
      .update({
        name: participant.name,
        email: participant.email,
        budget: participant.budget,
        preferences: participant.preferences,
        links: participant.links,
        notes: participant.notes,
        assigned_to: participant.assignedTo,
        status: participant.status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", participant.id)

    if (error) {
      console.error("Error updating participant:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in updateParticipant:", error)
    return false
  }
}
