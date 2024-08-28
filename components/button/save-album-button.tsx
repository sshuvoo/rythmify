'use client'

import { saveAndDeleteAlbum } from '@/actions/save-albums'
import { Button } from '@mantine/core'
import { IconHeartFilled, IconHeartPlus } from '@tabler/icons-react'
import toast from 'react-hot-toast'

export function SaveAlbumButton({
   isSaved,
   album_id,
}: {
   album_id: string
   isSaved: boolean
}) {
   const handleSavedAlbum = async () => {
      try {
         await saveAndDeleteAlbum.bind(
            null,
            album_id,
            isSaved ? 'DELETE' : 'PUT'
         )()
         toast.success(isSaved ? 'Removed from library' : 'Added to library')
      } catch (error) {
         toast.error('Something went wrong')
      }
   }

   return (
      <form action={handleSavedAlbum}>
         <Button
            color="#000000"
            type="submit"
            leftSection={
               isSaved ? (
                  <IconHeartFilled className="text-rose-500" />
               ) : (
                  <IconHeartPlus />
               )
            }
         >
            {isSaved ? 'Saved' : 'Save to Library'}
         </Button>
      </form>
   )
}
