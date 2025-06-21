import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

export const SUPPORTED_LOCALES = ['en', 'as', 'ar', 'de', 'es', 'fr', 'pl', 'pt', 'tr', 'uk'];
export const DEFAULT_LOCALE = SUPPORTED_LOCALES[0];

export function localeIsSupported(locale) {
	return SUPPORTED_LOCALES.indexOf(locale) > -1;
}

export function translateCurrentPath(path, targetLang, basePath = '') {
	const hasTrailingSlash = path.endsWith('/');

	// Strip all slashes, split and filter empty parts
	let pathParts = path.split('/').filter(Boolean);

	// Remove base path from the beginning if present
	if (basePath) {
		const baseSegment = basePath.startsWith('/') ? basePath.slice(1) : basePath;
		if (pathParts[0] === baseSegment) {
			pathParts = pathParts.slice(1);
		}
	}

	// Remove language prefix if present
	const cleanPath = SUPPORTED_LOCALES.includes(pathParts[0])
		? pathParts.slice(1).join('/')
		: pathParts.join('/');

	// Construct new path with base
	const basePrefix = basePath ? `/${basePath.startsWith('/') ? basePath.slice(1) : basePath}` : '';

	const newPath =
		targetLang === DEFAULT_LOCALE
			? `${basePrefix}/${DEFAULT_LOCALE}/${cleanPath}`
			: `${basePrefix}/${targetLang}/${cleanPath}`;

	return hasTrailingSlash && !newPath.endsWith('/') ? `${newPath}/` : newPath;
}

const localeFiles = import.meta.glob('../content/i18n/*.json');

for (const lng of SUPPORTED_LOCALES) {
	register(lng, () => {
		const matchingKey = `../content/i18n/${lng}.json`;
		if (localeFiles[matchingKey]) {
			return localeFiles[matchingKey]();
		} else {
			return Promise.reject(new Error(`Missing translation file for "${lng}"`));
		}
	});
}

init({
	fallbackLocale: DEFAULT_LOCALE,
	initialLocale: getLocaleFromNavigator()
});
