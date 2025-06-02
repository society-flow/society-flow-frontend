<!-- src/_layout.svelte -->
<script>
	import '../app.css';
	import { waitLocale } from 'svelte-i18n';
	import '$lib/i18n.js';
	import Menu from '$lib/components/site/menu.svelte';

	const { children } = $props();

	export async function preload() {
		// awaits for the loading of the language ("en"...) dictionaries
		return waitLocale();
	}
</script>

<header class="Site-header">
	<Menu />
</header>

<main class="Site-main">
	{@render children()}
</main>

<style>
	:global(html, body, .Site) {
		min-height: 100dvh;
	}
	:global(body) {
		margin: 0;
	}
	:global(.Site) {
		display: flex;
		flex-direction: column;
		background-color: var(--c-bg);
		color: var(--c-fg);
		line-height: var(--line-height);
		font-size: var(--font-size);
	}
	:global(h1, h2, h3, h4, h5, p) {
		margin-top: 0;
	}
	:global(fieldset) {
		border: 1px solid var(--c-border);
    display: flex;
    flex-direction: column;
	}
  :global(input, textarea, select, button) {
    padding: calc(var(--s) / 2);
    font-size: 1rem;
    &:focus {
      border-color: var(--c-link);
    }
  }

	.Site-main {
		flex-grow: 1;
		padding: var(--s);
	}
</style>
