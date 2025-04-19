import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import type { Header } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'
import Image from 'next/image'
import biolakIcon from '../../../public/biolak-logo.svg'
import { ContactForm } from '../ContactForm/Component'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return (
    <header className="relative z-20 bg-[#FFF9ED] w-full h-20 flex items-center px-10">
      <div className="grid grid-cols-[1fr_auto_1fr] w-full">
        <nav className="flex gap-9 items-center">
          <Link href="/search" className="flex justify-center items-center size-7">
            <span className="sr-only">Tìm kiếm</span>
            <SearchIcon className="w-5 text-primary scale-110" size={30} />
          </Link>
          <Link href="/products" className="text-xl">
            Sản phẩm
          </Link>
          <Link href="/about" className="text-xl">
            BioLAK
          </Link>
          <Link href="/events" className="text-xl">
            Sự kiện
          </Link>
        </nav>

        <Link href="/home">
          <Image priority src={biolakIcon} alt="BioLAK Logo" className="h-12" />
        </Link>

        <nav className="flex gap-9 items-center justify-end">
          <Link href="/login" className="text-xl">
            Đăng ký
          </Link>
          <Dialog>
            <DialogTrigger>
              <div className="text-xl">Liên hệ</div>
            </DialogTrigger>
            <DialogContent className="min-w-[932px] bg-[#fff9ed] p-12 !rounded-2xl overflow-hidden">
              <ContactForm inDialog={true} />
            </DialogContent>
          </Dialog>
          <Link href="/events" className="text-xl">
            VIE/EN
          </Link>
          <Button variant="default" className="h-14 rounded-full px-6 text-xl">
            Giỏ hàng
          </Button>
        </nav>
      </div>
    </header>
  )
}
