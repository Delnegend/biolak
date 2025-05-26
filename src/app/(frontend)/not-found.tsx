import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { getClientLang } from '@/utilities/getClientLang'
import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export default async function NotFound(): Promise<React.JSX.Element> {
	const locale = await getClientLang()

	return (
		<div className="container py-28">
			<div className="prose max-w-none">
				<h1 style={{ marginBottom: 0 }}>404</h1>
				<p className="mb-4">
					{matchLang({
						[Lang.English]: 'This page does not exist.',
						[Lang.Vietnamese]: 'Trang này không tồn tại.',
					})({ locale })}
				</p>
			</div>
			<Button asChild variant="default">
				{/* <Link href="/">Quay về trang chủ</Link> */}
				<Link href="/">
					{matchLang({
						[Lang.English]: 'Back to Homepage',
						[Lang.Vietnamese]: 'Quay về trang chủ',
					})({ locale })}
				</Link>
			</Button>
		</div>
	)
}
