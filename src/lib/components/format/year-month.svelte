<script>
	import { _, locale, locales } from 'svelte-i18n';
	import { formatDistanceToNowStrict, parseISO } from 'date-fns';
	import * as fnsLocales from 'date-fns/locale';
	import { DEFAULT_LOCALE } from '$lib/i18n.js';

	const { yearMonth } = $props();

  function formatYearMonth(ym) {
    console.log("ym", ym)
		const year = Math.floor(ym / 100);
		const month = ym % 100;
		return `${year}-${month.toString().padStart(2, '0')}`;
	}
  const formated = $derived(formatYearMonth(yearMonth))
</script>

<time datetime={formated} title={formated}>{formated}</time>
