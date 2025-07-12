<script>
	let { children, header = () => {}, aside = () => {} } = $props();
</script>

<div>
	{#if header}
		<header>
			{@render header()}
		</header>
	{/if}
	{@render children()}

	{#if aside}
		<aside>
			{@render aside()}
		</aside>
	{/if}
</div>

<style>
	div {
		padding: 0;
		display: grid;
		align-items: stretch;
		gap: var(--s);
		header {
			display: flex;
		}
		:global(.Map) {
			min-height: 10rem;
		}
		:global(ul) {
			list-style: none;
			padding: var(--s);
			margin: 0;
			background-color: var(--c-bg--secondary);
			border-radius: var(--border-radius);
			border: 1px solid var(--c-border);
			:global(li) {
				display: flex;
				align-items: center;
				gap: calc(var(--s) / 2);
			}
		}
		:global(.Map) {
			height: 100%;
		}
		:global(svg) {
			height: 1rem;
		}
	}
</style>
