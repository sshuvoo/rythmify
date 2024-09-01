import { Avatar, Card, Group, Text } from '@mantine/core'
import classes from './../artist/top-artist-card.module.css'
import { PlayAnimationButton } from './play-animation-button'

export function TopTrackCard({
   track,
   playlist,
}: {
   track: any
   playlist: string[]
}) {
   return (
      <Card withBorder radius="md" p={0} className={classes.card}>
         <Group className="group" wrap="nowrap" gap={0}>
            <Avatar
               className="!hidden xl:!inline-block"
               src={track?.album?.images?.at(-1)?.url}
               radius={0}
               size={64}
            />
            <div
               className={`${classes.body} flex w-full items-center justify-between`}
            >
               <Text lineClamp={1} px={10} className={classes.title}>
                  {track.name}
               </Text>
               <PlayAnimationButton playlist={playlist} track_id={track.id} />
            </div>
         </Group>
      </Card>
   )
}
