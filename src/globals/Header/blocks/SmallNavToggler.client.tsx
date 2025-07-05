'use client'

import { Slot } from '@radix-ui/react-slot'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/utilities/ui'

import { useHeaderContext } from '../hooks/useHeaderContext'

export function INTERNAL_SmallNavToggler({
	toggler,
	children,
	className,
}: {
	toggler: React.JSX.Element
	children: React.ReactNode
	className?: string
}): React.JSX.Element {
	const { allTopBarsHeight, smallNavOpen, setSmallNavOpen } = useHeaderContext()

	return (
		<div>
			<Slot onClick={() => setSmallNavOpen(!smallNavOpen)}>{toggler}</Slot>
			<AnimatePresence initial={false}>
				{smallNavOpen && (
					<motion.div
						key="small-nav"
						initial={{ x: '-100%', opacity: 0 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: '-100%', opacity: 0 }}
						transition={{ type: 'tween', duration: 0.3 }}
						style={{
							position: 'fixed',
							top: allTopBarsHeight,
							left: 0,
							height: `calc(100vh - ${allTopBarsHeight}px)`,
						}}
						className={cn('w-full bg-primary-foreground', className)}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
