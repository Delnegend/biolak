import { cn } from '@/utilities/ui'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { ArrowRight } from 'lucide-react'
import { Phudu } from 'next/font/google'

export const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		defaultVariants: {
			size: 'default',
			variant: 'default',
		},
		variants: {
			size: {
				clear: '',
				default: 'h-10 px-4 py-2',
				icon: 'h-10 w-10',
				lg: 'h-[5.25rem] rounded-[10px] px-8 text-[28px]',
				sm: 'h-9 rounded px-3',
			},
			variant: {
				default: 'bg-black text-primary-foreground hover:bg-primary/90',
				destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				ghost: 'hover:bg-card hover:text-accent-foreground',
				link: 'text-primary items-start justify-start underline-offset-4 hover:underline',
				outline:
					'border text-[#E7B27E] border-[#E7B27E] bg-background hover:border-black hover:text-black',
				secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
			},
		},
	},
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
	hideArrow?: boolean
}

const phudu = Phudu({ subsets: ['vietnamese'], weight: '600' })

export function Button({
	asChild = false,
	className,
	size,
	variant,
	hideArrow = false,
	...props
}: React.ComponentPropsWithRef<'button'> & ButtonProps): React.JSX.Element {
	const Comp = asChild ? Slot : 'button'
	if (asChild) {
		return <Comp className={cn(buttonVariants({ size, variant }), className)} {...props} />
	}

	const { children, ...rest } = props

	return (
		<button
			className={cn(
				buttonVariants({ className, size, variant }),
				'justify-between font-semibold',
				phudu.className,
			)}
			{...rest}
		>
			{children}
			{!hideArrow && <ArrowRight />}
		</button>
	)
}
