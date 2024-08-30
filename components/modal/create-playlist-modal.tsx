'use client'

import { createNewPlaylist } from '@/actions/create-playlist'
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
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export function CreatePlaylistModal() {
   const router = useRouter()
   const {
      add: { addModalOpened, addModalClose },
   } = useModal()

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
         router.push(`/playlists/${newPlaylist.id}`)
      } catch (error) {
         toast.error('Failled to create playlist')
      } finally {
         addModalClose()
      }
   }

   return (
      <Modal
         zIndex={2000}
         opened={addModalOpened}
         onClose={addModalClose}
         title={'Create Playlist'}
         centered
      >
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
                        form.setFieldValue('public', event.currentTarget.value)
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
      </Modal>
   )
}
