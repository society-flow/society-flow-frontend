<script>
	import { _, locale, locales } from 'svelte-i18n';
	import { formatDistanceToNowStrict, parseISO } from 'date-fns';
	import * as fnsLocales from 'date-fns/locale';
	import { DEFAULT_LOCALE } from '$lib/i18n.js';

	const { date } = $props();

	// Parse date if string
	const parsedDate = typeof date === 'string' ? parseISO(date) : date;

	// Compute relative date string
	const relative = formatDistanceToNowStrict(parsedDate, {
		addSuffix: true,
		locale: fnsLocales[$locale] || fnsLocales[DEFAULT_LOCALE] || fnsLocales['enUS']
	});
</script>

<time datetime={date} title={date}>{relative}</time>
