<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Register from '$lib/components/auth/register.svelte';
	import requiresNoAuth from '$lib/effects/requires-no-auth.svelte.js';

	requiresNoAuth();

	const email = page.url.searchParams.get('email');
	const name = page.url.searchParams.get('name');

	async function onregister({email: userEmail}) {
    console.log("onregister")
		setTimeout(() => goto(`${base}/auth/verify-otp?email=${userEmail}`), 0);
	}
</script>

<svelte:head>
	<title>{$_('menu.register')}</title>
</svelte:head>

<section>
	<h1>
		{$_('menu.register')}
	</h1>
</section>

{#if !userState.isAuth}
	<section>
		<Register {onregister} {email} {name} />
	</section>

	<section>
		<p>
			You already have an account?
			<a href="{base}/auth/login">
				{$_('menu.login')}
			</a>
			your existing user account.
		</p>
	</section>
{/if}
