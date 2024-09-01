import Link from 'next/link'
import SearchForm from '../search/search-form'
import { AvatarMenu } from './avatar-menu'
import { auth } from '@/auth'
import { SigninButton } from './signin-button'

export async function Header() {
   const session = await auth()

   return (
      <header className="sticky top-0 z-[1000] border border-gray-200 bg-white xl:px-4">
         <div className="relative flex items-center justify-between rounded-md p-4">
            <Link
               className="text-lg font-semibold md:text-xl xl:text-2xl"
               href={'/'}
            >
               <span className="text-green-500">rythm</span>
               <span>ify</span>
            </Link>
            <div className="absolute left-1/2 top-1/2 w-52 -translate-x-1/2 -translate-y-1/2 sm:w-60 md:w-72 lg:w-96 xl:w-[420px] 2xl:w-[500px]">
               <SearchForm />
            </div>
            {session ? (
               <AvatarMenu
                  email={session.user.email!}
                  name={session.user.name!}
                  image={session.user.image}
               />
            ) : (
               <SigninButton />
            )}
         </div>
      </header>
   )
}
