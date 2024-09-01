'use client'

import { createNewPlaylist } from '@/actions/create-playlist'
import {
   Button,
   Group,
   NativeSelect,
   Paper,
   Stack,
   TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function CreatePlaylistModal({ onClose }: { onClose: () => void }) {
   const router = useRouter()

   const form = useForm({
      initialValues: {
         name: '',
         description: '',
         public: 'public',
      },
      validate: {
         name: (val) =>
            val.length <= 0
               ? 'Name is required'
               : val.length >= 3
                 ? null
                 : 'Name should include at least 3 characters',
      },
   })

   const handleSubmit = async () => {
      try {
         const newPlaylist = await createNewPlaylist(form.values)
         toast.success(`Successfully created ${newPlaylist.name}`)
         onClose()
         router.push(`/playlists/${newPlaylist.id}`)
      } catch (error) {
         toast.error('Failled to create playlist')
      }
   }

   return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40">
         <div className="w-full max-w-lg rounded-md bg-white p-4 shadow">
            <div className="flex justify-end">
               <button onClick={onClose}>
                  <IconX />
               </button>
            </div>
            <Paper radius="md">
               <form onSubmit={form.onSubmit(handleSubmit)}>
                  <Stack>
                     <TextInput
                        label="Playlist Name"
                        placeholder="My daily dose"
                        value={form.values.name}
                        onChange={(event) =>
                           form.setFieldValue('name', event.currentTarget.value)
                        }
                        error={form.errors.name}
                        radius="md"
                     />
                     <TextInput
                        label="Description (optional)"
                        placeholder="Enter a short description"
                        value={form.values.description}
                        onChange={(event) =>
                           form.setFieldValue(
                              'description',
                              event.currentTarget.value
                           )
                        }
                        radius="md"
                     />
                     <NativeSelect
                        value={form.values.public}
                        onChange={(event) =>
                           form.setFieldValue(
                              'public',
                              event.currentTarget.value
                           )
                        }
                        label="Privacy"
                        data={['Public', 'Private']}
                     />
                  </Stack>

                  <Group justify="flex-end" mt="xl">
                     <Button color="#000000" type="submit" radius="xl">
                        Create Playlist
                     </Button>
                  </Group>
               </form>
            </Paper>
         </div>
      </div>
   )
}
