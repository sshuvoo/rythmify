import { IconMusic } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

export function SidebarAlbumCard({ album }: { album: any }) {
   return (
      <Link
         href={`/albums/${album.id}`}
         className="flex items-center justify-between gap-4 rounded-md hover:bg-gray-100 xl:p-2"
      >
         <div className="grid grid-cols-[auto,1fr] gap-2">
            <div className="relative h-[40px] w-[40px] xl:h-[50px] xl:w-[50px]">
               {album?.images && album?.images[0]?.url ? (
                  <Image
                     fill
                     className="rounded-md object-cover"
                     src={album.images[0].url}
                     alt={album.name}
                  />
               ) : (
                  <IconMusic className="h-full w-full" stroke={1} />
               )}
            </div>
            <div>
               <h3 className="line-clamp-1 hidden text-lg font-medium lg:block">
                  {album.name}
               </h3>
               <p className="line-clamp-1 hidden text-sm font-light lg:block">
                  Album .{' '}
                  {album.artists.map((artist: any) => artist.name).join(' x ')}
               </p>
            </div>
         </div>
      </Link>
   )
}
