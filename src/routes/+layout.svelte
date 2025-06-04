<script lang="javascript">
	import '../app.css';
	import { waitLocale } from 'svelte-i18n';
	import '$lib/i18n.js';
	import Menu from '$lib/components/menu.svelte';
	import Footer from '$lib/components/footer.svelte';

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

<footer class="Site-footer">
	<Footer />
</footer>

<style>
	:global(html, body, .Site) {
		min-height: 100dvh;
	}
	:global(body) {
		margin: 0;
	}
	:global(.Site) {
		background-color: var(--c-bg--secondary);
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--c-fg);
		line-height: var(--line-height);
		font-size: var(--font-size);
	}
	:global(h1, h2, h3, h4, h5, p) {
		margin-top: 0;
		margin-bottom: var(--s);
	}
  :global(h1) {
    font-size: 1.7em;
  }
  :global(h2) {
    font-size: 1.3em;
  }
	:global(fieldset) {
		border: 1px solid var(--c-border);
		display: flex;
		flex-direction: column;
	}
	:global(input, textarea, select, button) {
		padding: calc(var(--s) / 1);
		font-size: 1rem;
    transition: border-color 200ms ease-in-out;
		&:focus {
			border-color: var(--c-link);
		}
		&:invalid {
			border-color: var(--c-error);
		}
		&:empty {
			border-color: var(--c-border);
		}
    &:hover {
      border-color: var(--c-fg);
    }
	}
	:global(button) {
		background-color: var(--c-bg);
	}
	:global(a) {
		color: var(--c-link);
	}
	:global(section) {
		padding: var(--s);
	}
	:global(fieldset) {
		margin-bottom: var(--s);
		padding: var(--s);
		border-color: transparent;
		&[data-type='error'] {
			border-color: transparent;
			text-decoration: underline;
			text-decoration-color: var(--c-error);
			margin: var(--s);
		}
	}
	:global(form) {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 1px solid var(--c-border);
		background-color: var(--c-bg--form);
		border-radius: var(--border-radius);
		padding: calc(var(--s) * 3) calc(var(--s) * 2);
		max-width: var(--s-form);
		& fieldset {
			width: 100%;
		}
		:global(input, textarea, select, button) {
			background-color: var(--c-bg);
		}
	}

	/* local elements */
	.Site-header {
		/* order: 1; */
		position: sticky;
		top: 0;
		display: flex;
		justify-content: center;
    background-color: var(--c-bg--secondary);
		border-bottom: 1px solid var(--c-border);
	}
	.Site-main {
		background-color: var(--c-bg);
		border-radius: var(--border-radius);
		flex-grow: 1;
		padding: var(--s);
		margin: 0 calc(var(--s) * 2);
		/* max-width: var(--s-page); */
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		flex-direction: column;
		:global(& > section) {
			width: 100%;
			max-width: var(--s-container);
		}
	}
  .Site-footer {
    align-self: flex-end;
    a {
      padding: calc(var(--s) / 2);
      display: inline-block;
    }
  }
</style>
