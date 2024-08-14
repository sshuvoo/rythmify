"use client";

import {
   ActionIcon,
   Card,
   Center,
   Group,
   Image,
   rem,
   Text,
   useMantineTheme,
} from "@mantine/core";
import { IconBookmark, IconHeart, IconShare } from "@tabler/icons-react";
import classes from "./album-card.module.css";

export function AlbumCard({ album }: { album: any }) {
   const linkProps = {
      href: "https://mantine.dev",
      target: "_blank",
      rel: "noopener noreferrer",
   };
   const theme = useMantineTheme();

   return (
      <Card withBorder radius="md" className={classes.card}>
         <Card.Section>
            <a {...linkProps}>
               <Image src={album.images[0].url} alt="" h={140} />
            </a>
         </Card.Section>

         <h2 className={`line-clamp-1 mt-3`}>{album.name}</h2>

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
                  <IconBookmark
                     style={{ width: rem(16), height: rem(16) }}
                     color={theme.colors.yellow[7]}
                  />
               </ActionIcon>
               <ActionIcon className={classes.action}>
                  <IconShare
                     style={{ width: rem(16), height: rem(16) }}
                     color={theme.colors.blue[6]}
                  />
               </ActionIcon>
            </Group>
         </Group>
      </Card>
   );
}
