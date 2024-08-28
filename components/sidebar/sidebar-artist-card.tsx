import { printFollowers } from '@/utils/printFollowers'
import { Image } from '@mantine/core'
import Link from 'next/link'

export function SidebarArtistCard({ artist }: { artist: any }) {
   console.log(artist)
   return (
      <Link
         href={`/artists/${artist.id}`}
         className="flex items-center justify-between gap-4 rounded-md p-2 hover:bg-gray-100"
      >
         <div className="grid grid-cols-[auto,1fr] gap-2">
            <div className="h-[50px] w-[50px]">
               <Image
                  radius="md"
                  h={50}
                  w={50}
                  src={artist.images[0].url}
                  alt={artist.name}
               />
            </div>
            <div>
               <h3 className="line-clamp-1 text-lg font-medium">
                  {artist.name}
               </h3>
               <p className="line-clamp-1 text-sm font-light">
                  {printFollowers(artist?.followers?.total)} Followers
               </p>
            </div>
         </div>
      </Link>
   )
}
