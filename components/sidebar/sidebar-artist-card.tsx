import { printFollowers } from '@/utils/printFollowers'
import { IconUserCircle } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

export function SidebarArtistCard({ artist }: { artist: any }) {
   return (
      <Link
         href={`/artists/${artist.id}`}
         className="flex items-center justify-between gap-4 rounded-md hover:bg-gray-100 xl:p-2"
      >
         <div className="grid grid-cols-[auto,1fr] gap-2">
            <div className="relative h-[40px] w-[40px] lg:h-[45px] lg:w-[45px] xl:h-[50px] xl:w-[50px]">
               {artist?.images && artist?.images[0]?.url ? (
                  <Image
                     fill
                     className="rounded-md object-cover"
                     src={artist.images[0].url}
                     alt={artist.name}
                  />
               ) : (
                  <IconUserCircle className="h-full w-full" stroke={1} />
               )}
            </div>
            <div>
               <h3 className="line-clamp-1 hidden text-lg font-medium lg:block">
                  {artist.name}
               </h3>
               <p className="line-clamp-1 hidden text-sm font-light lg:block">
                  {printFollowers(artist?.followers?.total)} Followers
               </p>
            </div>
         </div>
      </Link>
   )
}
