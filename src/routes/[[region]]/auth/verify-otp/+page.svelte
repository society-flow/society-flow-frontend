<script lang="javascript">
	import { _, json, locale } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import VerifyOTP from '$lib/components/auth/verify-otp.svelte';
	import requiresNoAuth from '$lib/effects/requires-no-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';
	import Anchor from '$lib/components/anchor.svelte';

	requiresNoAuth($locale);

	const email = page.url.searchParams.get('email');
	const otp = page.url.searchParams.get('otp');

	const sections = $derived($json('pages.auth.verify-otp.sections'));

	async function onverify() {
		setTimeout(() => goto(`${base}/${$locale}/`), 0);
	}
</script>

<Page title={$_('menu.auth.verify-otp')} isCenter={true}>
	{#snippet header()}
		<h1>
			{$_('menu.auth.verify-otp')}
		</h1>
	{/snippet}
	{#if !userState.isAuth}
		<section>
			<VerifyOTP {onverify} {email} {otp} />
		</section>
		<section>
			{#each Object.entries(sections) as [key, section]}
				<section class="text-center">
					<p>
						{#if section.link}
							{section.text}{','}
							<Anchor href={$_(section.link.url, { values: { email } })}
								>{$_(section.link.text)}</Anchor
							>
							{'.'}
						{:else}
							{section.text}
						{/if}
					</p>
				</section>
			{/each}
		</section>
	{/if}
</Page>
