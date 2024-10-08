'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const saveAndDeleteAlbum = async (
   album_id: string,
   method: 'PUT' | 'DELETE'
) => {
   const session = await auth()
   if (!session) redirect(`/authentication?redirect_to=/albums/${album_id}`)

   try {
      const response = await fetch(
         `${process.env.BASE_API_URL}/me/albums?ids=${album_id}`,
         {
            method,
            headers: {
               Authorization: `Bearer ${session.token.access_token}`,
            },
         }
      )
      if (!response.ok) throw new Error('Server error')
      revalidatePath('/')
      revalidatePath(`/albums/${album_id}`)
   } catch (error) {
      console.log(error)
   }
}
