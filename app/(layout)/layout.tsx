import { auth } from '@/auth'
import { AvatarMenu } from '@/components/header/avatar-menu'
import { Player } from '@/components/player'
import SearchForm from '@/components/search/search-form'
import Sidebar from '@/components/sidebar'
import { Avatar } from '@mantine/core'
import Link from 'next/link'

interface Children {
   children: React.ReactNode
}

export default async function Layout({ children }: Children) {
   const session = await auth()

   return (
      <div>
         <header className="sticky top-0 z-[1000] border border-gray-200 bg-white px-4">
            <div className="relative flex items-center justify-between rounded-md p-4">
               <Link className="text-2xl font-semibold" href={'/'}>
                  <span className="text-green-500">rythm</span>
                  <span>ify</span>
               </Link>
               <div className="absolute left-1/2 top-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2">
                  <SearchForm />
               </div>
               {session ? (
                  <AvatarMenu
                     email={session.user.email!}
                     name={session.user.name!}
                     image={session.user.image}
                  />
               ) : (
                  <Link
                     className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
                     href={'/authentication'}
                  >
                     Signin
                  </Link>
               )}
            </div>
         </header>
         <div className="grid grid-cols-[auto,1fr] gap-4 p-4">
            <Sidebar />
            {children}
         </div>
         <Player />
      </div>
   )
}
