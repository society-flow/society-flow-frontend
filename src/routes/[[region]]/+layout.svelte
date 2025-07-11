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
		z-index: 1;
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
  /* :global(nav > ul) { */
  /*   list-style: none; */
  /*   margin: 0; */
  /*   padding: 0; */
  /*   display: flex; */
  /*   flex-wrap: wrap; */
  /*   align-items: center; */
  /*   justify-content: center; */
  /*   :global(li) { */
  /*     margin: 0 calc(var(--s) / 2); */
  /*   } */
  /* } */
</style>
