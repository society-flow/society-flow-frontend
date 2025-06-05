import { init, addMessages, getLocaleFromNavigator } from 'svelte-i18n';
import en from '../content/i18n/en.json';
import as from '../content/i18n/as.json';
import de from '../content/i18n/de.json';
import fr from '../content/i18n/fr.json';

addMessages('en', en);
addMessages('as', as);
addMessages('de', de);
addMessages('fr', fr);

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator()
});
