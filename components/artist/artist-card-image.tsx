"use client";

import { Avatar, Button, Card, Text } from "@mantine/core";
import classes from "./UserCardImage.module.css";

export function ArtistCardImage({ artist }: { artist: any }) {
   return (
      <Card withBorder padding="xl" radius="md" className={classes.card}>
         <Card.Section
            h={140}
            style={{
               backgroundImage:
                  "url(https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
               backgroundPosition: "center",
               backgroundSize: "cover",
            }}
         />
         <Avatar
            src={artist?.images[0]?.url}
            size={150}
            radius={100}
            mx="auto"
            mt={-30}
            className={classes.avatar}
         />
         <Text ta="center" fz="lg" fw={500} mt="sm">
            {artist.name}
         </Text>
         <Text ta="center" fz="sm" c="dimmed">
            {artist.genres.join(" . ")}
         </Text>
         <Button fullWidth radius="md" mt="xl" size="md" variant="default">
            Follow
         </Button>
      </Card>
   );
}
