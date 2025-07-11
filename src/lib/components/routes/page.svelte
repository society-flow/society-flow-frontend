<script>
	import Anchor from '$lib/components/anchor.svelte';

	const {
		headTitle,
		title,
		titleHref,
		nav,
		head,
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
	{#if !head}
		<title>{headTitle || title}</title>
	{:else}
		{@render head()}
	{/if}
</svelte:head>

<div class="Page" class:Page--center={isCenter} class:Page--full={isFull} class:Page--wide={isWide}>
	{#if header}
		<header class="Page-header">
			{@render header()}
		</header>
	{:else if showHeader && title}
		<header class="Page-header">
			<h1>
				{#if titleHref}
					<Anchor href={titleHref}>
						{title}
					</Anchor>
				{:else}
					{title}
				{/if}
			</h1>
		</header>
	{/if}

	{#if nav}
		<nav class="Nav">
			<ul>
				{@render nav()}
			</ul>
		</nav>
	{/if}

	{#if children}
		<main class="Page-main">
			{@render children()}
		</main>
	{/if}

	{#if footer}
		<footer class="Page-footer">
			{@render footer()}
		</footer>
	{/if}
</div>

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
		:global(.Nav) {
			display: flex;
			justify-content: center;
			margin: var(--s) 0;
      overflow: auto;
			:global(ul) {
				display: flex;
				align-items: center;
				justify-content: flex-start;
				flex-wrap: nowrap;
				overflow-x: scroll;
				scrollbar-width: none;
				-ms-overflow-style: none;
				background-color: var(--c-bg--secondary);
				border-bottom: 1px solid var(--c-border);
				border-radius: var(--border-radius);
				list-style: none;
				margin: 0;
				padding: 0;
			}
			:global(ul) {
				/* justify-content: center; */
				:global(li) {
					background-color: var(--c-bg--secondary);
				}
			}
			:global(a:not(.Button)) {
				padding: calc(var(--s) * 1.2) calc(var(--s) * 1.3);
				border-bottom: 0.2rem solid transparent;
				border-radius: 0;
				color: var(--c-fg);
				white-space: pre;
				&[aria-current='page'] {
					border-bottom-color: var(--c-link);
					color: var(--c-link);
				}
				&:not([aria-current='page']) {
					text-decoration: none;
				}
				:global(&.Button) {
					border-radius: var(--border-radius);
					border-color: var(--c-border);
				}
			}
			&:has(.Button) {
				background-color: red;
			}
		}
	}
	.Page-header {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: var(--s);
		padding: calc(var(--s) / 2);
		:global(h1) {
			margin-bottom: 0;
			/* :global(a[aria-current='page']) { */
			/* 	text-decoration: underline var(--c-link); */
			/* } */
		}
	}
	.Page-main {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	.Page-footer {
		:global(a) {
			padding: var(--s);
		}
		:global(nav ul) {
			list-style: none;
			justify-content: center;
		}
	}
</style>
