<script lang="javascript">
	import { _, json, locale } from 'svelte-i18n';
	import { base } from '$app/paths';
	import { userState } from '$lib/states/user.svelte.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import Anchor from '$lib/components/anchor.svelte';
	import Register from '$lib/components/auth/register.svelte';
	import requiresNoAuth from '$lib/effects/requires-no-auth.svelte.js';
	import Page from '$lib/components/routes/page.svelte';

	requiresNoAuth($locale);

	const email = page.url.searchParams.get('email');
	const name = page.url.searchParams.get('name');

	const sections = $derived($json('pages.auth.register.sections'));

	async function onregister({ email: userEmail }) {
		setTimeout(() => goto(`${base}/${$locale}/auth/verify-otp?email=${userEmail}`), 0);
	}
</script>

<Page title={$_('menu.auth.register')} isCenter={true}>
	{#if !userState.isAuth}
		<section>
			<Register {onregister} {email} {name} />
		</section>
		{#each Object.entries(sections) as [key, section]}
			<section>
				<p>
					{section.text}
					{#if section.link}
						<Anchor href={section.link.url}>{$_(section.link.text)}</Anchor>
					{/if}
					{'.'}
				</p>
			</section>
		{/each}
	{/if}
</Page>
