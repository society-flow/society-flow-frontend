<script lang="javascript">
	import { _, locale } from 'svelte-i18n';
	import { userState } from '$lib/states/user.svelte.js';
	import Anchor from '$lib/components/anchor.svelte';
	import Icon from '$lib/components/icon.svelte';

	const menuItemsAuth = [
		{ path: '/', label: 'menu.home', icon: 'home' },
		{ path: '/societies', label: 'menu.societies', icon: 'business-alt' },
		{ path: '/invitations', label: 'menu.invitations', icon: 'email' },
		{ path: '/messages', label: 'menu.messages', icon: 'message' },
		{ path: '/ads', label: 'menu.ads', icon: 'world' },
		{ path: '/auth/logout', label: 'menu.auth.logout', icon: 'user-fill' }
	];

	const menuItemsNoAuth = [
		{ path: '/', label: 'menu.home' },
		{ path: '/ads', label: 'menu.ads' },
		{ path: '/about', label: 'menu.about' },
		{ path: '/auth/login', label: 'menu.auth.login' }
	];

	const isAuth = $derived(userState.isAuth);
	const menuItems = $derived(isAuth ? menuItemsAuth : menuItemsNoAuth);
</script>

<menu>
	{#each menuItems as { path, label, icon } (path)}
		<li>
			<Anchor href={path} title={$_(label)}>
				{#if icon}
					<Icon {icon}>
						{$_(label)}
					</Icon>
				{:else}
					{$_(label)}
				{/if}
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
		overflow-x: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
		/* align-items: center; */
		/* justify-content: center; */
		:global(a) {
			padding: var(--s);
			margin: 0 calc(var(--s) * 1);
			text-decoration: none;
			color: var(--c-fg);
			font-weight: bold;
			display: inline-flex;
			align-items: center;
			/* background-color: var(--c-bg); */
			border: calc(var(--s) / 1.6) solid transparent;
			transition: all ease-in-out 300ms;
			outline: 1px solid transparent;
			outline-offset: 0;
			color: var(--c-fg);
			white-space: nowrap;
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
			}
			&:focus {
				outline-offset: -0.05rem;
				outline-color: var(--c-link);
				/* border-radius: calc(var(--s) * 1.5); */
			}
			:global(svg) {
				margin: 0 calc(var(--s) / 3);
			}
		}
	}
</style>
