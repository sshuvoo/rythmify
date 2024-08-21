import { Card, Image, Text, Badge, Button, Group, Avatar } from '@mantine/core'

export function AudiobookCard({ audiobook }: { audiobook: any }) {
   return (
      <Card shadow="sm" padding="sm" radius="md" withBorder>
         <Card.Section>
            <Avatar src={audiobook?.images[0]?.url} h={160} w={160} radius={0} alt="Norway" />
         </Card.Section>
         <Text ta="center" mt={10} lineClamp={1} fw={500}>{audiobook.name}</Text>
      </Card>
   )
}
