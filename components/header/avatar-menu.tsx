'use client'

import { logout } from '@/actions/logout'
import { Avatar, Group, Menu, rem, UnstyledButton } from '@mantine/core'
import { IconLogout, IconMail, IconUserCircle } from '@tabler/icons-react'
import cx from 'clsx'
import { useState } from 'react'
import classes from './avatar-menu.module.css'
import Link from 'next/link'

type User = {
   name: string
   email: string
   image?: string | null
}

export function AvatarMenu({ email, image, name }: User) {
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
                  <h2 className="mr-3 hidden text-sm font-medium md:block">
                     {name}
                  </h2>
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
            <Menu.Label>Settings</Menu.Label>
            <Link className="h-full w-full" href="/profile">
               <Menu.Item
                  leftSection={
                     <IconUserCircle
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1}
                     />
                  }
               >
                  Profile
               </Menu.Item>
            </Link>
            <form action={logout}>
               <Menu.Item
                  type="submit"
                  leftSection={
                     <IconLogout
                        style={{ width: rem(16), height: rem(16) }}
                        stroke={1.5}
                     />
                  }
               >
                  Logout
               </Menu.Item>
            </form>
         </Menu.Dropdown>
      </Menu>
   )
}
