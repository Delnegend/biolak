import React from 'react'

export function BeforeLogin(): React.JSX.Element {
	return (
		<div>
			<p>
				<b>Welcome to your dashboard!</b>
				{' This is where site admins will log in to manage your website.'}
			</p>
		</div>
	)
}

export default BeforeLogin
