import { getArtists } from '@/actions/get-artists'
import { getPopularArtists } from '@/actions/get-popular-artists'
import { ArtistCard } from '@/components/artist/artist-card'
import { Text } from '@mantine/core'

export default async function Home() {
   const bangla = await getPopularArtists('bangla2024')
   const hindi = await getPopularArtists('hindi2024')

   return (
      <div className="overflow-y-auto max-h-[calc(100vh-32px)]">
         <div className="px-4">
            <Text className="line-clamp-1" ta="left" fz="h2" fw={500} mt="md">
               Bangla
            </Text>
            <div className="grid xl:grid-cols-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
               {bangla?.artists?.items?.length > 0 &&
                  bangla.artists.items.map((artist: any) => (
                     <ArtistCard
                        key={artist.id}
                        name={artist.name}
                        image={artist.images[0]?.url || ''}
                        genres={artist.genres.join(' . ')}
                        artist_id={artist.id}
                     />
                  ))}
            </div>
         </div>
         <div className="px-4">
            <Text className="line-clamp-1" ta="left" fz="h2" fw={500} mt="md">
               Indian
            </Text>
            <div className="grid xl:grid-cols-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
               {hindi?.artists?.items?.length > 0 &&
                  hindi.artists.items.map((artist: any) => (
                     <ArtistCard
                        key={artist.id}
                        name={artist.name}
                        image={artist.images[0]?.url || ''}
                        genres={artist.genres.join(' . ')}
                        artist_id={artist.id}
                     />
                  ))}
            </div>
         </div>
      </div>
   )
}
