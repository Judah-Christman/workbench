import Link from 'next/link'
import { createClientAction } from '../actions'

export default function NewClientPage() {
  return (
    <main className='w-full max-w-300 mx-auto min-h-screen p-6'>
      <h1 className='text-2xl font-bold my-10'>Create Client</h1>

      <form
        action={createClientAction}
        className='w-full max-w-lg bg-secondary mx-auto rounded-xl p-4 flex flex-col my-5 shadow-md shadow-black/30'
      >
        <div className='w-full max-w-md mx-auto my-2'>
          <label
            htmlFor="name"
            className='text-white font-bold mr-2'
          >
            Client Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            className='bg-black/30 rounded-md p-1 text-white'
          />
        </div>

        <div className='w-full max-w-md mx-auto my-2'>
          <label
            htmlFor="email"
            className='text-white font-bold mr-2'
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            className='bg-black/30 rounded-md p-1 text-white'
          />
        </div>

        <div className='w-full max-w-md mx-auto my-2'>
          <label htmlFor="phone" className='text-white font-bold mr-2'>
            Phone
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            className='bg-black/30 rounded-md p-1 text-white'
          />
        </div>

        <div className='w-full max-w-md mx-auto flex flex-col items-center mt-5'>
          <label htmlFor="notes" className='text-white font-bold mr-2'>
            Notes
          </label>

          <textarea
            id="notes"
            name="notes"
            rows={5}
            className='bg-black/30 rounded-md p-1 w-full text-white'
          />
        </div>

        <button
          type="submit"
          className='block text-white font-semibold my-2 mx-3 bg-blue-600 hover:bg-blue-700 rounded-xl border'
        >
          Create Client
        </button>
      </form>

      <Link
        href="/dashboard"
        className='py-2 px-3 bg-red-700 hover:bg-red-800 rounded-xl text-white font-semibold'
      >
        Cancel
      </Link>
    </main>
  )
}
