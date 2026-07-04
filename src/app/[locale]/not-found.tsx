import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/ui/button'

export default async function NotFound(): Promise<React.JSX.Element> {
	const t = await getTranslations('app.notFound')

	return (
		<div className="container py-28">
			<div className="prose max-w-none">
				<h1 style={{ marginBottom: 0 }}>404</h1>
				<p className="mb-4">{t('message')}</p>
			</div>
			<Button asChild className="justify-between">
				<Link href="/">
					{t('backToHome')}
					<ArrowRight />
				</Link>
			</Button>
		</div>
	)
}
