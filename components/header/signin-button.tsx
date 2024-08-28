'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function SigninButton() {
   const pathname = usePathname()
   const redirectUrl = `redirect_to=${pathname}`

   return (
      <Link
         className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white"
         href={`/authentication?${redirectUrl}`}
      >
         Signin
      </Link>
   )
}
