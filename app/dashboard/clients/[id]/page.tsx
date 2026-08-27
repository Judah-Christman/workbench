import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { updateClientAction, deleteClientAction } from '../actions'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function ClientPage({
  params,
}: Props) {
  const { id } = await params

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    notFound()
  }

  const { data: client, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !client) {
    notFound()
  }

  return (
    <main className='min-h-screen w-full max-w-300 mx-auto p-4'>
      <h1 className='text-2xl font-bold my-5'>Edit Client</h1>

      <form action={updateClientAction} className='max-w-lg p-4 bg-secondary rounded-xl shadow-md shadow-black/30 my-5 flex flex-col items-center text-white mx-auto'>
        <input
          type="hidden"
          name="id"
          value={client.id}
        />

        <div className='max-w-md my-2'>
          <label htmlFor="name" className='font-bold mr-2'>
            Client Name
          </label>

          <input
            id="name"
            name="name"
            defaultValue={client.name}
            required
            className='bg-black/30 rounded-lg p-1'
          />
        </div>

        <div className='max-w-md my-2'>
          <label htmlFor="email" className='font-bold mr-2'>
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            defaultValue={client.email ?? ''}
            className='bg-black/30 rounded-lg p-1'
          />
        </div>

        <div className='max-w-md my-2'>
          <label htmlFor="phone" className='font-bold mr-2'>
            Phone
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={client.phone ?? ''}
            className='bg-black/30 rounded-lg p-1'
          />
        </div>

        <div className='w-full my-2 flex flex-col'>
          <label htmlFor="notes" className='font-bold mr-2'>
            Notes
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={8}
            defaultValue={client.notes ?? ''}
            className='bg-black/30 rounded-lg p-1 w-full'
          />
        </div>

        <label>
          <input
            type="checkbox"
            name="active"
            defaultChecked={client.active}
          />

          Active Client
        </label>

        <button type="submit" className='px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl border my-5'>
          Save Changes
        </button>
      </form>

      <form action={deleteClientAction}>
        <input
          type="hidden"
          name="id"
          value={client.id}
        />

        <button type="submit" className='px-3 py-2 bg-red-700 hover:bg-red-800 rounded-xl border text-white'>
          Delete Client
        </button>
      </form>
    </main>
  )
}
