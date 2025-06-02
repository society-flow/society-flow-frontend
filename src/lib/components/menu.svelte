<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { userState } from '$lib/states/user.svelte.js';

	const menuItemsAuth = [
		{ path: '/', label: 'menu.home' },
		{ path: '/expenses', label: 'menu.expenses' },
		{ path: '/ads', label: 'menu.adverts' },
		{ path: '/auth/logout', label: 'menu.logout' }
	];

	const menuItemsNoAuth = [
		{ path: '/', label: 'menu.home' },
		{ path: '/auth/login', label: 'menu.login' }
	];

	function isCurrentPage(menuItem) {
    console.log("-----")
    console.log("menuItem", menuItem);
    console.log("page.url.pathname", page.url.pathname);
    console.log("base", base);
		if (page.url.pathname === base + "/") {
			return menuItem.path === "/";
		} else {
			return menuItem.path !== "/" && page.url.pathname.startsWith(`${base}${menuItem.path}`);
		}
	}

	const isAuth = $derived(userState.user?.email);
	const menuItems = $derived(isAuth ? menuItemsAuth : menuItemsNoAuth);
</script>

<menu>
	{#each menuItems as item (item.path)}
		<li>
			<a href="{base}{item.path}" aria-current={isCurrentPage(item) ? 'page' : ''}>
				{$_(item?.label)}
			</a>
		</li>
	{/each}
</menu>

<style>
	menu {
		padding: 0;
		margin: 0;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
	}
	a {
		padding: var(--s);
		text-decoration: none;
		color: inherit;
		display: inline-block;
		&[aria-current='page'] {
			color: var(--c-link);
		}
	}
</style>
