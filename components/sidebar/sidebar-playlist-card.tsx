import { IconMusic } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function SidebarPlaylistCard({ playlist }: { playlist: any }) {
   return (
      <Link
         href={`/playlists/${playlist.id}`}
         className="block hover:bg-gray-100 xl:p-2"
      >
         <div className="xl:grid xl:grid-cols-[auto,1fr] xl:gap-4">
            <div className="relative h-[40px] w-[40px] xl:h-[50px] xl:w-[50px]">
               {playlist?.images && playlist?.images[0]?.url ? (
                  <Image
                     fill
                     className="rounded-md object-cover"
                     src={playlist?.images[0]?.url}
                     alt={playlist?.name}
                  />
               ) : (
                  <IconMusic className="h-full w-full text-[#868e96]" />
               )}
            </div>
            <div>
               <h3 className="line-clamp-1 hidden text-lg font-medium xl:block">
                  {playlist?.name}
               </h3>
               <p className="line-clamp-1 hidden text-sm font-medium xl:block">
                  Tracks: {playlist?.tracks?.total}
               </p>
            </div>
         </div>
      </Link>
   )
}
