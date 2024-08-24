'use client'

import { Avatar, Tooltip } from '@mantine/core'

export default function AvatarGroup({ artists }: { artists: any }) {
   return (
      <Tooltip.Group openDelay={300} closeDelay={100}>
         <Avatar.Group spacing="sm">
            {artists.map((artist: any) => (
               <Tooltip key={artist.id} label={artist.name} withArrow>
                  <Avatar src={artist?.images[0]?.url} radius="xl" />
               </Tooltip>
            ))}
         </Avatar.Group>
      </Tooltip.Group>
   )
}
