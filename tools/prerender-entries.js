// tools/generatePrerenderEntries.js
import fs from 'fs';
import path from 'path';

/**
 * Supported locales you want to prerender for
 */
const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'as'];

/**
 * Starting folder: the `[[region]]` directory under routes
 */
const ROUTES_ROOT = path.resolve('src/routes/[[region]]');

/**
 * Returns true if `dir` contains a +page.(svelte|js|ts)
 */
function hasPageFile(dir) {
	// Check for +page.svelte, +page.js, or +page.ts
	const entries = fs.readdirSync(dir);
	return entries.some((file) => /^(\+page\.(svelte|js|ts))$/.test(file));
}

/**
 * Recursively walk `dir` and collect all static‐only route‐folders.
 * Static‐only means: skip any folder whose name contains '[' or ']'
 *
 * Returns an array of relative POSIX‐style paths (no leading slash), e.g.
 *   [ '', 'about', 'ads', 'societies', 'residences', ... ]
 */
function collectStaticRoutes(dir, relative = '') {
	const results = [];

	// If this folder has a +page.* file, record it.
	if (hasPageFile(dir)) {
		// `relative` is '' for the root of [[region]] (meaning “/locale”)
		results.push(relative.replace(/\\/g, '/'));
	}

	// Now recurse into subdirectories, skipping any directory with '[' in its name
	const children = fs
		.readdirSync(dir, { withFileTypes: true })
		.filter((d) => d.isDirectory() && !/\[.+\]/.test(d.name));

	for (const child of children) {
		const childDir = path.join(dir, child.name);
		const childRel = relative === '' ? child.name : `${relative}/${child.name}`;
		results.push(...collectStaticRoutes(childDir, childRel));
	}

	return results;
}

/**
 * Main generator function.
 * Returns an array of strings: [ '/en', '/en/about', '/de/ads', ... ]
 */
export default function generatePrerenderEntries() {
	if (!fs.existsSync(ROUTES_ROOT)) {
		throw new Error(`Cannot find ${ROUTES_ROOT}. Make sure your [[region]] folder exists.`);
	}

	// Step 1: gather all static route “relative paths” under [[region]]
	//   e.g. [ '', 'about', 'ads', 'societies', 'societies/list', ... ]
	const staticRoutes = collectStaticRoutes(ROUTES_ROOT);

	// Step 2: for each locale, prefix each route with `/locale/`
	const entries = [];

	for (const locale of SUPPORTED_LOCALES) {
		for (const route of staticRoutes) {
			// Build "/<locale>" or "/<locale>/<route>"
			const full = route === '' ? `/${locale}` : `/${locale}/${route}`;
			entries.push(full.replace(/\/+$/, ''));
		}
	}

	// Always ensure "/" (root) also redirects/crawls or is included if you want a fallback
	entries.push('/');
	return entries;
}
