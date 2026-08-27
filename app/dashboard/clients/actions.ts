'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createClientAction(
  formData: FormData
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const notes = formData.get('notes') as string

  const { error } = await supabase
    .from('clients')
    .insert({
      user_id: user.id,
      name,
      email: email || null,
      phone: phone || null,
      notes: notes || null,
    })

  if (error) {
    throw new Error(error.message)
  }

  redirect('/dashboard')
}

export async function updateClientAction(
  formData: FormData
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const notes = formData.get('notes') as string
  const active = formData.get('active') === 'on'

  const { error } = await supabase
    .from('clients')
    .update({
      name,
      email: email || null,
      phone: phone || null,
      notes: notes || null,
      active,
    })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  redirect('/dashboard')
}

export async function deleteClientAction(
  formData: FormData
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const id = formData.get('id') as string

  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  redirect('/dashboard')
}
