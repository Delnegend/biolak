'use client'

import { ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useCartManager } from '@/hooks/useCartManager'

import { useSelectedProductVariant } from './ProductVariantContext'

export function INTERNAL_AddToCartButton({ disabled }: { disabled?: boolean }): React.JSX.Element {
	const t = useTranslations('heros.productHero.addToCart')
	const { loadProduct } = useCartManager({ syncWithLocalStorage: true })
	const { selectedProductVariant } = useSelectedProductVariant()

	return (
		<Button
			size="md"
			className="flex items-center justify-between gap-4 border-black uppercase text-black"
			hideArrow={true}
			variant="outline"
			onClick={() => {
				if (!selectedProductVariant?.product.id || !selectedProductVariant?.variant.sku)
					return
				loadProduct({
					...selectedProductVariant,
					quantity: 1,
					checked: true,
				})
				toast.success(
					t('toast', {
						product: selectedProductVariant.product.title,
						variant: selectedProductVariant.variant.title,
					}),
				)
			}}
			disabled={!selectedProductVariant || disabled}
			aria-label={t('ariaLabel', {
				product: selectedProductVariant?.product.title ?? '',
				variant: selectedProductVariant?.variant.title ?? '',
			})}
		>
			<span>{disabled ? t('outOfStock') : t('label')}</span>
			<ShoppingCart />
		</Button>
	)
}
