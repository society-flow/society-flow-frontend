<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';
	import { goto } from '$app/navigation';
	import Register from '$lib/components/auth/register.svelte';

	async function onRegister() {
		setTimeout(() => goto(`${base}/auth/login`), 0);
	}

	$effect(() => {
		userState.isAuth ? onRegister() : null;
	});
</script>

<svelte:head>
	<title>{$_('menu.register')}</title>
</svelte:head>

<h1>
	{$_('menu.register')}
</h1>

{#if !userState.isAuth}
	<Register />
{/if}
