<script lang="javascript">
	import { locale } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/state';

	const { path } = $props();

  console.log($locale)

	$effect(() => {
		if (href) {
			isCurrent = isCurrentPage(path);
		}
	});

	const localeRoot = $derived($locale.split('-')[0]);
	const href = $derived(`${base}/${$locale}${path}`);
	let isCurrent = $state(false);

	function isCurrentPage(pathname) {
		const currentPath = page.url.pathname.replace(/\/+$/, '');
		const targetPath = `${base}/${localeRoot}${path}`.replace(/\/+$/, '');

		// Root page special handling
		if (targetPath === `${base}/${$locale}` || targetPath === '/') {
			return currentPath === `${base}/${$locale}` || currentPath === `${base}/`;
		}

		// Subpages
		return currentPath === targetPath || currentPath.startsWith(targetPath + '/');
	}
</script>

<a {href} aria-current={isCurrent ? 'page' : undefined}>
	<slot>{label}</slot>
</a>
