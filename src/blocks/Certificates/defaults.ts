import { Lang } from '@/utilities/lang'
import { matchLang } from '@/utilities/matchLang'

export const CertificatesBlockDefaults = {
	/** `Chứng nhận bởi các tổ chức quốc tế` */
	title: matchLang({
		[Lang.English]: 'Certified by international organizations',
		[Lang.Vietnamese]: 'Chứng nhận bởi các tổ chức quốc tế',
	}),
} as const
