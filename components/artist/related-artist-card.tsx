import { Avatar, Group, Paper, Text } from "@mantine/core";

export function RelatedArtistCard({ artist }: { artist: any }) {
   return (
      <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
         <Avatar src={artist.images[0].url} size={120} radius={120} mx="auto" />
         <Text ta="center" fz="lg" fw={500} mt="md">
            {artist.name}
         </Text>
         <Text ta="center" c="dimmed" fz="sm" lineClamp={1}>
            {artist.genres.join(" . ")}
         </Text>
         <Group mt="md" justify="center" gap={30}>
            <div>
               <Text ta="center" fz="lg" fw={500}>
                  {Math.round(artist?.followers?.total / 1000)}k
               </Text>
               <Text ta="center" fz="sm" c="dimmed" lh={1}>
                  Followers
               </Text>
            </div>
         </Group>
      </Paper>
   );
}
