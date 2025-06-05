<script lang="javascript">
	const { name, label } = $props();

	const icons = {
		lang: { symbol: '🌐' },
		home: { symbol: '🏠' },
		adverts: { symbol: '📢' },
		societies: { symbol: '🏘️' },
		residences: { symbol: '🏡' },
		expenses: { symbol: '💸' },
		settings: { symbol: '⚙️' },
		logout: { symbol: '🔓' },
		register: { symbol: '📝' },
		login: { symbol: '🔐' },
		verify: { symbol: '✅' },
		default: { symbol: '❓' }
	};

	const { symbol } = icons[name] || icons.default;
</script>

<span role="img" aria-label={label} title={label}>
	{symbol}
</span>
