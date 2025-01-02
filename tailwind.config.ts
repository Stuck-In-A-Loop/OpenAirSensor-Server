import type { Config } from 'tailwindcss';

import { join } from 'path';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';

export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	darkMode: 'class',
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					{ enhancements: true, name: 'seafoam' },
					{ enhancements: true, name: 'crimson' },
					{ enhancements: true, name: 'hamlindigo' },
					{ enhancements: true, name: 'modern' },
					{ enhancements: true, name: 'vintage' },
					{ enhancements: true, name: 'wintry' }
				]
			}
		})
	],
	theme: {
		extend: {}
	}
} satisfies Config;
