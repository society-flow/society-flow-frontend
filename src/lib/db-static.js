import { DEFAULT_LOCALE } from '$lib/i18n.js';

const pathToSlugAndLocale = (path) => {
	const parts = path.split('/');
	const file = parts.at(-1);
	const slug = file.replace('.json', '');

	const contentTypeIndex = parts.findIndex((p) => p === 'content') + 1;
	const maybeLocale = parts[contentTypeIndex + 1];
	const isLocale = /^[a-z]{2}(-[A-Z]{2})?$/.test(maybeLocale);

	const locale = isLocale ? maybeLocale : DEFAULT_LOCALE;

	return { slug, locale };
};

const pathToContentType = (path) => {
	const parts = path.split('/');
	const index = parts.findIndex((p) => p === 'content');
	return parts[index + 1];
};

const moduleToData = (path, module) => {
	const { slug, locale } = pathToSlugAndLocale(path);
	const type = pathToContentType(path);
	return {
		...module,
		slug: module?.slug || slug,
		locale,
		type
	};
};

const serializeModules = async (modules) => {
	const res = [];
	for (const path in modules) {
		const data = await modules[path]().then((mod) => moduleToData(path, mod));
		res.push({ ...data, _path: path });
	}
	return res;
};

// Static import of all JSON content under /content
const allContentModules = import.meta.glob('/src/content/**/*.json', {
	import: 'default'
});

let allContentCache = null;
const loadAllContent = async () => {
	if (!allContentCache) {
		allContentCache = await serializeModules(allContentModules);
	}
	return allContentCache;
};

// 🔄 Generic getter by content type, locale, and slug
const getContent = async (type, locale = DEFAULT_LOCALE, slug) => {
	const all = await loadAllContent();
	return (
		all.find((item) => item.type === type && item.locale === locale && item.slug === slug) ||
		all.find((item) => item.type === type && item.locale === DEFAULT_LOCALE && item.slug === slug)
	);
};

// Get all content of a specific type with locale filtering
const getAllContent = async (type, locale = DEFAULT_LOCALE) => {
	const all = await loadAllContent();

	// Get items for requested locale
	const requestedLocaleItems = all.filter((item) => item.type === type && item.locale === locale);

	// If requesting default locale, return only default locale items
	if (locale === DEFAULT_LOCALE) {
		return requestedLocaleItems;
	}

	// For non-default locales, include fallbacks for missing content
	const defaultLocaleItems = all.filter(
		(item) => item.type === type && item.locale === DEFAULT_LOCALE
	);

	// Get slugs that exist in requested locale
	const requestedLocaleSlugs = new Set(requestedLocaleItems.map((item) => item.slug));

	// Add default locale items only if they don't exist in requested locale
	const fallbackItems = defaultLocaleItems.filter((item) => !requestedLocaleSlugs.has(item.slug));

	return [...requestedLocaleItems, ...fallbackItems];
};

// Optional type-specific wrappers
const getBlogs = () => getAllContent('blogs');
const getBlog = (slug, locale) => getContent('blogs', locale, slug);

const getTickers = () => getAllContent('tickers');
const getTicker = (slug, locale) => getContent('tickers', locale, slug);

export { getContent, getAllContent, getBlogs, getBlog, getTicker, getTickers };
