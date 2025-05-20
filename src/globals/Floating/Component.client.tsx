'use client'

import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { FloatingGlobal } from '@/payload-types'
import { cn } from '@/utilities/ui'

const inter = Inter({ subsets: ['vietnamese'], weight: ['400'] })

export function INTERNAL_FloatingClient({ global }: { global: FloatingGlobal }): React.JSX.Element {
	const [open, setOpen] = useState(false)

	return (
		<div className={cn('fixed bottom-4 right-10 z-10 flex h-24 flex-row items-center gap-x-6')}>
			<AnimatePresence mode="wait" initial={false}>
				{open &&
					global.links?.map((l) => {
						const icon = l.icon && typeof l.icon === 'object' ? l.icon : null

						return (
							<motion.div
								key={l.link}
								initial={{ opacity: 0, x: -30 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -30 }}
								transition={{ duration: 0.2 }}
							>
								<Link href={l.link} target="_blank">
									<Image
										src={icon?.url ?? 'https://placehold.co/200x200'}
										alt={icon?.alt ?? 'Floating Icon'}
										width={icon?.width ?? 200}
										height={icon?.height ?? 200}
										unoptimized={!icon}
										className="aspect-square size-24 overflow-hidden rounded-full bg-white/80 object-contain p-4 shadow-md transition-all hover:bg-white hover:shadow-lg"
									/>
								</Link>
							</motion.div>
						)
					})}
			</AnimatePresence>

			<Button
				className={cn(
					'overflow-hidden rounded-full bg-white/80 text-xl font-normal text-[#6b5a4a] shadow-md transition-all hover:bg-white hover:shadow-lg',
					open ? 'size-16' : 'h-16 w-28',
					inter.className,
				)}
				hideArrow={true}
				onClick={() => setOpen(!open)}
			>
				<AnimatePresence mode="wait" initial={false}>
					{open ? (
						<motion.div
							key="close"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							<X />
						</motion.div>
					) : (
						<motion.div
							key="label"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							{global.label}
						</motion.div>
					)}
				</AnimatePresence>
			</Button>
		</div>
	)
}
