import { ModalProvider } from '@/provider/modal-provider'
import { PlayerProvider } from '@/provider/player-provider'
import '@mantine/carousel/styles.css'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { CreatePlaylistModal } from '@/components/modal/create-playlist-modal'
import { EditPlaylistModal } from '@/components/modal/edit-playlist-modal'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
   title: 'Create Next App',
   description: 'Generated by create next app',
}

interface Children {
   children: React.ReactNode
}

export default async function RootLayout({ children }: Readonly<Children>) {
   const session = await auth()
   return (
      <html lang="en">
         <head>
            <ColorSchemeScript />
         </head>
         <body className={inter.className}>
            <MantineProvider>
               <SessionProvider session={session}>
                  <ModalProvider>
                     <PlayerProvider>{children}</PlayerProvider>
                     <CreatePlaylistModal />
                     <EditPlaylistModal />
                  </ModalProvider>
               </SessionProvider>
            </MantineProvider>
            <Toaster />
            <div id="modal-root" />
         </body>
      </html>
   )
}
