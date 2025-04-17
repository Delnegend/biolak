'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import type { Header } from '@/payload-types'

import Image from 'next/image'
import biolakIcon from '../../../public/biolak-logo.svg'
import { NavItemsLeft } from './NavItemsLeft.client'
import { NavItemsRight } from './NavItemsRight.client'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const pathname = usePathname()

  return (
    <header className="relative z-20 bg-[#FFF9ED] w-full h-20 flex items-center px-10">
      <div className="grid grid-cols-[1fr_auto_1fr] w-full">
        <NavItemsLeft data={data} />
        <Link href="/">
          <Image priority src={biolakIcon} alt="BioLAK Logo" />
        </Link>
        <NavItemsRight data={data} />
      </div>
    </header>
  )
}
