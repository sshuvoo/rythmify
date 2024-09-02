import { getNewReleases } from '@/actions/get-new-releases'
import { getReletedArtists } from '@/actions/get-related-artists'
import { getTopItems } from '@/actions/get-top-items'
import AlbumCarousel from '@/components/album/album-carousel'
import ArtistCarousel from '@/components/artist/artist-carousel'
import { TopArtistCard } from '@/components/artist/top-artist-card'
import { TopTrackCard } from '@/components/track/top-track-card'

export default async function Home() {
   const bangla = await getReletedArtists('60jYUgQzKAtnJoXKGk1GNn')
   const hindi = await getReletedArtists('4YRxDV8wJFPHPTeXepOstw')
   const english = await getReletedArtists('06HL4z0CvFAxyc27GXpf02')
   const albums = await getNewReleases()
   const topArtist = await getTopItems('artists', 10)
   const topTracks = await getTopItems('tracks', 4)
   
   return (
      <div className="max-h-[calc(100vh-32px)] overflow-y-auto pb-32">
         {topTracks?.items?.length > 0 && (
            <div>
               <h2 className="my-4 text-2xl font-medium xl:my-8">
                  Most Listened Songs
               </h2>
               <div className="grid grid-cols-2 gap-2 xl:grid-cols-4 xl:gap-4">
                  {topTracks?.items?.map((track: any) => (
                     <TopTrackCard
                        playlist={topTracks.items}
                        track={track}
                        key={track.id}
                     />
                  ))}
               </div>
            </div>
         )}
         {topArtist?.items?.length > 0 && (
            <div>
               <h2 className="my-8 text-2xl font-medium">
                  Most Played Artists
               </h2>
               <div className="grid grid-cols-1 gap-2 xl:grid-cols-4 xl:gap-4">
                  {topArtist?.items?.map((artist: any) => (
                     <TopArtistCard artist={artist} key={artist.id} />
                  ))}
               </div>
            </div>
         )}
         <div>
            <h2 className="my-8 text-2xl font-medium">New Releases</h2>
            <div>
               <AlbumCarousel albums={albums.albums.items} />
            </div>
         </div>
         <div>
            <h2 className="my-8 text-2xl font-medium">
               Popular Bengali Artists
            </h2>
            <div>
               <ArtistCarousel artists={bangla.artists} />
            </div>
         </div>
         <div>
            <h2 className="my-8 text-2xl font-medium">
               Popular Indian Artists
            </h2>
            <div>
               <ArtistCarousel artists={hindi.artists} />
            </div>
         </div>
         <div>
            <h2 className="my-8 text-2xl font-medium">
               Popular Amerian Artists
            </h2>
            <div>
               <ArtistCarousel artists={english.artists} />
            </div>
         </div>
      </div>
   )
}
