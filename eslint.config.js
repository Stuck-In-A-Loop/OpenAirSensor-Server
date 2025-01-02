import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import perfectionist from 'eslint-plugin-perfectionist';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser
			}
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	},
	{
		plugins: {
			perfectionist
		},
		rules: {
			'perfectionist/sort-imports': 'error',
			'perfectionist/sort-interfaces': ['error'],
			'perfectionist/sort-objects': [
				'error',
				{
					type: 'alphabetical'
				}
			]
		},
		settings: {
			perfectionist: {
				partitionByComment: true,
				type: 'line-length'
			}
		}
	}
);
