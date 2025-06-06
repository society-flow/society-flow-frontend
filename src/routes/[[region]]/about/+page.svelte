<script lang="javascript">
	import { _, json } from 'svelte-i18n';
	import Icon from '$lib/components/svg-icon.svelte';
	
	const aboutSections = $derived($json('pages.about.sections'));
</script>

<svelte:head>
	<title>{$_('pages.about.title')}</title>
</svelte:head>

<header>
	<h1>{$_('pages.about.title')}</h1>
</header>

<section size="large">
	{#each Object.entries(aboutSections) as [key, section]}
		<article>
			<p>{section.text}</p>
			<Icon name={section.icon} />
		</article>
	{/each}
</section>

<style global>
	section {
		font-style: italic;
		font-size: 1.3rem;
		line-height: 1.5;
		display: grid;
		gap: calc(var(--s) * 2);
		@media (min-width: 40rem) {
			grid-template-columns: 1fr 1fr;
		}
	}
	:global(.Site-main) {
		& > section[size='large'] {
			max-width: calc(var(--s-container) * 1.6);
		}
	}

	article {
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: var(--c-bg--secondary);
		border: 1px solid var(--c-border);
		padding: calc(var(--s) * 2);
		text-align: center;
		border-radius: var(--border-radius);
		/* @media (min-width: 40rem) { */
		/* 	&:nth-child(2n) { */
		/* 		flex-direction: column-reverse; */
		/* 	} */
		/* 	&:nth-child(3n) { */
		/* 		flex-direction: row; */
		/* 		align-items: center; */
		/* 	} */
		/* } */
	}

	p {
		padding: var(--s);
		&:last-of-type {
			margin-bottom: 0;
		}
	}

	:global(svg) {
		margin: calc(var(--s) * 5) auto;
		transition: transform 0.3s ease;
		background: var(--c-bg);
		border-radius: var(--border-radius);
		border: 1px solid var(--c-border);
		max-width: calc(var(--s) * 2);
		min-width: 40vw;
		@media (min-width: 40rem) {
			min-width: 8vw;
			margin: calc(var(--s) * 2) auto;
		}
	}
</style>
