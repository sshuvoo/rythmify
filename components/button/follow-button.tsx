'use client'

import { followUnfollowArtists } from '@/actions/follow-artists'
import { Button } from '@mantine/core'
import toast from 'react-hot-toast'

export function FollowButton({
   artist_id,
   isFollowed,
}: {
   artist_id: string
   isFollowed: boolean
}) {
   const clientAction = async () => {
      try {
         await followUnfollowArtists(artist_id, isFollowed ? 'DELETE' : 'PUT')
         toast.success(
            isFollowed ? 'Unfollow successfully' : 'Followed successfully'
         )
      } catch (error) {
         toast.error(isFollowed ? 'Failed to unfollow' : 'Failed to follow')
      }
   }
   return (
      <form action={clientAction}>
         <Button
            color={isFollowed ? '#22c55e' : '#000000'}
            type="submit"
            radius={20}
            variant={isFollowed ? 'outline' : 'default'}
         >
            {isFollowed ? 'Following' : 'Follow'}
         </Button>
      </form>
   )
}
