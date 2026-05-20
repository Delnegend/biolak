import { FlatCompat } from '@eslint/eslintrc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
	resolvePluginsRelativeTo: __dirname,
})

const config = [
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
			// '@typescript-eslint/no-unnecessary-condition': 'error',
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
			'no-console': 'error',
		},
	},
	{
		ignores: ['.next/', './src/migrations/', './src/app/(payload)/admin/importMap.js'],
	},
]
export default config
