<script lang="typescript">
	import { _ } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import VerifyOTP from '$lib/components/auth/verify-otp.svelte';
	import requiresNoAuth from '$lib/effects/requires-no-auth.svelte.js';

	requiresNoAuth();

	const email = page.url.searchParams.get('email');
	const otp = page.url.searchParams.get('otp');

	async function onverify() {
		setTimeout(() => goto(`${base}/auth/logout`), 0);
	}
</script>

<svelte:head>
	<title>{$_('menu.verify-otp')}</title>
</svelte:head>

<section>
	<h1>
		{$_('menu.verify-otp')}
	</h1>
</section>

{#if !userState.isAuth}
	<section>
		<VerifyOTP {onverify} {email} {otp} />
	</section>
	<section>
		You did not receive an email with the OTP code? <a href="#@TODO">Resend email</a> now.
	</section>
{/if}
