<script>
	const { items = [], children } = $props();
</script>

<ul class="List">
	{#each items as item, index}
		<li class="List-item">
			{@render children(item, index)}
		</li>
	{/each}
</ul>

<style>
	:global(.List) {
		list-style: none;
		padding: 0;
		margin: 0;
		border: 1px solid var(--c-border);
		border-radius: var(--border-radius);

		:global(.List-item) {
			border-bottom: 1px solid var(--c-border);

			:global(.Card a) {
				border-color: transparent;
				background-color: transparent;
				border-radius: 0;

				&:hover {
					background-color: var(--c-bg--secondary);
				}
			}

			&:last-of-type {
				border-bottom: 0;
			}
		}
	}
</style>
