import React from 'react'

const defaultLabels = {
	plural: 'Docs',
	singular: 'Doc',
}

const defaultCollectionLabels = {
	posts: {
		plural: 'Posts',
		singular: 'Post',
	},
}

export function PageRange(props: {
	className?: string
	collection?: keyof typeof defaultCollectionLabels
	collectionLabels?: {
		plural?: string
		singular?: string
	}
	currentPage?: number
	limit?: number
	totalDocs?: number
}): React.JSX.Element {
	let indexStart = (props.currentPage ? props.currentPage - 1 : 1) * (props.limit || 1) + 1
	if (props.totalDocs && indexStart > props.totalDocs) indexStart = 0

	let indexEnd = (props.currentPage || 1) * (props.limit || 1)
	if (props.totalDocs && indexEnd > props.totalDocs) indexEnd = props.totalDocs

	const { plural, singular } =
		props.collectionLabels ||
		(props.collection ? defaultCollectionLabels[props.collection] : undefined) ||
		defaultLabels ||
		{}

	return (
		<div className={[props.className, 'font-semibold'].filter(Boolean).join(' ')}>
			{(typeof props.totalDocs === 'undefined' || props.totalDocs === 0) &&
				'Search produced no results.'}
			{typeof props.totalDocs !== 'undefined' &&
				props.totalDocs > 0 &&
				`Showing ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''} of ${props.totalDocs} ${
					props.totalDocs > 1 ? plural : singular
				}`}
		</div>
	)
}
