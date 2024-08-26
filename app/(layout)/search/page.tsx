import { getCategories } from '@/actions/get-categories'
import { search } from '@/actions/search'
import AlbumCarousel from '@/components/album/album-carousel'
import ArtistCarousel from '@/components/artist/artist-carousel'
import AudiobookCarousel from '@/components/audiobook/audiobook-carousel'
import CategoryCard from '@/components/search/category-card'
import { SearchFilter } from '@/components/search/search-filter'
import SearchForm from '@/components/search/search-form'
import { TrackListCard } from '@/components/track/track-list-card'

export default async function SearchPage({
   searchParams: { q, type },
}: {
   searchParams: { q: string; type: string }
}) {
   const result = q && (await search(q, type))
   const categories = !result && (await getCategories(50))

   return (
      <div className="max-h-[calc(100vh-32px)] overflow-hidden overflow-y-auto rounded-md border border-gray-200 px-4 pb-32">
         {result && (
            <div className="sticky top-0 z-50 border-b bg-white pb-4">
               <SearchFilter />
            </div>
         )}
         {result?.tracks?.items?.length > 0 && (
            <div>
               <div>
                  <h2 className="my-8 text-2xl font-semibold">Songs</h2>
               </div>
               <table className="w-full">
                  <tbody>
                     {result?.tracks?.items?.map((track: any, i: number) => (
                        <TrackListCard
                           index={i}
                           key={track.id}
                           track={track}
                           playlist={result?.tracks?.items}
                        />
                     ))}
                  </tbody>
               </table>
            </div>
         )}
         {result?.artists?.items?.length > 0 && (
            <div>
               <div>
                  <h2 className="my-8 text-2xl font-semibold">Artists</h2>
               </div>
               <ArtistCarousel artists={result.artists.items} />
            </div>
         )}
         {result?.audiobooks?.items?.length > 0 && (
            <div>
               <div>
                  <h2 className="my-8 text-2xl font-semibold">Audiobooks</h2>
               </div>
               <AudiobookCarousel audiobooks={result.audiobooks.items} />
            </div>
         )}
         {result?.albums?.items?.length > 0 && (
            <div>
               <div>
                  <h2 className="my-8 text-2xl font-semibold">Albums</h2>
               </div>
               <AlbumCarousel albums={result.albums.items} />
            </div>
         )}
         {categories?.categories?.items?.length > 0 && (
            <div>
               <div>
                  <h2 className="my-8 text-2xl font-semibold">Browse All</h2>
               </div>
               <div className="grid grid-cols-4 gap-4">
                  {categories.categories.items.map((item: any) => (
                     <CategoryCard key={item.id} item={item} />
                  ))}
               </div>
            </div>
         )}
      </div>
   )
}
