'use client'

import { Button } from '@/components/ui/button'

export function AllPostsButton({ buttonLabel }: { buttonLabel: string }): React.JSX.Element {
	return (
		<Button size="lg" variant="outline" onClick={(e) => e.preventDefault()}>
			{buttonLabel}
		</Button>
	)
}
