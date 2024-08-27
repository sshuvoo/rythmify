'use server'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export const saveAlbumToLibrary = async (album_id: string) => {
   const session = await auth()
   if (!session) redirect(`/authentication?redirect_to=/albums/${album_id}`)

   try {
      const response = await fetch(
         `${process.env.BASE_API_URL}/me/albums?ids=${album_id}`,
         {
            method: 'PUT',
            headers: {
               Authorization: `Bearer ${session.token.access_token}`,
               'Content-Type': 'application/json',
            },
         }
      )
      // if (!response.ok) throw new Error('Server error')
      const json = await response.json()
   console.log(json);
      return json
   } catch (error) {
      console.log(error)
   }
}
