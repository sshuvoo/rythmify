import { signIn } from '@/auth'
import { Button, Divider, Group, Paper, Text } from '@mantine/core'
import { IconBrandSpotifyFilled } from '@tabler/icons-react'
import AuthForm from './auth-form'

interface Props {
   searchParams: { redirect_to: string }
}

export default function Login({ searchParams: { redirect_to } }: Props) {
   return (
      <div className="flex min-h-screen items-center justify-center">
         <Paper radius="md" p="xl" withBorder>
            <Text size="lg" fw={500}>
               Welcome to Rythmify
            </Text>
            <Text size="xs" fw={500}>
               We appologise! Only Spotify login available.
            </Text>
            <Group grow mb="md" mt="md">
               <form
                  action={async () => {
                     'use server'
                     await signIn('spotify', {
                        redirectTo: redirect_to ? redirect_to : '/',
                     })
                  }}
               >
                  <Button
                     leftSection={
                        <IconBrandSpotifyFilled className="text-green-500" />
                     }
                     variant="default"
                     radius="xl"
                     type="submit"
                     fullWidth
                  >
                     Signin with Spotify
                  </Button>
               </form>
            </Group>

            <Divider
               label="Or continue with email"
               labelPosition="center"
               my="lg"
            />

            <AuthForm />
         </Paper>
      </div>
   )
}
