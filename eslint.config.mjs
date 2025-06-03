import { FlatCompat } from '@eslint/eslintrc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

export default [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		plugins: {
			'simple-import-sort': simpleImportSort,
		},
		rules: {
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
		},
	},
	{
		rules: {
			'@typescript-eslint/ban-ts-comment': 'warn',
			'@typescript-eslint/no-empty-object-type': 'warn',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-non-null-assertion': 'error',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					args: 'after-used',
					ignoreRestSiblings: false,
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^(_|ignore)',
				},
			],
		},
	},
	{
		ignores: ['.next/', './src/migrations/'],
	},
]
