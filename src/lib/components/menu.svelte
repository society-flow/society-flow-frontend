<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { userState } from '$lib/states/user.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';

	const menuItemsAuth = [
		{ path: '/', label: 'menu.home' },
		{ path: '/ads', label: 'menu.adverts' },
		{ path: '/societies', label: 'menu.societies' },
		{ path: '/residences', label: 'menu.residences' },
		{ path: '/expenses', label: 'menu.expenses' },
		{ path: '/auth/logout', label: 'menu.logout' }
	];

	const menuItemsNoAuth = [
		{ path: '/', label: 'menu.home' },
		{ path: '/ads', label: 'menu.adverts' },
		{ path: '/about', label: 'menu.about' },
		{ path: '/auth/login', label: 'menu.login' }
	];

	const isAuth = $derived(userState.isAuth);
	const menuItems = $derived(isAuth ? menuItemsAuth : menuItemsNoAuth);
</script>

<menu>
	{#each menuItems as { path, label } (path)}
		<li>
			<Anchor href={path}>
				{$_(label)}
			</Anchor>
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
		:global(a) {
			padding: calc(var(--s) / 2) var(--s);
			margin: 0 calc(var(--s) * 1);
			text-decoration: none;
			color: var(--c-fg);
			font-weight: bold;
			display: inline-block;
			/* background-color: var(--c-bg); */
			border: calc(var(--s) / 2) solid transparent;
			transition: all ease-in-out 300ms;
			outline: 1px solid transparent;
			outline-offset: 0;
			color: var(--c-fg);
			&[aria-current='page'] {
				background-color: var(--c-bg--menu);
				border-bottom-color: var(--c-link);
				color: var(--c-link);
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
			&:hover {
				color: var(--c-link);
				/* border-radius: calc(var(--s) * 1.5); */
				color: var(--c-fg);
			}
			&:focus {
				outline-offset: -0.05rem;
				/* border-radius: calc(var(--s) * 1.5); */
			}
		}
	}
</style>
