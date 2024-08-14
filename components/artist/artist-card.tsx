import { Avatar, Paper, Text } from "@mantine/core";
import Link from "next/link";

export const ArtistCard = ({
   name,
   image,
   genres,
   artist_id,
}: {
   name: string;
   image: string;
   genres: string;
   artist_id: string;
}) => {
   return (
      <Link href={`/artists/${artist_id}`} className="max-w-96 w-full">
         <Paper radius="md" withBorder p="lg" bg="var(--mantine-color-body)">
            <Avatar src={image} size={150} radius={120} mx="auto" />
            <Text className="line-clamp-1" ta="center" fz="lg" fw={500} mt="md">
               {name}
            </Text>
            <Text className="line-clamp-1" ta="center" c="dimmed" fz="sm">
               {genres ? genres : "Artist"}
            </Text>
         </Paper>
      </Link>
   );
};
