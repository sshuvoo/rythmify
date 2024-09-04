import { printFollowers } from '@/utils/printFollowers'
import { Text } from '@mantine/core'
import { IconUserCircle } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

export function RelatedArtistCard({ artist }: { artist: any }) {
   return (
      <Link className="bg-white hover:bg-[#f6f6f6]" href={`/artists/${artist.id}`}>
         <div className="rounded-md bg-inherit p-4">
            <div className="relative m-auto size-36 bg-inherit xl:size-[200px]">
               {artist?.images && artist?.images[0] ? (
                  <Image
                     className="rounded-full object-cover"
                     alt=""
                     fill
                     src={artist?.images[0]?.url}
                  />
               ) : (
                  <IconUserCircle className="h-full w-full" stroke={1} />
               )}
            </div>
            <Text lineClamp={1} fz="md" fw={500} mt="md">
               {artist.name}
            </Text>
            <Text c="dimmed" fz="sm" lineClamp={1}>
               {printFollowers(artist?.followers?.total)} Followers
            </Text>
         </div>
      </Link>
   )
}
