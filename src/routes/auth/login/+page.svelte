<script lang>
	import { _ } from 'svelte-i18n';
	import { userState } from '$lib/states/user.svelte.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import Login from '$lib/components/auth/login.svelte';
	import requiresNoAuth from '$lib/effects/requires-no-auth.svelte.js';

	requiresNoAuth();

	const email = page.url.searchParams.get('email');

	async function onLogin({ email }) {
		setTimeout(() => goto(`${base}/auth/verify-otp?email=${email}`), 0);
	}
</script>

<svelte:head>
	<title>{$_('menu.login')}</title>
</svelte:head>

<section>
	<h1>
		{$_('menu.login')}
	</h1>

	{#if !userState.isAuth}
		<Login {onLogin} {email} />
	{/if}
</section>

{#if !userState.isAuth}
	<section>
		<p>
			You don't have an account yet?' It's free to
			<a href="{base}/auth/register">
				{$_('menu.register').toLowerCase()}
			</a>
			a new user.
		</p>
	</section>
{/if}
