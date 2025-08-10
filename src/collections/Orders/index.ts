import { nanoid } from 'nanoid'
import { CollectionConfig } from 'payload'

import { allow, Role } from '@/access/allow'
import { Lang } from '@/utilities/lang'

import { sendOrderCreatedEmail } from './hooks/sendOrderCreatedEmail'
import { OrdersSlug } from './slug'
import { ORDERS_tab_billing as ORDERS_group_billing } from './subfields/group_billing'
import { ORDERS_group_cart } from './subfields/group_cart'
import { ORDER_final_prices as ORDERS_group_final_prices } from './subfields/group_final_prices'
import { ORDERS_group_message } from './subfields/group_message'
import { ORDERS_tab_review as ORDERS_group_review } from './subfields/group_review'
import { ORDERS_tab_shipping_info as ORDERS_group_shipping_info } from './subfields/group_shipping_info'
import { ORDERS_customer as receiver_and_state } from './subfields/receiver_and_state'

export const OrdersCollection: CollectionConfig<typeof OrdersSlug> = {
	slug: OrdersSlug,
	labels: {
		singular: {
			[Lang.English]: 'Orders',
			[Lang.Vietnamese]: 'Đơn hàng',
		},
		plural: {
			[Lang.English]: 'Orders',
			[Lang.Vietnamese]: 'Đơn hàng',
		},
	},
	access: {
		create: allow(Role.Admin, Role.SalesManager),
		delete: allow(Role.Admin, Role.SalesManager),
		read: allow(Role.Admin, Role.SalesManager),
		update: allow(Role.Admin, Role.SalesManager),
	},
	fields: [
		{
			name: 'invoiceId',
			type: 'text',
			required: true,
			unique: true,
			defaultValue: () => nanoid(),
			access: {
				read: allow(Role.Admin, Role.SalesManager, Role.ContentManager),
				update: allow(Role.NoOne),
				create: allow(Role.NoOne),
			},
			label: {
				[Lang.English]: 'Invoice ID',
				[Lang.Vietnamese]: 'Mã hóa đơn',
			},
			admin: {
				hidden: true,
			},
		},
		...receiver_and_state,
		ORDERS_group_message,
		ORDERS_group_shipping_info,
		ORDERS_group_cart,
		ORDERS_group_final_prices,
		ORDERS_group_billing,
		ORDERS_group_review,
	],
	timestamps: true,
	versions: true,
	hooks: {
		afterChange: [sendOrderCreatedEmail],
	},
	admin: {
		useAsTitle: 'receiverName',
		defaultColumns: [
			'receiverName',
			'receiverPhoneNumber',
			'receiverAddress',
			'receiverNote',
			'prices.total',
			'createdAt',
		],
	},
}
