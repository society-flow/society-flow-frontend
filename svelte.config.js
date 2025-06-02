import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const base = process.argv.includes('dev') ? '' : process.env.BASE_PATH;

/** @type {import('@sveltejs/kit').Config} */
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
		})
	},
	// https://github.com/sveltejs/kit/discussions/11554
	paths: {
		base
	}
};

export default config;
