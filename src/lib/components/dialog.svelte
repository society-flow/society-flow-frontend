<script>
	import { _ } from 'svelte-i18n';
	import { IconClose, IconCircleAdd } from 'obra-icons-svelte';

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
		<IconCircleAdd />
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
				<IconClose />
			{/if}
		</button>
	</form>

	{@render children?.()}
</dialog>

<style>
  dialog {
    border: 1px solid var(--c-border);
    border-radius: var(--border-radius);
    padding: var(--s);
    width: auto;
    height: auto;
    min-width: auto;
    min-height: auto;
    transition: min-height 200ms ease-in-out, min-width 200ms ease-in-out;
    &::backdrop {
      background-color: var(--c-transparent);
      opacity: 1;
      transition: all 300ms ease-in-out;
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
      &::backdrop {
        background-color: var(--c-bg);
        opacity: 0.8;
      }
    }
  }
  form[method="dialog"] {
    padding: 0;
    align-items: flex-end;
    align-self: flex-end;
    margin: calc(var(--s) / 2);
  }
</style>
