<script>
	import { locale } from 'svelte-i18n';

	const { currency, value } = $props();

	function formatCurrency(amount) {
		const currencyCode = currency;
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency: currencyCode
		}).format(amount);
	}

	const valueFormated = $derived(formatCurrency(value));
</script>

{valueFormated}
<!-- {currency} -->
