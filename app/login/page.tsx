import Link from 'next/link'
import { login } from './actions'

export default function LoginPage() {
  return (
    <main className='min-h-screen w-full max-w-300 mx-auto p-6'>
      <h2 className='text-2xl font-bold my-5'>Login</h2>

      <form action={login} className='max-w-lg bg-secondary p-4 rounded-xl flex flex-col items-center text-white mx-auto shadow-md shadow-black/30 my-5'>
        <div className='max-w-md my-2'>
          <label htmlFor="email" className='font-bold mr-2'>Email</label>

          <input
            id="email"
            name="email"
            type="email"
            required
            className='bg-black/30 rounded-lg p-1'
          />
        </div>

        <div className='max-w-md my-2'>
          <label htmlFor="password" className='font-bold mr-2'>Password</label>

          <input
            id="password"
            name="password"
            type="password"
            required
            className='bg-black/30 rounded-lg p-1'
          />
        </div>

        <button type="submit" className='px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl border'>
          Login
        </button>
      </form>

      <p className='mx-auto text-center'>
        Do not have an account?{' '}
        <Link href="/signup" className='underline'>
          Sign up
        </Link>
      </p>
    </main>
  )
}
