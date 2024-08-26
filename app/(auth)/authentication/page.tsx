import { signIn } from '@/auth'
import { Button, Divider, Group, Paper, PaperProps, Text } from '@mantine/core'
import { IconBrandSpotifyFilled } from '@tabler/icons-react'
import AuthForm from './auth-form'

export default function Login(props: PaperProps) {
   return (
      <div className="min-h-screen flex justify-center items-center">
         <Paper radius="md" p="xl" withBorder {...props}>
            <Text size="lg" fw={500}>
               Welcome to Rythmify
            </Text>
            <Text size="xs" fw={500}>
               We are sorry! But only spotify login available.
            </Text>
            <Group grow mb="md" mt="md">
               <form
                  action={async () => {
                     'use server'
                     await signIn('spotify', { redirectTo: '/' })
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
