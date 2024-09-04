'use client'

import {
   ActionIcon,
   Card,
   Center,
   Group,
   Image,
   rem,
   Text,
   useMantineTheme,
} from '@mantine/core'
import {
   IconHeart,
   IconHeartFilled
} from '@tabler/icons-react'
import Link from 'next/link'
import classes from './album-card.module.css'

export function AlbumCard({ album }: { album: any }) {
   const theme = useMantineTheme()

   return (
      <Card withBorder radius="md" className={classes.card}>
         <Card.Section>
            <Link href={`/albums/${album.id}`}>
               <Image src={album.images[0].url} alt="" h={140} />
            </Link>
         </Card.Section>

         <h2 className={`mt-3 line-clamp-1`}>{album.name}</h2>

         <Text fz="sm" c="dimmed" lineClamp={4}>
            Release Date: {album.release_date}
         </Text>

         <Group justify="space-between" className={classes.footer}>
            <Center>
               <Text fz="sm" inline>
                  Tracks: {album.total_tracks}
               </Text>
            </Center>

            <Group gap={8} mr={0}>
               <ActionIcon className={classes.action}>
                  <IconHeart
                     style={{ width: rem(16), height: rem(16) }}
                     color={theme.colors.red[6]}
                  />
               </ActionIcon>
               <ActionIcon className={classes.action}>
                  <IconHeartFilled
                     style={{ width: rem(16), height: rem(16) }}
                     color={theme.colors.red[6]}
                  />
               </ActionIcon>
            </Group>
         </Group>
      </Card>
   )
}
