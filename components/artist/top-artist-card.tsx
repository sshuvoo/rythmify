import { Avatar, Card, Group, Text } from '@mantine/core'
import Link from 'next/link'
import classes from './top-artist-card.module.css'

export function TopArtistCard({ artist }: { artist: any }) {
   return (
      <Link href={`/artists/${artist.id}`}>
         <Card withBorder radius="md" p={0} className={classes.card}>
            <Group wrap="nowrap" gap={0}>
               <Avatar src={artist.images[0].url} radius={0} size={64} />
               <div className={classes.body}>
                  <Text px={10} className={classes.title}>
                     {artist.name}
                  </Text>
               </div>
            </Group>
         </Card>
      </Link>
   )
}
