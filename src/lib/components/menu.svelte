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
    { path: '/settings', label: 'menu.settings' },
		{ path: '/auth/logout', label: 'menu.logout' },
	];

	const menuItemsNoAuth = [
		{ path: '/', label: 'menu.home' },
    { path: '/ads', label: 'menu.adverts' },
    { path: '/about', label: 'menu.about' },
		{ path: '/auth/login', label: 'menu.login' },
    { path: '/settings', label: 'menu.settings' }
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
    /* align-items: center; */
    /* justify-content: center; */
	}
	a {
    padding: calc(var(--s) / 2) var(--s);
    margin: 0 calc(var(--s) * 1);
		text-decoration: none;
		color: var(--c-fg);
    font-weight: bold;
		display: inline-block;
    /* background-color: var(--c-bg); */
    border-bottom: calc( var(--s) / 2) solid transparent;
    border-radius: calc(var(--s) / 3);
    transition: all ease-in-out 200ms;
		&[aria-current='page'] {
			background-color: var(--c-bg--menu);
      border-color: var(--c-link);
      color: var(--c-link);
		}
    &:hover {
      color: var(--c-link);
    }
	}
</style>
