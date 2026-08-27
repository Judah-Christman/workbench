'use client'

import Link from 'next/link'

type Client = {
  id: string
  name: string
  email: string | null
}

export default function ClientList({
  clients,
}: {
  clients: Client[]
}) {
  if (clients.length === 0) {
    return (
      <div className='w-full p-6 bg-secondary rounded-xl shadow-lg shadow-black/30'>
        <h2 className='text-lg text-white text-center font-semibold'>
          No clients yet.
        </h2>

        <Link
          href="/dashboard/clients/new"
          className='text-white bg-blue-600 hover:bg-blue-700 border px-3 py-2 rounded-xl my-10 mx-auto'
        >
          Add your first client
        </Link>
      </div>
    )
  }

  return (
    <div className='w-full p-6 bg-secondary rounded-xl shadow-lg shadow-black/30 my-10'>
      <h2 className='text-lg text-white text-center font-semibold mb-5'>
        Clients
      </h2>

      <ul className='grid grid-cols-2 lg:grid-cols-6 gap-5'>
        {clients.map((client) => (
          <li className="text-white mx-auto" key={client.id}>
            <Link href={`/dashboard/clients/${client.id}`}>
              <strong>{client.name}</strong>

              {client.email && (
                <span>{client.email}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
