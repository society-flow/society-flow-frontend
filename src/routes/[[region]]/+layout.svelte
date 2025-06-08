<script lang="javascript">
	import '../../app.css';
	import 'leaflet/dist/leaflet.css';
	import { navigating } from '$app/stores';
	import Menu from '$lib/components/menu.svelte';
	import Footer from '$lib/components/footer.svelte';

  const {children} = $props()
</script>

<header class="Site-header">
	<Menu />
</header>

<main class="Site-main">
	{#if $navigating}
		<div class="spinner-overlay">
			<progress></progress>
		</div>
	{/if}

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

	:global(h1, h2, h3, h4, h5) {
		margin-top: 0;
		margin-bottom: var(--s);
		line-height: 1.1;
	}

	:global(p) {
		margin-top: 0;
		margin-bottom: var(--s);
	}

	:global(h1) {
		font-size: 1.7em;
		font-style: italic;
	}

	:global(h2) {
		font-size: 1.3em;
	}

	:global(fieldset) {
		border: 1px solid var(--c-border);
		display: flex;
		flex-direction: column;
		margin-bottom: var(--s);
		padding: var(--s);
		border-color: transparent;
	}

	:global(fieldset[data-type='error']) {
		text-decoration: underline;
		text-decoration-color: var(--c-error);
		margin: var(--s);
	}

	:global(input, textarea, select, button) {
		padding: calc(var(--s) / 0.6);
		font-size: 1rem;
		transition: border-color 200ms ease-in-out;
		border-radius: var(--border-radius);
		border: 1px solid var(--c-border);
		&:focus {
			border-color: var(--c-fg);
			outline: 0.1rem solid var(--c-fg);
		}
		&:invalid {
			border-color: var(--c-error);
		}
		&:empty {
			border-color: var(--c-border);
		}
		&:hover {
			border-color: var(--c-bg-border);
		}
	}

	:global(input, textarea) {
		width: 100%;
	}
	:global(textarea) {
		min-height: calc(var(--s) * 5);
		resize: vertical;
	}

	:global(button) {
		border-color: var(--c-border);
		cursor: pointer;
		transition: all 140ms ease-in-out;
		&:hover {
			background-color: var(--c-bg);
			border-color: var(--c-bg--secondary);
		}
		&[type='submit'] {
      /* outline: 1px solid var(--c-link); */
		}
	}

	:global(a) {
		color: var(--c-link);
		font-weight: bold;
		outline: 1px solid transparent;
		border-radius: calc(var(--s) * 1.5);
    display: inline-block;
    line-height: 1; /* for :focus styles centered */
    padding: calc(var(--s) / 2.5) calc(var(--s) / 1.7);
    
		transition: all 140ms ease-in-out;
		&:focus {
			outline-color: var(--c-link);
		}
		&:hover {
			border-radius: 0;
		}
		&:active {
			outline-color: transparent;
			text-decoration-color: transparent;
		}
	}

	:global(section) {
		padding: var(--s);
	}

	:global(form) {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 1px solid var(--c-border);
		background-color: var(--c-bg--form);
		border-radius: calc(var(--border-radius) * 2);
		padding: calc(var(--s) * 3) calc(var(--s) * 2);
		/* max-width: var(--s-form); */
	}

	:global(form fieldset) {
		width: 100%;
		&:last-of-type {
			margin-bottom: 0;
			padding-bottom: 0;
		}
	}

	:global(form fieldset label) {
		color: var(--c-fg--secondary);
		font-size: var(--font-size--small);
		font-style: italic;
	}

	:global(form legend) {
		margin-bottom: -0.3em;
		font-weight: bold;
	}
	:global(form button[type='submit']) {
		/* background-color: var(--c-border); */
	}

	.Site-header {
		z-index: 2;
		position: sticky;
		top: 0;
		display: flex;
		justify-content: center;
		background-color: var(--c-bg--secondary);
		border-bottom: 1px solid var(--c-border);
		width: 100%;
	}

	.Site-main {
		background-color: var(--c-bg);
		border-radius: var(--border-radius);
		flex-grow: 1;
		padding: var(--s);
		margin: 0 calc(var(--s) * 2);
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		flex-direction: column;
		z-index: 1;
	}

	:global(.Site-main > section) {
		width: 100%;
		max-width: var(--s-container);
	}

	:global(.Site-main > section[size='large']) {
		max-width: calc(var(--s-container) * 1.3);
	}

	:global(.Site-main > header) {
		padding: calc(var(--s) * 3) 0;
	}

	.Site-footer {
		align-self: flex-end;
		padding: calc(var(--s) / 2);
		position: sticky;
		bottom: 0;
		z-index: 0;
	}

  /* utilities */
  :global(.text-center) {
    text-align: center;
  }
</style>
