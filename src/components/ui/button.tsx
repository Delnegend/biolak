import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { ArrowRight } from 'lucide-react'
import { Phudu } from 'next/font/google'

import { cn } from '@/utilities/ui'

export const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
		variants: {
			size: {
				clear: '',
				default: 'h-16 rounded-[0.6rem] px-6 py-4 text-[1.75rem]',
				icon: 'h-10 w-10',
				lg: 'h-[5.25rem] rounded-[10px] px-8 text-[28px] max-md:h-[3.75rem] max-md:p-4 max-md:text-xl',
				sm: 'h-9 rounded px-3',
				md: 'h-[4.375rem] rounded-[0.5rem] px-6 text-xl',
			},
			variant: {
				default: 'bg-black text-primary-foreground hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				ghost: 'hover:bg-card hover:text-accent-foreground',
				link: 'items-start justify-start text-primary underline-offset-4 hover:underline',
				outline:
					'border border-[#E7B27E] bg-background text-[#E7B27E] hover:border-black hover:text-black',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
			},
		},
	},
)

type BaseButtonProps = VariantProps<typeof buttonVariants> &
	React.ComponentPropsWithRef<'button'> & {
		asChild?: boolean
	}

export type ButtonProps =
	| (BaseButtonProps & {
			asChild: true
	  })
	| (BaseButtonProps & {
			asChild?: false
			hideArrow?: boolean
	  })

const phudu = Phudu({ subsets: ['vietnamese'], weight: '600' })

export function Button({
	asChild = false,
	className,
	size,
	variant,
	...props
}: ButtonProps): React.JSX.Element {
	const Comp = asChild ? Slot : 'button'

	if (asChild) {
		return (
			<Comp
				className={cn(buttonVariants({ size, variant }), phudu.className, className)}
				{...props}
			/>
		)
	}

	const { children, hideArrow, ...rest } = props as ButtonProps & {
		hideArrow?: boolean
	}

	return (
		<button
			className={cn(
				buttonVariants({ className, size, variant }),
				'font-semibold',
				!(className?.includes('font-sans') || className?.includes('font-serif')) &&
					phudu.className,
				hideArrow ? 'justify-center' : 'justify-between',
				className,
			)}
			{...rest}
		>
			{children}
			{!hideArrow && <ArrowRight />}
		</button>
	)
}
