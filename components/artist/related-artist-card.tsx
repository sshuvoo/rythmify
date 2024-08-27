import { printFollowers } from '@/utils/printFollowers'
import { Avatar, Group, Paper, Text } from '@mantine/core'
import Link from 'next/link'

export function RelatedArtistCard({ artist }: { artist: any }) {
   return (
      <Link href={`/artists/${artist.id}`}>
         <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
            <Avatar
               src={artist?.images[0]?.url}
               size={120}
               radius={120}
               mx="auto"
            />
            <Text lineClamp={1} ta="center" fz="lg" fw={500} mt="md">
               {artist.name}
            </Text>
            <Text ta="center" c="dimmed" fz="sm" lineClamp={1}>
               {artist.genres.join(' . ') || 'Singer'}
            </Text>
            <Group mt="md" justify="center" gap={30}>
               <div className='flex items-center gap-2'>
                  <Text ta="center" fz="lg" fw={500}>
                     {printFollowers(artist?.followers?.total)}
                  </Text>
                  <Text ta="center" fz="sm" c="dimmed" lh={1}>
                     Followers
                  </Text>
               </div>
            </Group>
         </Paper>
      </Link>
   )
}
