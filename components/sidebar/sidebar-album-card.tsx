import { Image } from '@mantine/core'
import Link from 'next/link'

export function SidebarAlbumCard({ album }: { album: any }) {
   return (
      <Link
         href={`/albums/${album.id}`}
         className="flex items-center justify-between gap-4 rounded-md p-2 hover:bg-gray-100"
      >
         <div className="grid grid-cols-[auto,1fr] gap-2">
            <div className="h-[50px] w-[50px]">
               <Image
                  radius="md"
                  h={50}
                  w={50}
                  src={album.images[0].url}
                  alt={album.name}
               />
            </div>
            <div>
               <h3 className="line-clamp-1 text-lg font-medium">
                  {album.name}
               </h3>
               <p className="line-clamp-1 text-sm font-light">
                  Album .{' '}
                  {album.artists.map((artist: any) => artist.name).join(' x ')}
               </p>
            </div>
         </div>
      </Link>
   )
}
