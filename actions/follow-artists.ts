'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export const followUnfollowArtists = async (
   artist_id: string,
   method: 'PUT' | 'DELETE'
) => {
   const session = await auth()
   if (!session) redirect(`/authentication?redirect_to=/artists/${artist_id}`)

   try {
      const response = await fetch(
         `${process.env.BASE_API_URL}/me/following?type=artist&ids=${artist_id}`,
         {
            method,
            headers: {
               Authorization: `Bearer ${session.token.access_token}`,
            },
         }
      )

      if (!response.ok) throw new Error('Server error')
      revalidatePath('/')
      revalidatePath(`/artists/${artist_id}`)
   } catch (error) {
      console.log(error)
   }
}
