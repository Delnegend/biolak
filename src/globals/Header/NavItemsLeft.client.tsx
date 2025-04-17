'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'

export const NavItemsLeft: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItemsLeft || []

  return (
    <nav className="flex gap-9 items-center">
      <Link href="/search">
        <span className="sr-only">Tìm kiếm</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>

      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
    </nav>
  )
}
