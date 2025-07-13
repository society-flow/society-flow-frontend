<script>
	const { yearMonth } = $props();

  function formatYearMonth(ym) {
		const year = Math.floor(ym / 100);
		const month = ym % 100;
		return `${year}-${month.toString().padStart(2, '0')}`;
	}
  const formated = $derived(formatYearMonth(yearMonth))
</script>

<time datetime={formated} title={formated}>{formated}</time>
