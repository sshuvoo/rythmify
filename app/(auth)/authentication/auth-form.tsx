'use client'

import {
   Anchor,
   Button,
   Checkbox,
   Group,
   PasswordInput,
   Stack,
   TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { upperFirst, useToggle } from '@mantine/hooks'

export default function AuthForm() {
   const [type, toggle] = useToggle(['login', 'register'])
   const form = useForm({
      initialValues: {
         email: '',
         name: '',
         password: '',
         terms: true,
      },

      validate: {
         email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
         password: (val) =>
            val.length <= 6
               ? 'Password should include at least 6 characters'
               : null,
      },
   })

   return (
      <form onSubmit={form.onSubmit(() => {})}>
         <Stack>
            {type === 'register' && (
               <TextInput
                  label="Name"
                  disabled={true}
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) =>
                     form.setFieldValue('name', event.currentTarget.value)
                  }
                  radius="md"
               />
            )}

            <TextInput
               disabled={true}
               required
               label="Email"
               placeholder="hello@mantine.dev"
               value={form.values.email}
               onChange={(event) =>
                  form.setFieldValue('email', event.currentTarget.value)
               }
               error={form.errors.email && 'Invalid email'}
               radius="md"
            />

            <PasswordInput
               disabled={true}
               required
               label="Password"
               placeholder="Your password"
               value={form.values.password}
               onChange={(event) =>
                  form.setFieldValue('password', event.currentTarget.value)
               }
               error={
                  form.errors.password &&
                  'Password should include at least 6 characters'
               }
               radius="md"
            />

            {type === 'register' && (
               <Checkbox
                  disabled={true}
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) =>
                     form.setFieldValue('terms', event.currentTarget.checked)
                  }
               />
            )}
         </Stack>

         <Group justify="space-between" mt="xl">
            <Anchor
               component="button"
               type="button"
               c="dimmed"
               onClick={() => toggle()}
               size="xs"
            >
               {type === 'register'
                  ? 'Already have an account? Login'
                  : "Don't have an account? Register"}
            </Anchor>
            <Button disabled={true} type="submit" radius="xl">
               {upperFirst(type)}
            </Button>
         </Group>
      </form>
   )
}
