import { getFeaturedPlaylists } from '@/actions/get-featured-playlists'
import { Image } from '@mantine/core'
import {
   IconHomeFilled,
   IconPlaylist,
   IconPlus,
   IconSearch,
} from '@tabler/icons-react'
import Link from 'next/link'

export default async function Sidebar() {
   const popularPlaylists = await getFeaturedPlaylists()
   
   return (
      <div className="max-w-[420px] space-y-4">
         <div className="space-y-4 border border-gray-200 px-4 py-5 rounded-md">
            <Link
               className="flex items-center gap-3 text-base font-bold"
               href={'/'}
            >
               <IconHomeFilled />
               <span>Home</span>
            </Link>
            <Link
               className="flex items-center gap-3 text-base font-bold"
               href={'/search'}
            >
               <IconSearch />
               <span>Search</span>
            </Link>
         </div>
         <div className="border border-gray-200 px-4 py-5 rounded-md">
            <div className="flex justify-between">
               <div className="flex items-center gap-3 text-base font-bold">
                  <IconPlaylist />
                  <span>Your Playlists</span>
               </div>
               <div>
                  <button>
                     <IconPlus />
                  </button>
               </div>
            </div>
            <div>
               <div className="flex items-center gap-3 text-base font-bold my-4">
                  <span>Popular</span>
               </div>
               <div>
                  {popularPlaylists.playlists.items.map((playlist: any) => (
                     <Link
                        href={`/playlists/${playlist.id}`}
                        key={playlist.id}
                        className="flex gap-4 justify-between items-center hover:bg-gray-100 p-2"
                     >
                        <div className="grid grid-cols-[auto,1fr] gap-4">
                           <div className="w-20 h-20">
                              <Image
                                 radius="md"
                                 h={80}
                                 w={80}
                                 src={playlist.images[0].url}
                                 alt=""
                              />
                           </div>
                           <div>
                              <h3 className="text-xl font-medium line-clamp-1">
                                 {playlist.name}
                              </h3>
                              <p className="font-light text-sm line-clamp-1">
                                 {playlist.description}
                              </p>
                              <p className="font-medium text-sm line-clamp-1">
                                 Tracks: {playlist.tracks.total}
                              </p>
                           </div>
                        </div>
                     </Link>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}
