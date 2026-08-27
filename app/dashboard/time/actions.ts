'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function startTimer(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const clientId = formData.get('client_id') as string
  const notes = formData.get('notes') as string

  if (!clientId) {
    throw new Error('Client is required')
  }

  // Make sure this client belongs to the authenticated user
  const { data: client, error: clientError } = await supabase
    .from('clients')
    .select('id')
    .eq('id', clientId)
    .eq('user_id', user.id)
    .single()

  if (clientError || !client) {
    throw new Error('Client not found')
  }

  // Don't allow multiple running timers
  const { data: runningTimer } = await supabase
    .from('time_cards')
    .select('id')
    .eq('client_id', clientId)
    .is('stop_time', null)
    .maybeSingle()

  if (runningTimer) {
    throw new Error('This client already has a running timer')
  }

  const { error } = await supabase
    .from('time_cards')
    .insert({
      client_id: clientId,
      start_time: new Date().toISOString(),
      notes: notes || null,
    })

  if (error) {
    throw new Error(error.message)
  }

  redirect('/dashboard')
}


export async function stopTimer(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const timeCardId = formData.get('time_card_id') as string

  if (!timeCardId) {
    throw new Error('Time card is required')
  }

  // Find the timer through the client's ownership
  const { data: timeCard, error: timeCardError } = await supabase
    .from('time_cards')
    .select(`
      id,
      client_id,
      clients!inner (
        user_id
      )
    `)
    .eq('id', timeCardId)
    .eq('clients.user_id', user.id)
    .single()

  if (timeCardError || !timeCard) {
    throw new Error('Time card not found')
  }

  const { error } = await supabase
    .from('time_cards')
    .update({
      stop_time: new Date().toISOString(),
    })
    .eq('id', timeCardId)

  if (error) {
    throw new Error(error.message)
  }

  redirect('/dashboard')
}
