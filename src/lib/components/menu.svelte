<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { userState } from '$lib/states/user.svelte.js';

	const menuItemsAuth = [
		{ path: '/', label: 'menu.home' },
		{ path: '/ads', label: 'menu.adverts' },
    { path: '/societies', label: 'menu.societies' },
    { path: '/residences', label: 'menu.residences' },
		{ path: '/expenses', label: 'menu.expenses' },
    { path: '/about', label: 'menu.about' },
		{ path: '/auth/logout', label: 'menu.logout' }
	];

	const menuItemsNoAuth = [
		{ path: '/', label: 'menu.home' },
    { path: '/ads', label: 'menu.adverts' },
    { path: '/about', label: 'menu.about' },
		{ path: '/auth/login', label: 'menu.login' }
	];

	function isCurrentPage(menuItem) {
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
    overflow-x: scroll;
    li:first-of-type {
      position: sticky;
      left: 0;
    }
	}
	a {
    padding: calc(var(--s) / 2) var(--s);
		text-decoration: none;
    background-color: var(--c-bg--menu);
		color: inherit;
		display: inline-block;
		&[aria-current='page'] {
			background-color: var(--c-bg);
		}
	}
</style>
