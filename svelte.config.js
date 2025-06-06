import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import generatePrerenderEntries from './tools/prerender-entries.js';

const base = process.argv.includes('dev') ? '' : process.env.BASE_PATH;

const entries = generatePrerenderEntries();

const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			/* fallback: undefined, */
			fallback: `${base}/index.html`,
			precompress: false,
			strict: true
		}),
		prerender: {
			entries
		}
	},
	// https://github.com/sveltejs/kit/discussions/11554
	paths: {
		base
	}
};

export default config;
