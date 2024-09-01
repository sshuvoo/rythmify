'use client'

import { updatePlaylist } from '@/actions/update-playlist'
import {
   Box,
   Button,
   Group,
   LoadingOverlay,
   NativeSelect,
   Paper,
   Stack,
   TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconX } from '@tabler/icons-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export function EditPlaylistModal({
   info,
   onClose,
}: {
   info: any
   onClose: () => void
}) {
   const [visible, toggle] = useState(false)

   const form = useForm({
      initialValues: info,
      validate: {
         name: (val) => (val?.length <= 0 ? 'Name is required' : null),
      },
   })

   const handleSubmit = async () => {
      toggle((pre) => !pre)
      try {
         await updatePlaylist(form.values, info.id)
         toast.success(`Playlist successfully updated`)
         onClose()
      } catch (error) {
         toast.error('Failled to update playlist')
      } finally {
         toggle((pre) => !pre)
      }
   }

   return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40">
         <Box
            className="w-full max-w-lg rounded-md bg-white p-4 shadow"
            pos="relative"
         >
            <LoadingOverlay
               visible={visible}
               zIndex={1000}
               overlayProps={{ radius: 'sm', blur: 2 }}
            />
            <div>
               <div className="flex justify-end">
                  <button onClick={onClose}>
                     <IconX />
                  </button>
               </div>
               <Paper radius="md">
                  <form onSubmit={form.onSubmit(handleSubmit)}>
                     <Stack>
                        <TextInput
                           defaultValue={info?.name}
                           label="Playlist Name"
                           placeholder="My daily dose"
                           value={form.values.name}
                           onChange={(event) =>
                              form.setFieldValue(
                                 'name',
                                 event.currentTarget.value
                              )
                           }
                           error={form.errors.name}
                           radius="md"
                        />
                        <TextInput
                           defaultValue={info?.description}
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
                           defaultValue={info?.public}
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
                           Edit Playlist
                        </Button>
                     </Group>
                  </form>
               </Paper>
            </div>
         </Box>
      </div>
   )
}
