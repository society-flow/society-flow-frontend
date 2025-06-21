// tools/generatePrerenderEntries.js
import fs from 'fs';
import path from 'path';

// import { SUPPORTED_LOCALES } from '../src/lib/i18n.js';

const SUPPORTED_LOCALES = ['en', 'as', 'de', 'fr', 'pl', 'tr', 'pt', 'uk'];

/**
 * Configuration for dynamic route parameters
 * Key: route pattern, Value: object with param arrays
 */
const DYNAMIC_ROUTES = {
	'legal/[slug]': {
		slug: ['privacy-policy', 'terms-of-service', 'cookie-policy', 'data-protection']
	},
	'delete/[model]': {
		model: ['ads', 'societies', 'residences', 'expenses']
	}
};

/**
 * Starting folder: the `[[region]]` directory under routes
 */
const ROUTES_ROOT = path.resolve('src/routes/[[region]]');

/**
 * Returns true if `dir` contains a +page.(svelte|js|ts)
 */
function hasPageFile(dir) {
	try {
		const entries = fs.readdirSync(dir);
		return entries.some((file) => /^(\+page\.(svelte|js|ts))$/.test(file));
	} catch (error) {
		return false;
	}
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
		// `relative` is '' for the root of [[region]] (meaning "/locale")
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
 * Recursively walk `dir` and collect all dynamic route patterns.
 * Dynamic means: contains '[' and ']' in folder name
 *
 * Returns an array of relative POSIX‐style paths with brackets, e.g.
 *   [ 'ads/[id]', 'legal/[slug]', 'societies/[id]', ... ]
 */
function collectDynamicRoutes(dir, relative = '') {
	const results = [];

	// If this folder has a +page.* file, record it as a dynamic route
	if (hasPageFile(dir) && /\[.+\]/.test(relative)) {
		results.push(relative.replace(/\\/g, '/'));
	}

	// Recurse into all subdirectories
	try {
		const children = fs.readdirSync(dir, { withFileTypes: true }).filter((d) => d.isDirectory());

		for (const child of children) {
			const childDir = path.join(dir, child.name);
			const childRel = relative === '' ? child.name : `${relative}/${child.name}`;
			results.push(...collectDynamicRoutes(childDir, childRel));
		}
	} catch (error) {
		// Skip directories we can't read
	}

	return results;
}

/**
 * Generate all parameter combinations for a dynamic route
 */
function generateDynamicEntries(routePattern, paramConfig) {
	const entries = [];
	const paramNames = Object.keys(paramConfig);
	const paramValues = Object.values(paramConfig);

	// Generate all combinations
	function generateCombinations(index, current) {
		if (index === paramNames.length) {
			// Replace all parameters in the route pattern
			let resolvedRoute = routePattern;
			for (const [param, value] of Object.entries(current)) {
				resolvedRoute = resolvedRoute.replace(`[${param}]`, value);
			}
			entries.push(resolvedRoute);
			return;
		}

		const paramName = paramNames[index];
		const values = paramValues[index];

		for (const value of values) {
			current[paramName] = value;
			generateCombinations(index + 1, current);
		}
	}

	generateCombinations(0, {});
	return entries;
}

/**
 * Main generator function.
 * Returns an array of strings: [ '/en', '/en/about', '/de/ads/123', ... ]
 */
export default function generatePrerenderEntries() {
	if (!fs.existsSync(ROUTES_ROOT)) {
		throw new Error(`Cannot find ${ROUTES_ROOT}. Make sure your [[region]] folder exists.`);
	}

	// Step 1: gather all static route "relative paths" under [[region]]
	const staticRoutes = collectStaticRoutes(ROUTES_ROOT);

	// Step 2: gather all dynamic route patterns under [[region]]
	const dynamicRoutePatterns = collectDynamicRoutes(ROUTES_ROOT);

	// Step 3: generate resolved dynamic routes
	const dynamicRoutes = [];
	for (const pattern of dynamicRoutePatterns) {
		const config = DYNAMIC_ROUTES[pattern];
		if (config) {
			const resolved = generateDynamicEntries(pattern, config);
			dynamicRoutes.push(...resolved);
		} else {
			console.warn(`⚠️  No configuration found for dynamic route: ${pattern}`);
		}
	}

	// Step 4: combine all routes
	const allRoutes = [...staticRoutes, ...dynamicRoutes];

	// Step 5: for each locale, prefix each route with `/locale/`
	const entries = [];
	for (const locale of SUPPORTED_LOCALES) {
		for (const route of allRoutes) {
			// Build "/<locale>" or "/<locale>/<route>"
			const full = route === '' ? `/${locale}` : `/${locale}/${route}`;
			entries.push(full.replace(/\/+$/, ''));
		}
	}

	entries.push('*');
	console.log('entries', entries);
	return entries;
}
