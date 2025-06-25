<script lang="javascript">
	const {
		title,
		header,
		children,
		footer,
		showHeader = true,
		isCenter = false,
		isWide = false,
		isFull = false
	} = $props();
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<article
  class="Page"
  class:Page--center={isCenter}
	class:Page--full={isFull}
	class:Page--wide={isWide}
  >
	{#if header}
		<header class="Page-header">
			{@render header()}
		</header>
	{:else if showHeader && title}
		<header class="Page-header">
			<h1>
				{title}
			</h1>
		</header>
	{/if}

	{#if children}
		<main
			class="Page-main"
		>
			{@render children()}
		</main>
	{/if}

	{#if footer}
		<footer class="Page-footer">
			{@render footer()}
		</footer>
	{/if}
</article>

<style>
  .Page {
    width: 100%;
		max-width: var(--s-container);
		display: flex;
		flex-direction: column;
    &:not(.Page--center) {
			flex-grow: 1;
		}
		&.Page--full {
			max-width: none;
		}
		&.Page--wide {
			max-width: calc(var(--s-container) * 1.5);
		}
  }
	.Page-header {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: var(--s);
		padding: var(--s);
		:global(h1, h2) {
			margin-bottom: 0;
		}
	}
	.Page-main {
		width: 100%;
		display: flex;
		flex-direction: column;
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
