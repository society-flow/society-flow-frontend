<script>
	const { items = [], className, children, aside } = $props();
</script>

<ul class={`List ${className}`}>
	{#each items as item, index}
		<li class="List-item">
			{@render children(item, index)}
			{#if aside}
				<nav>
					<ul>
						{@render aside(item, index)}
					</ul>
				</nav>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.List {
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
					background-color: var(--c-bg2);
				}
			}

			&:last-of-type {
				border-bottom: 0;
			}
		}
    :has(nav) {
      display: flex;
			justify-content: space-between;
			align-items: center;
    }
	}
</style>
