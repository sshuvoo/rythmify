'use client'

import {
   Avatar,
   Group,
   Menu,
   rem,
   Text,
   UnstyledButton,
   useMantineTheme,
} from '@mantine/core'
import {
   IconChevronDown,
   IconHeart,
   IconLogout,
   IconMail,
   IconSettings,
   IconStar,
} from '@tabler/icons-react'
import cx from 'clsx'
import { useState } from 'react'

import { logout } from '@/actions/logout'
import classes from './avatar-menu.module.css'

type User = {
   name: string
   email: string
   image?: string | null
}

export function AvatarMenu({ email, image, name }: User) {
   const theme = useMantineTheme()
   const [userMenuOpened, setUserMenuOpened] = useState(false)

   return (
      <Menu
         width={260}
         position="bottom-end"
         transitionProps={{ transition: 'pop-top-right' }}
         onClose={() => setUserMenuOpened(false)}
         onOpen={() => setUserMenuOpened(true)}
         withinPortal
      >
         <Menu.Target>
            <UnstyledButton
               className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
               })}
            >
               <Group gap={7}>
                  <Avatar src={image} alt={name} radius="xl" size={40} />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                     {name}
                  </Text>
                  <IconChevronDown
                     style={{ width: rem(12), height: rem(12) }}
                     stroke={1.5}
                  />
               </Group>
            </UnstyledButton>
         </Menu.Target>
         <Menu.Dropdown className="!z-[2000]">
            <Menu.Label>Signned in as</Menu.Label>
            <Menu.Item
               leftSection={
                  <IconMail
                     style={{ width: rem(16), height: rem(16) }}
                     stroke={1.5}
                  />
               }
            >
               {email}
            </Menu.Item>
            <Menu.Label>Activity</Menu.Label>
            <Menu.Item
               leftSection={
                  <IconHeart
                     style={{ width: rem(16), height: rem(16) }}
                     color={theme.colors.red[6]}
                     stroke={1.5}
                  />
               }
            >
               Liked posts
            </Menu.Item>
            <Menu.Item
               leftSection={
                  <IconStar
                     style={{ width: rem(16), height: rem(16) }}
                     color={theme.colors.yellow[6]}
                     stroke={1.5}
                  />
               }
            >
               Saved posts
            </Menu.Item>

            <Menu.Label>Settings</Menu.Label>
            <Menu.Item
               leftSection={
                  <IconSettings
                     style={{ width: rem(16), height: rem(16) }}
                     stroke={1.5}
                  />
               }
            >
               Account settings
            </Menu.Item>
            <Menu.Item
               leftSection={
                  <IconLogout
                     style={{ width: rem(16), height: rem(16) }}
                     stroke={1.5}
                  />
               }
            >
               <form action={logout}>
                  <button type="submit">Logout</button>
               </form>
            </Menu.Item>
         </Menu.Dropdown>
      </Menu>
   )
}
