import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ClientList from '../client-list'


export default async function ClientPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: clients, error: clientsError } =
    await supabase
      .from('clients')
      .select('id, name')
      .eq('active', true)
      .order('name')

  if (clientsError) {
    throw new Error(clientsError.message)
  }

  return (
    <main>
      <section className='min-h-screen p-6 w-full max-w-300 mx-auto'>
        <Link
          href="/dashboard/clients/new"
          className='py-2 px-3 bg-secondary rounded-xl text-white font-semibold my-10'
        >
          New Client
        </Link>
        <ClientList clients={clients ?? []} />
      </section>
    </main>
  )
}
