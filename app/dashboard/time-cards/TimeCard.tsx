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

export default function TimeCardList({
  timeCards,
}: Props) {
  if (timeCards.length === 0) {
    return (
      <section>
        <h2>Recent Work</h2>
        <p>No time cards yet.</p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-2xl font-bold my-10">Time Cards</h2>

      <div className="flex flex-col items-center max-w-lg bg-secondary rounded-xl shadow-md shadow-black/30 mx-auto text-white p-4">
        {timeCards.map((timeCard) => (
          <article key={timeCard.id} className="border w-full p-2">
            <div>
              <h3 className="my-2 font-bold">{timeCard.client.name}</h3>

              {timeCard.notes && (
                <p>{timeCard.notes}</p>
              )}
            </div>

            <div>
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

              <strong>
                <p className="py-2"> Total Time: {formatDuration(timeCard.total_minutes)}</p>
              </strong>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
