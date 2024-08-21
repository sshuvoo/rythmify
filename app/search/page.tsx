import { getCategories } from '@/actions/get-categories'
import { search } from '@/actions/search'
import AlbumCarousel from '@/components/album/album-carousel'
import ArtistCarousel from '@/components/artist/artist-carousel'
import AudiobookCarousel from '@/components/audiobook/audiobook-carousel'
import Console from '@/components/console'
import CategoryCard from '@/components/search/category-card'
import SearchForm from '@/components/search/search-form'
import { TrackListCard } from '@/components/track/track-list-card'
import { Badge } from '@mantine/core'

const searchFilters = [
   { title: 'All', value: 'all' },
   { title: 'Artists', value: 'artists' },
   { title: 'Playlists', value: 'playlists' },
   { title: 'Songs', value: 'tracks' },
   { title: 'Albums', value: 'albums' },
   { title: 'Profiles', value: 'users' },
   { title: 'Audiobook', value: 'audiobook' },
   { title: 'Podcast & Episodes', value: 'podcastAndEpisodes' },
]

const allTypes = [
   'album',
   'artist',
   'playlist',
   'track',
   'show',
   'episode',
   'audiobook',
]

export default async function SearchPage({
   searchParams: { q },
}: {
   searchParams: { q: string }
}) {
   const result = q && (await search(q, allTypes))
   const categories = !result && (await getCategories(50))

   return (
      <div className="border border-gray-200 px-4 pb-4 rounded-md overflow-hidden overflow-y-auto max-h-[calc(100vh-32px)]">
         <div className="sticky top-0 z-50 bg-white py-4 border-b">
            <Console data={result} />
            <SearchForm />
            <div className="flex mt-4 gap-2 flex-wrap">
               {searchFilters.map((item) => (
                  <Badge key={item.value} color="teal" size="lg">
                     {item.title}
                  </Badge>
               ))}
            </div>
         </div>
         {result?.tracks?.items?.length > 0 && (
            <div>
               <div>
                  <h2 className="text-2xl font-semibold my-8">Songs</h2>
               </div>
               <table className="w-full">
                  <tbody>
                     {result?.tracks?.items?.map((track: any) => (
                        <TrackListCard key={track.id} track={track} />
                     ))}
                  </tbody>
               </table>
            </div>
         )}
         {result?.artists?.items?.length > 0 && (
            <div>
               <div>
                  <h2 className="text-2xl font-semibold my-8">Artists</h2>
               </div>
               <ArtistCarousel artists={result.artists.items} />
            </div>
         )}
         {result?.audiobooks?.items?.length > 0 && (
            <div>
               <div>
                  <h2 className="text-2xl font-semibold my-8">Audiobooks</h2>
               </div>
               <AudiobookCarousel audiobooks={result.artists.items} />
            </div>
         )}
         {result?.albums?.items?.length > 0 && (
            <div>
               <div>
                  <h2 className="text-2xl font-semibold my-8">Albums</h2>
               </div>
               <AlbumCarousel albums={result.albums.items} />
            </div>
         )}
         {categories?.categories?.items?.length > 0 && (
            <div>
               <div>
                  <h2 className="text-2xl font-semibold my-8">Browse All</h2>
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
