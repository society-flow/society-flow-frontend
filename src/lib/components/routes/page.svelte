<script type="javascript">
	const { title, header, children } = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<header>
	{@render header?.()}
</header>

{@render children?.()}
