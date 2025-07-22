import React from 'react'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { Page } from '@/payload-types'
import { Lang } from '@/utilities/lang'

const heroes = {
	highImpact: HighImpactHero,
	lowImpact: LowImpactHero,
	mediumImpact: MediumImpactHero,
}

export function RenderHero(props: Page['hero'] & { __locale: Lang }): React.JSX.Element {
	if (!props.type || props.type === 'none') return <></>

	const HeroToRender = heroes[props.type]

	if (!HeroToRender) return <></>

	return <HeroToRender {...props} />
}
