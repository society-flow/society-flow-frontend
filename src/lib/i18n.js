import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

export const SUPPORTED_LOCALES = ['en', 'as', 'de', 'fr'];

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
	fallbackLocale: SUPPORTED_LOCALES[0],
	initialLocale: getLocaleFromNavigator()
});
