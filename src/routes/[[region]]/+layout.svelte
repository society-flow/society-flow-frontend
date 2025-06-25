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
