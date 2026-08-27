import Link from "next/link";
import { createClient } from '@/lib/supabase/server';

export default async function Navbar() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  return (
    <>
      <nav className="bg-primary min-h-30 pt-3 max-w-300 w-full lg:rounded-b-xl">
        <div className="flex items-center justify-center gap-2">
          <div className="py-3 px-2 border-2 border-white rounded-xl text-3xl font-bold text-white">
            WB
          </div>
          <p className="text-3xl font-semibold text-white">WorkBench</p>
        </div>
        {user && <ul className="flex gap-2 text-lg xs:text-xl items-center justify-center my-4">
          <li><Link href="/dashboard" className="p-2 bg-secondary rounded-xl text-white">Dashboard</Link></li>
          <li><Link href="/dashboard/clients" className="p-2 bg-secondary rounded-xl text-white">Clients</Link></li>
          <li><Link href="/dashboard/clients/new" className="p-2 bg-secondary rounded-xl text-white">+Client</Link></li>
          <li><Link href="/dashboard/time-cards" className="p-2 bg-secondary rounded-xl text-white">Time Cards</Link></li>
        </ul>}
      </nav>
    </>
  );
}
