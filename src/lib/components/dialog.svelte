<script>
	import { _ } from 'svelte-i18n';
	import Icon from '$lib/components/icon.svelte';

	const { trigger, open: initialOpen = false, children, buttonOpen, buttonClose } = $props();

	let open = $state(initialOpen);
	let dialog = $state(null);

	$effect(() => {
		if (!dialog) return;

		if (open) {
			dialog.showModal();
		} else {
			dialog.close();
		}
	});

	function handleOpen() {
		open = true;
	}

	function handleClose() {
		open = false;
	}

	function handleKeydown(event) {
		if (event.key === 'Escape') {
			handleClose();
		}
	}

	function handleBackdropClick(event) {
		if (event.target === dialog) {
			handleClose();
		}
	}
</script>

<button onclick={handleOpen}>
	{#if buttonOpen}
		{@render buttonOpen?.()}
	{:else}
		<Icon icon="circle-add" />
	{/if}
</button>

<dialog
	bind:this={dialog}
	onclose={handleClose}
	onkeydown={handleKeydown}
	onclick={handleBackdropClick}
>
	<form method="dialog">
		<button type="button" onclick={handleClose}>
			{#if buttonClose}
				{@render buttonClose?.()}
			{:else}
				{$_('common.cancel')}
				<Icon icon="close" />
			{/if}
		</button>
	</form>

	<article>
		{@render children?.()}
	</article>
</dialog>

<style>
	dialog {
		border: 1px solid var(--c-border);
		border-radius: var(--border-radius);
		padding: 0;
		width: auto;
		height: auto;
		min-width: auto;
		min-height: auto;
		transition:
			min-height 200ms ease-in-out,
			min-width 200ms ease-in-out;
		background-color: var(--c-transparent);
		&::backdrop {
			background-color: var(--c-transparent);
			opacity: 1;
			transition: all 300ms ease-in-out;
			outline: 1px solid var(--c-border);
			outline-offset: -0.1rem;
		}
		&[open] {
			display: flex;
			flex-direction: column;
			min-height: 60dvh;
			max-height: 70vh;
			max-width: var(--s-container);
			/* margin: calc(var(--s) / 2); */
			align-self: center;
			left: var(--s);
			right: var(--s);
			background-color: var(--c-bg);
			&::backdrop {
				background-color: var(--c-bg2);
				opacity: 0.5;
			}
		}
		article {
			flex-grow: 1;
		}
		:global(article:has(form)) {
			height: 100%;
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			:global(form) {
				flex-grow: 1;
				margin: calc(var(--s) / 2);
			}
		}
	}
	form[method='dialog'] {
		padding: 0;
		margin: 0;
		margin-bottom: calc(var(--s) / 2);
		align-items: flex-end;
		align-self: flex-end;
		position: sticky;
		top: 0;
	}
</style>
