<script lang="javascript">
	import { locale } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/state';

	const { href: reqHref, children, isActive: active = false , isButton = false, ...rest } = $props();

	const localeRoot = $derived($locale.split('-')[0]);
	const href = $derived(`${base}/${$locale}${reqHref}`);

	function isCurrentPage(pathname) {
		const currentPath = page.url.pathname.replace(/\/+$/, '');
		const targetPath = `${base}/${localeRoot}${reqHref}`.replace(/\/+$/, '');

		// Root page special handling
		if (targetPath === `${base}/${$locale}` || targetPath === '/') {
			return currentPath === `${base}/${$locale}` || currentPath === `${base}/`;
		}

		// Subpages
		return currentPath === targetPath || currentPath.startsWith(targetPath + '/');
	}

	const isActive = $derived(active || isCurrentPage(reqHref));
</script>

<a {...rest} {href} aria-current={isActive ? 'page' : undefined} class:Button={isButton}>
	{#if children}
		{@render children()}
	{:else}
		{href}
	{/if}
</a>
