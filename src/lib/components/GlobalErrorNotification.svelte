<script>
	import { globalError } from '$lib/stores/globalError.svelte.js';
	import Error from '$lib/components/error.svelte';
	
	function handleClose() {
		globalError.hide();
	}
</script>

{#if globalError.error}
	<div>
		<div>
			<Error error={globalError.error} />
			<button onclick={handleClose}>×</button>
		</div>
	</div>
{/if}
