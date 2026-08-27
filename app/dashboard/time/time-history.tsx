type TimeCard = {
  id: string
  start_time: string
  stop_time: string | null
  total_minutes: number | null
  notes: string | null
  client: {
    name: string
  }
}

type Props = {
  timeCards: TimeCard[]
}

function formatTime(dateString: string) {
  return new Date(dateString).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatDuration(minutes: number | null) {
  if (minutes === null) {
    return 'Running'
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `${remainingMinutes}m`
  }

  if (remainingMinutes === 0) {
    return `${hours}h`
  }

  return `${hours}h ${remainingMinutes}m`
}

export default function TimeHistory({
  timeCards,
}: Props) {
  if (timeCards.length === 0) {
    return (
      <section className="w-full max-w-lg bg-secondary rounded-xl shadow-lg shadow-black/30 p-6 my-10 mx-auto lg:max-h-80">
        <h2 className="text-white text-xl text-center font-semibold pb-2">Recent Work</h2>
        <p className="text-md text-white text-center">No time cards yet.</p>
      </section>
    )
  }

  return (
    <section className="w-full max-w-lg bg-secondary rounded-xl shadow-lg shadow-black/30 p-6 my-10 mx-auto lg:max-h-80 overflow-scroll">
      <h2 className="text-white text-xl text-center font-semibold pb-2">Recent Work</h2>

      <div className="text-white text-md">
        {timeCards.slice(0,4).map((timeCard) => (
          <article key={timeCard.id} className="border my-2 p-1">
            <div>
              <h3 className="my-2 font-bold">{timeCard.client.name}</h3>

              {timeCard.notes && (
                <p>{timeCard.notes}</p>
              )}
            </div>

            <div className="my-2">
              <div className="flex">
                <p>
                  {formatDate(timeCard.start_time)}
                </p>

                <p>
                  {formatTime(timeCard.start_time)}
                  {' – '}
                  {timeCard.stop_time
                    ? formatTime(timeCard.stop_time)
                    : 'Running'}
                </p>
              </div>

              <strong>
                <p> Total Time: {formatDuration(timeCard.total_minutes)}</p>
              </strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
