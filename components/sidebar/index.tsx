import { getFeaturedPlaylists } from '@/actions/get-featured-playlists'
import { getSavedAlbums } from '@/actions/get-saved-albums'
import { Image } from '@mantine/core'
import {
   IconHomeFilled,
   IconPlaylist,
   IconPlus,
   IconSearch,
} from '@tabler/icons-react'
import Link from 'next/link'
import { Console } from '../console'
import { SidebarAlbumCard } from './sidebar-album-card'
import { getFollowedArtists } from '@/actions/get-followed-artists'
import { SidebarArtistCard } from './sidebar-artist-card'

export default async function Sidebar() {
   const savedAlbums = await getSavedAlbums()
   const popularPlaylists = await getFeaturedPlaylists()
   const followedArtists = await getFollowedArtists()

   return (
      <div className="max-w-[420px] space-y-4">
         <Console data={followedArtists} />
         <div className="space-y-4 rounded-md border border-gray-200 px-4 py-5">
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
         <div className="rounded-md border border-gray-200 px-4 py-5">
            <div className="flex justify-between">
               <div className="flex items-center gap-3 text-base font-bold">
                  <IconPlaylist />
                  <span>Your Music Library</span>
               </div>
               <div>
                  <button>
                     <IconPlus />
                  </button>
               </div>
            </div>
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
               <div>
                  <div className="my-4 flex items-center gap-3 text-base font-bold">
                     <span>Followed Artists</span>
                  </div>
                  <div>
                     {followedArtists?.artists?.items?.map((item: any) => (
                        <SidebarArtistCard key={item.id} artist={item} />
                     ))}
                  </div>
               </div>
               <div>
                  <div className="my-4 flex items-center gap-3 text-base font-bold">
                     <span>Saved Albums</span>
                  </div>
                  <div>
                     {savedAlbums?.items?.map((item: any) => (
                        <SidebarAlbumCard
                           key={item.album.id}
                           album={item.album}
                        />
                     ))}
                  </div>
               </div>
               <div>
                  <div className="my-4 flex items-center gap-3 text-base font-bold">
                     <span>Popular</span>
                  </div>
                  <div>
                     {popularPlaylists.playlists.items.map((playlist: any) => (
                        <Link
                           href={`/playlists/${playlist.id}`}
                           key={playlist.id}
                           className="flex items-center justify-between gap-4 p-2 hover:bg-gray-100"
                        >
                           <div className="grid grid-cols-[auto,1fr] gap-4">
                              <div className="h-20 w-20">
                                 <Image
                                    radius="md"
                                    h={80}
                                    w={80}
                                    src={playlist.images[0].url}
                                    alt=""
                                 />
                              </div>
                              <div>
                                 <h3 className="line-clamp-1 text-xl font-medium">
                                    {playlist.name}
                                 </h3>
                                 <p className="line-clamp-1 text-sm font-light">
                                    {playlist.description}
                                 </p>
                                 <p className="line-clamp-1 text-sm font-medium">
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
      </div>
   )
}
