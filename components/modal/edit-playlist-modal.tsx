'use client'

import { updatePlaylist } from '@/actions/update-playlist'
import { useModal } from '@/hooks/use-modal'
import {
   Button,
   Group,
   Modal,
   NativeSelect,
   Paper,
   Stack,
   TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import toast from 'react-hot-toast'

export function EditPlaylistModal() {
   const {
      edit: { editModalopened, editModalClose, playlistInfo },
   } = useModal()

   const form = useForm({
      initialValues: playlistInfo,
      validate: {
         name: (val) => (val?.length <= 0 ? 'Name is required' : null),
      },
   })

   const handleSubmit = async () => {
      try {
         await updatePlaylist(form.values, playlistInfo.id)
         toast.success(`Playlist successfully updated`)
         editModalClose()
      } catch (error) {
         toast.error('Failled to update playlist')
      }
   }

   return (
      <Modal
         zIndex={2000}
         opened={editModalopened}
         onClose={editModalClose}
         title="Edit Playlist"
         centered
      >
         <Paper radius="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
               <Stack>
                  <TextInput
                     defaultValue={playlistInfo?.name}
                     label="Playlist Name"
                     placeholder="My daily dose"
                     value={form.values.name}
                     onChange={(event) =>
                        form.setFieldValue('name', event.currentTarget.value)
                     }
                     radius="md"
                  />
                  <TextInput
                     defaultValue={playlistInfo?.description}
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
                     defaultValue={playlistInfo?.public}
                     value={form.values.public}
                     onChange={(event) =>
                        form.setFieldValue('public', event.currentTarget.value)
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
      </Modal>
   )
}
