<script lang="javascript">
	import { _, json } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import VerifyOTP from '$lib/components/auth/verify-otp.svelte';
	import requiresNoAuth from '$lib/effects/requires-no-auth.svelte.js';

	requiresNoAuth();

	const email = page.url.searchParams.get('email');
	const otp = page.url.searchParams.get('otp');

	const sections = $derived($json('pages.auth.verify-otp.sections'));

	async function onverify() {
		setTimeout(() => goto(`${base}/`), 0);
	}
</script>

<svelte:head>
	<title>{$_('menu.verify-otp')}</title>
</svelte:head>

<header>
	<h1>
		{$_('menu.verify-otp')}
	</h1>
</header>

{#if !userState.isAuth}
	<section>
		<VerifyOTP {onverify} {email} {otp} />
	</section>
	<section>
		{#each Object.entries(sections) as [key, section]}
			<section>
				<p>{section.text}</p>
			</section>
		{/each}
	</section>
{/if}

<style>
	p {
		text-align: center;
	}
</style>
