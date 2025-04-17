'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'

export const NavItemsRight: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItemsRight || []

  return (
    <nav className="flex gap-9 items-center w-full justify-end">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" className="text-black" />
      })}
      <Button variant="default" className="h-14 rounded-full px-6">
        Giỏ hàng
      </Button>
    </nav>
  )
}
