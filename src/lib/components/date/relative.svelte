<script>
	import { _, locale, locales } from 'svelte-i18n';
	import { formatDistanceToNowStrict, parseISO } from 'date-fns';
	import * as fnsLocales from 'date-fns/locale';
  const { enUS, fr, de, es, it } = fnsLocales

  console.log("fnsLocales", fnsLocales)
  console.log("locales", locales)

	const { date } = $props();

	const localeMap = fnsLocales;

	// Parse date if string
	const parsedDate = typeof date === 'string' ? parseISO(date) : date;

	// Compute relative date string
	const relative = formatDistanceToNowStrict(parsedDate, {
		addSuffix: true,
		locale: localeMap[$locale] ?? enUS
	});
</script>

<span>{relative}</span>
