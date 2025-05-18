import { postgresAdapter } from '@payloadcms/db-postgres'
import { en } from '@payloadcms/translations/languages/en'
import { vi } from '@payloadcms/translations/languages/vi'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import sharp from 'sharp' // sharp-import
import { fileURLToPath } from 'url'

import { defaultLexical } from '@/fields/defaultLexical'

import { ContactFormSubmissionsCollection } from './collections/ContactFormSubmissions/config'
import { MediaCollection } from './collections/Media/Media'
import { PagesCollection } from './collections/Pages'
import { PostCategoriesCollection } from './collections/PostCategories'
import { PostsCollection } from './collections/Posts'
import { ProductCategoriesCollection } from './collections/ProductCategories'
import { ProductsCollection } from './collections/Products'
import { ProductSubCategoriesCollection } from './collections/ProductSubCategories'
import { UsersCollection } from './collections/Users'
import { UsersSlug } from './collections/Users/slug'
import { CheckoutPageGlobalConf } from './globals/CheckoutPage/config'
import { ContactFormGlobalConf } from './globals/ContactForm/config'
import { FooterGlobalConf } from './globals/Footer/config'
import { HeaderGlobalConf } from './globals/Header/config'
import { PromoGlobalConf } from './globals/Promo/config'
import { plugins } from './plugins'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
	admin: {
		components: {
			// The `BeforeLogin` component renders a message that you see while logging into your admin panel.
			// Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
			// beforeLogin: ['@/components/BeforeLogin'],
			// The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
			// Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
			// beforeDashboard: ['@/components/BeforeDashboard'],
		},
		importMap: {
			baseDir: path.resolve(dirname),
		},
		user: UsersSlug,
		livePreview: {
			breakpoints: [
				{
					label: 'Mobile',
					name: 'mobile',
					width: 375,
					height: 667,
				},
				{
					label: 'Tablet',
					name: 'tablet',
					width: 768,
					height: 1024,
				},
				{
					label: 'Desktop',
					name: 'desktop',
					width: 1440,
					height: 900,
				},
			],
		},
	},
	// This config helps us configure global or default features that the other editors can inherit
	editor: defaultLexical,
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI,
		},
	}),
	collections: [
		ContactFormSubmissionsCollection,
		MediaCollection,
		PagesCollection,
		PostCategoriesCollection,
		PostsCollection,
		ProductCategoriesCollection,
		ProductsCollection,
		ProductSubCategoriesCollection,
		UsersCollection,
	],
	cors: [getServerSideURL()].filter(Boolean),
	globals: [
		CheckoutPageGlobalConf,
		ContactFormGlobalConf,
		FooterGlobalConf,
		HeaderGlobalConf,
		PromoGlobalConf,
	],
	plugins: [
		...plugins,
		// storage-adapter-placeholder
	],
	secret: process.env.PAYLOAD_SECRET,
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	jobs: {
		access: {
			run: ({ req }: { req: PayloadRequest }): boolean => {
				// Allow logged in users to execute this endpoint (default)
				if (req.user) return true

				// If there is no logged in user, then check
				// for the Vercel Cron secret to be present as an
				// Authorization header:
				const authHeader = req.headers.get('authorization')
				return authHeader === `Bearer ${process.env.CRON_SECRET}`
			},
		},
		tasks: [],
	},
	i18n: {
		supportedLanguages: { en, vi },
		fallbackLanguage: 'en',
	},
})
