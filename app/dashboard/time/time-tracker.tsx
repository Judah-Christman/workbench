'use client'

import { useEffect, useState } from 'react'
import { startTimer, stopTimer } from './actions'

type Client = {
  id: string
  name: string
}

type RunningTimer = {
  id: string
  client_id: string
  start_time: string
  notes: string | null
  client: {
    name: string
  }
}

type Props = {
  clients: Client[]
  runningTimer: RunningTimer | null
}

export default function TimeTracker({
  clients,
  runningTimer,
}: Props) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    if (!runningTimer) {
      setElapsed(0)
      return
    }

    const start = new Date(runningTimer.start_time).getTime()

    const updateElapsed = () => {
      const now = Date.now()
      setElapsed(Math.max(0, now - start))
    }

    updateElapsed()

    const interval = setInterval(updateElapsed, 1000)

    return () => clearInterval(interval)
  }, [runningTimer])

  const totalSeconds = Math.floor(elapsed / 1000)

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const formattedTime = [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0'),
  ].join(':')

  if (runningTimer) {
    return (
      <section className='w-full max-w-lg bg-secondary rounded-xl shadow-black/30 shadow-lg p-6 my-10 mx-auto lg:h-80'>
        <h2 className='text-lg text-white text-center font-semibold pb-2'>Currently Working</h2>

        <div className='flex items-center justify-center gap-5 text-white'>
          <h3 className='p-2 font-semibold underline'>{runningTimer.client.name}</h3>

          <div>
            {formattedTime}
          </div>
        </div>

        {runningTimer.notes && (
          <p className='text-white text-center'>{runningTimer.notes}</p>
        )}

        <form action={stopTimer}>
          <input
            type="hidden"
            name="time_card_id"
            value={runningTimer.id}
          />

          <button type="submit" className='block text-white font-semibold mx-auto my-2 px-3 py-2 bg-red-700 hover:bg-red-800 rounded-lg border-2'>
            Stop Timer
          </button>
        </form>
      </section>
    )
  }

  return (
    <section className='w-full max-w-lg bg-secondary rounded-xl shadow-black/30 shadow-lg p-6 my-10 mx-auto lg:h-80'>
      <h2 className='text-xl text-white text-center font-semibold pb-2'>Time Tracker</h2>

      <form action={startTimer}>
        <div className='py-3'>
          <label htmlFor="client_id" className='mr-2 font-bold text-white'>
            Client:
          </label>

          <select
            id="client_id"
            name="client_id"
            required
            defaultValue=""
            className='border rounded-lg p-1 text-white min-w-3xs'
          >
            <option value="" disabled>
              Select a client
            </option>

            {clients.map((client) => (
              <option
                key={client.id}
                value={client.id}
              >
                {client.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="notes" className='mr-2 font-bold text-white'>
            What are you working on?
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Website edits, SEO work, maintenance..."
            className='w-full border rounded-lg bg-amber-50 text-gray-800 p-1'
          />
        </div>

        <button type="submit" className='block text-white font-semibold mx-auto my-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg border-2'>
          Start Timer
        </button>
      </form>
    </section>
  )
}
