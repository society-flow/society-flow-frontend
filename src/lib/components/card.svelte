<script lang="javascript">
	const { children, header, footer } = $props();
</script>

<article class="Card">
	{#if header}
		<header class="Card-header">
			{@render header?.()}
		</header>
	{/if}
	{#if children}
		<main class="Card-main">
			{@render children()}
		</main>
	{/if}
	{#if footer}
		<footer class="Card-footer">
			{@render footer()}
		</footer>
	{/if}
</article>

<style>
	.Card {
    :global(.Card-header) {
      padding: var(--s);
    }
    :global(.Card-main) {
      :global(ul) {
        padding: 0 calc(var(--s) * 4);
        margin: 0;
        list-style: square;
      }
      :global(a) {
			  display: flex;
			  flex-wrap: wrap;
			  gap: var(--s);
			  padding: calc(var(--s) * 1.5);
			  border: 1px solid var(--c-border);
			  border-radius: var(--border-radius);
			  text-decoration: underline;
			  text-decoration-color: transparent;
			  transition: all 150ms ease-in-out;
			  outline: 1px solid transparent;
			  font-weight: normal;
			  &:hover {
				  text-decoration: underline var(--c-link);
				  border-color: var(--c-bg--secondary);
				  background-color: transparent;
				  font-weight: bold;
			  }
			  &:focus {
				  outline-color: var(--c-fg);
				  font-weight: bold;
			  }
			  &:active {
				  outline-color: var(--c-bg--secondary);
				  border-color: var(--c-border);
			  }
        :global(&:has(svg)) {
          display: flex;
          align-items: center;
        }
        :global(&[aria-current="page"]) {
          background-color: var(--c-bg--secondary);
          border-color: var(--c-bg);
        }
		  }
    }
	}
</style>
