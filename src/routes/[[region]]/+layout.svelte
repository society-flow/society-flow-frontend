<script>
	import '../../app.css';
	import 'leaflet/dist/leaflet.css';
	import { locale } from 'svelte-i18n';
	import { navigating } from '$app/stores';
	import { api } from '$lib/api.svelte.js';
	import { userState } from '$lib/states/user.svelte.js';
	import Menu from '$lib/components/menu.svelte';
	import Footer from '$lib/components/footer.svelte';

	const { children } = $props();

	$effect(async () => {
		if (userState?.isAuth) {
			const user = await api.getUser();
			userState.setUser(user);
		}
	});

	locale.subscribe(() => {});
	$effect(() => {
		if ($locale === 'ar') {
			document.dir = 'rtl';
		} else {
			document.dir = 'ltr';
		}
	});
</script>

<header class="Site-header">
	<Menu />
</header>

<main class="Site-main">
	{#if $navigating}
		<progress class="Site-progress"></progress>
	{:else}
		{@render children()}
	{/if}
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
		font-size: 2em;
		font-style: italic;
	}

	:global(h2) {
		font-size: 1.5em;
	}

	:global(fieldset) {
		border: 1px solid var(--c-border);
		display: flex;
		flex-direction: column;
		margin-bottom: var(--s);
		padding: var(--s);
		border-color: transparent;
	}

	:global(pre) {
		white-space: pre-wrap;
	}
	:global(fieldset[data-type='error']) {
		text-decoration: underline;
		text-decoration-color: var(--c-error);
		margin: var(--s);
	}

	:global(input, textarea, select, button, .Button) {
		padding: calc(var(--s) / 0.6);
		font-size: 1rem;
		background-color: transparent;
		border-radius: var(--border-radius);
		border: 1px solid var(--c-border);
		outline: 0.1rem solid transparent;
		transition: all 200ms ease-in-out;
		&:focus {
			border-color: var(--c-fg);
			outline-color: var(--c-fg);
		}
		&:invalid {
			border-color: var(--c-error);
		}
		&:empty {
			border-color: var(--c-border);
		}
		&:hover {
			border-color: var(--c-bg);
		}
		&[readonly],
		&[disabled] {
			background-color: var(--c-bg);
			color: var(--c-fg--secondary);
		}
		&[readonly]:focus,
		&[disabled]:focus {
			outline-color: transparent;
			border-color: transparent;
			color: var(--c-fg--secondary);
		}
		&::placeholder {
			font-style: italic;
			color: var(--c-fg--secondary);
		}
	}

	:global(input, textarea) {
		width: 100%;
	}
	:global(textarea) {
		min-height: calc(var(--s) * 5);
		resize: vertical;
	}

	:global(button, .Button) {
		border-color: var(--c-border);
		cursor: pointer;
		transition: all 140ms ease-in-out;
		padding: var(--s) calc(var(--s) * 1.5);
		font-weight: bold;
		&:hover {
			/* background-color: var(--c-bg); */
			border-color: var(--c-border);
		}
		&:focus,
		&:active {
			font-weight: bold;
		}
		&[type='submit'] {
			/* outline: 1px solid var(--c-link); */
		}
	}
	:global(a.Button) {
		/* border-color: var(--c-link); */
		text-decoration-color: transparent;
		&:hover {
			text-decoration-color: initial;
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
			text-decoration-color: var(--c-border);
		}
		&:hover {
			text-decoration-color: var(--c-border);
		}
		&:active {
			outline-color: transparent;
			text-decoration-color: transparent;
			font-weight: normal;
		}
		&[aria-current='page'] {
			/* background-color: var(--c-bg--menu); */
			/* border-bottom-color: var(--c-link); */
			/* color: var(--c-link); */
			text-decoration: none;
		}
	}
	:global(details) {
		padding: calc(var(--s) / 3);
		:global(summary) {
			padding: var(--s);
			cursor: pointer;
		}
	}

	:global(section) {
		padding: var(--s);
		& + section {
			margin-top: var(--s);
		}
	}

	:global(form) {
		display: flex;
		flex-direction: column;
		align-items: center;
		border: 1px solid var(--c-border);
		background-color: var(--c-bg--form);
		border-radius: calc(var(--border-radius) * 2);
		padding: calc(var(--s) * 2) calc(var(--s) * 1);
		/* max-width: var(--s-form); */
	}

	:global(form fieldset) {
		width: 100%;
		&:last-of-type {
			margin-bottom: 0;
			padding-bottom: 0;
			:global(&:has(button[type='submit'])) {
				position: sticky;
				bottom: 0;
				z-index: 2;
			}
		}
		:global(&:has(input:focus, input:active)),
		:global(&:has(select:focus, select:active)),
		:global(&:has(textarea:focus, textarea:active)) {
			:global(legend) {
				font-weight: bold;
				color: var(--c-fg);
			}
		}
		:global(&:has([required])) {
			:global(legend) {
				color: var(--c-link);
				&::after {
					content: '*';
					padding-left: calc(var(--s) / 2);
				}
			}
		}
	}

	:global(form fieldset label) {
		color: var(--c-fg--secondary);
		font-size: var(--font-size--small);
		font-style: italic;
		padding: calc(var(--s) / 2);
	}

	:global(form legend) {
		margin-bottom: -0.3em;
		transition: font-weight 200ms ease-in-out;
		&:not([required]) {
			color: var(--c-fg--secondary);
		}
	}
	:global(form button[type='submit']) {
		background-color: var(--c-bg--button);
	}
	.Site-progress {
		width: 100%;
		max-width: 10vmax;
    flex-grow: 1;
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
		border-radius: var(--border-radius--top);
		padding: var(--s);
		margin: 0 calc(var(--s) * 2);
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		flex-direction: column;
		z-index: 1;
    :global(&:not(:empty)) {
		  flex-grow: 1;
    }
	}
	.Site-footer {
		align-self: flex-end;
		padding: calc(var(--s) / 2);
		position: sticky;
		bottom: 0;
		z-index: 0;
	}

	/* components */  
	:global(.Detail) {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
    :global(& > :first-child) {
      margin-top: 0;
    }
		:global(& > section, & > header, & > main, & > aside) {
			border: 1px solid transparent;
			border-radius: var(--border-radius);
			padding: var(--s);
			margin-top: var(--s);
		}
		:global(& > main) {
			/* flex-grow: 1; */
			/* border-color: var(--c-border); */
      background-color: var(--c-bg--secondary);
      padding: var(--s) calc(var(--s) * 2);
		}
		:global(& > header) {
			background-color: transparent;
			border: none;
			:global(h1, h2) {
				margin-bottom: 0;
				text-align: center;
			}
			:global(& > nav) {
				justify-content: flex-end;
				align-items: center;
			}
		}
		:global(& > section) {
      /* background-color: var(--c-bg--secondary); */
			:global(> header) {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
		:global(& > aside:has(nav, .Map, .List)) {
			padding: 0;
			border: 0;
		}
		:global(& > aside:has(form)) {
			border: 0;
		}
		:global(h1, h2) {
			:global(a) {
				text-decoration: none;
			}
		}
		:global(nav) {
			list-style: none;
			display: flex;
			flex-wrap: wrap;
		}
		:global(aside nav) {
			justify-content: flex-end;
		}
		:global(header nav) {
			padding: calc(var(--s) / 2);
		}
		:global(main) {
			:global(p:last-child) {
				margin-bottom: 0;
			}
		}
	}

  :global(nav > ul) {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    :global(li) {
      margin: 0 calc(var(--s) / 2);
    }
  }

	/* utilities */
	:global(.text-center) {
		text-align: center;
	}
</style>
