import { getCategories } from '@/actions/get-categories'
import { getMyPlaylists } from '@/actions/get-my-playlists'
import { search } from '@/actions/search'
import AlbumCarousel from '@/components/album/album-carousel'
import ArtistCarousel from '@/components/artist/artist-carousel'
import AudiobookCarousel from '@/components/audiobook/audiobook-carousel'
import { Console } from '@/components/console'
import { PlaylistCarousel } from '@/components/playlist/playlists-carousel'
import CategoryCard from '@/components/search/category-card'
import { SearchFilter } from '@/components/search/search-filter'
import { SearchTrackCard } from '@/components/search/search-track-card'

export default async function SearchPage({
   searchParams: { q, type },
}: {
   searchParams: { q: string; type: string }
}) {
   const result = q && (await search(q, type))
   const categories = !result ? await getCategories(50) : null
   const myPlaylists = await getMyPlaylists()

   return (
      <div className="max-h-[calc(100vh-106px)] overflow-hidden overflow-y-auto rounded-md border border-gray-200 px-4 pb-32">
         <Console data={result} />
         {result && (
            <div className="sticky top-0 z-50 border-b bg-white pb-4">
               <SearchFilter />
            </div>
         )}
         {result?.tracks?.items?.length > 0 && (
            <div>
               <h2 className="my-4 text-xl font-semibold xl:text-2xl">Songs</h2>

               <table className="w-full">
                  <tbody>
                     {result?.tracks?.items?.map((track: any, i: number) => (
                        <SearchTrackCard
                           key={track.id}
                           track={track}
                           playlist={result?.tracks?.items}
                           myPlaylists={myPlaylists || []}
                        />
                     ))}
                  </tbody>
               </table>
            </div>
         )}
         {result?.artists?.items?.length > 0 && (
            <div>
               <h2 className="my-4 text-xl font-semibold xl:text-2xl">
                  Artists
               </h2>
               <ArtistCarousel artists={result.artists.items} />
            </div>
         )}
         {result?.audiobooks?.items?.length > 0 && (
            <div>
               <h2 className="my-4 text-xl font-semibold xl:text-2xl">
                  Audiobooks
               </h2>
               <AudiobookCarousel audiobooks={result.audiobooks.items} />
            </div>
         )}
         {result?.albums?.items?.length > 0 && (
            <div>
               <h2 className="my-4 text-xl font-semibold xl:text-2xl">
                  Albums
               </h2>
               <AlbumCarousel albums={result.albums.items} />
            </div>
         )}
         {result?.playlists?.items?.length > 0 && (
            <div>
               <h2 className="my-4 text-xl font-semibold xl:text-2xl">
                  Playlists
               </h2>
               <PlaylistCarousel playlists={result?.playlists?.items} />
            </div>
         )}
         {categories?.categories?.items?.length > 0 && (
            <div>
               <h2 className="my-4 text-xl font-semibold xl:text-2xl">
                  Browse All
               </h2>
               <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {categories.categories.items.map((item: any) => (
                     <CategoryCard key={item.id} item={item} />
                  ))}
               </div>
            </div>
         )}
      </div>
   )
}
