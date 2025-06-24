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
		class:Page-main--center={isCenter}
		class:Page-main--full={isFull}
		class:Page-main--wide={isWide}
	>
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
		max-width: var(--s-container);
		display: flex;
		flex-direction: column;
		&:not(.Page-main--center) {
			flex-grow: 1;
		}
		&.Page-main--full {
			max-width: none;
		}
    &.Page-main--wide {
      max-width: calc(var(--s-container) * 1.5);
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
