import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/utilities/ui'

export function INTERNAL_Checkbox({
	classNames,
	label,
	id,
	checked,
	onCheckedChange,
}: {
	classNames?: {
		container?: string
		checkbox?: string
		label?: string
	}
	label: string
	id: string
	checked: boolean
	onCheckedChange?: (value: boolean) => void
}): React.JSX.Element {
	return (
		<div className={cn('mt-4 flex items-center gap-x-3', classNames?.container)}>
			<Checkbox
				id={id}
				className={classNames?.checkbox}
				checked={checked}
				onCheckedChange={onCheckedChange}
			/>
			<label htmlFor={id} className={cn('text-xl text-muted-foreground', classNames?.label)}>
				{label}
			</label>
		</div>
	)
}
