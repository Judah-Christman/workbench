import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import TimeCardList from './TimeCard'

export default async function TimeCard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
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

  const formattedTimeCards = (timeCards ?? []).map((timeCard) => ({
    id: timeCard.id,
    start_time: timeCard.start_time,
    stop_time: timeCard.stop_time,
    total_minutes: timeCard.total_minutes,
    notes: timeCard.notes,
    client: {
      name: timeCard.client[0]?.name ?? 'Unknown Client',
    },
  }))

  return (
    <section className='min-h-screen w-full max-w-300 mx-auto p-6'>
      <TimeCardList
        timeCards={formattedTimeCards}
      />
    </section>
  )
}
