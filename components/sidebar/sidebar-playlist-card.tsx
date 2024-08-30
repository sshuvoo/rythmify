import { Image } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

export function SidebarPlaylistCard({ playlist }: { playlist: any }) {
   return (
      <Link
         href={`/playlists/${playlist.id}`}
         className="flex items-center justify-between gap-4 p-2 hover:bg-gray-100"
      >
         <div className="grid grid-cols-[auto,1fr] gap-4">
            <div className="h-[50px] w-[50px]">
               <Image
                  radius="md"
                  h={50}
                  w={50}
                  src={playlist?.images && playlist?.images[0]?.url}
                  alt={playlist?.name}
               />
            </div>
            <div>
               <h3 className="line-clamp-1 text-lg font-medium">
                  {playlist?.name}
               </h3>
               <p className="line-clamp-1 text-sm font-medium">
                  Tracks: {playlist?.tracks?.total}
               </p>
            </div>
         </div>
      </Link>
   )
}
