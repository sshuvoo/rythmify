import { Paper, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

export function PlaylistCard({ playlist }: { playlist: any }) {
   return (
      <Link href={`/playlists/${playlist.id}`}>
         <Paper p={10} radius="md" bg="var(--mantine-color-body)">
            <div className="relative size-36 xl:size-[200px]">
               <Image
                  fill
                  className="rounded-md object-cover"
                  src={playlist?.images[0]?.url}
                  alt=""
               />
            </div>
            <Text mt={5} lineClamp={1} fw={500}>
               {playlist.name}
            </Text>
         </Paper>
      </Link>
   )
}
