<script type="javascript">
	const { title, header, children, footer, isCenter = false } = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

{#if header}
	<header class="Page-header">
		{@render header()}
	</header>
{:else if title}
	<header class="Page-header">
		<h1>
			{title}
		</h1>
	</header>
{/if}

{#if children}
	<main class={`Page-main ${isCenter ? 'Page-main--center' : ''}`}>
		{@render children()}
	</main>
{/if}

{#if footer}
	<footer class="Page-footer">
		{@render footer()}
	</footer>
{/if}

<style>
	.Page-header {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: var(--s);
		padding: calc(var(--s) * 2);
		:global(h1, h2) {
			margin-bottom: 0;
		}
	}
	.Page-main {
		width: 100%;
		max-width: var(--s-container);
		display: flex;
		flex-direction: column;
		&:not(.Page-main--center) {
			flex-grow: 1;
		}
	}
	.Page-footer {
		:global(a) {
			padding: var(--s);
		}
    :global(nav) {
      list-style: none;
    }
	}
</style>
