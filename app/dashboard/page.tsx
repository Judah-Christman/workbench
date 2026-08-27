import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from './actions'
import ClientList from './client-list'
import TimeTracker from './time/time-tracker'
import TimeHistory from './time/time-history'

type ClientRelation = {
  name: string
  user_id: string
}

export default async function DashboardPage() {
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
      .select('id, name, email')
      .eq('active', true)
      .order('name')

  if (clientsError) {
    throw new Error(clientsError.message)
  }

  const { data: runningTimer, error: timerError } =
    await supabase
      .from('time_cards')
      .select(`
        id,
        client_id,
        start_time,
        notes,
        clients!inner (
          name,
          user_id
        )
      `)
      .is('stop_time', null)
      .eq('clients.user_id', user.id)
      .maybeSingle()

  if (timerError) {
    throw new Error(timerError.message)
  }

  const { data: timeCards, error: historyError } =
    await supabase
      .from('time_cards')
      .select(`
        id,
        start_time,
        stop_time,
        total_minutes,
        notes,
        client:clients!inner (
          name,
          user_id
        )
      `)
      .eq('client.user_id', user.id)
      .order('start_time', {
        ascending: false,
      })
      .limit(20)

  if (historyError) {
    throw new Error(historyError.message)
  }

  const formattedRunningTimer = runningTimer
    ? {
        id: runningTimer.id,
        client_id: runningTimer.client_id,
        start_time: runningTimer.start_time,
        notes: runningTimer.notes,
        client: {
          name: (
            runningTimer.clients as unknown as ClientRelation
          ).name,
        },
      }
    : null

  const formattedTimeCards = (timeCards ?? []).map((timeCard) => {
    const client =
      timeCard.client as unknown as ClientRelation

    return {
      id: timeCard.id,
      start_time: timeCard.start_time,
      stop_time: timeCard.stop_time,
      total_minutes: timeCard.total_minutes,
      notes: timeCard.notes,
      client: {
        name: client.name,
      },
    }
  })

  return (
    <main className='p-5 max-w-300 w-full mx-auto'>
      <header className='py-6 flex items-center justify-between'>
        <div>
          <p>{user.email}</p>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className='py-2 px-3 bg-red-700 hover:bg-red-800 rounded-xl text-white'
          >
            Logout
          </button>
        </form>
      </header>

      <section className='lg:flex lg:items-center lg:justify-between mx-auto'>
        <TimeTracker
          clients={clients ?? []}
          runningTimer={formattedRunningTimer}
        />

        <TimeHistory
          timeCards={formattedTimeCards}
        />
      </section>

      <section>
        <ClientList clients={clients ?? []} />
      </section>
    </main>
  )
}
