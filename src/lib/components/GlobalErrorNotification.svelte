<script>
	import { globalError } from '$lib/stores/globalError.svelte.js';
	import Error from '$lib/components/error.svelte';
	
	function handleClose() {
		globalError.hide();
	}
</script>

{#if globalError.error}
	<div class="global-error-notification">
		<div class="global-error-content">
			<Error error={globalError.error} />
			<button onclick={handleClose} class="close-btn">×</button>
		</div>
	</div>
{/if}

<style>
	.global-error-notification {
		position: fixed;
		bottom: 60px;
		left: 20px;
		right: 20px;
		z-index: 1000;
		max-width: 600px;
		margin: 0 auto;
	}
	
	.global-error-content {
		background: #f8d7da;
		border: 1px solid #f5c6cb;
		border-radius: 4px;
		padding: 12px 16px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 12px;
	}
	
	.close-btn {
		background: none;
		border: none;
		font-size: 18px;
		cursor: pointer;
		color: #721c24;
		padding: 0;
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	
	.close-btn:hover {
		opacity: 0.7;
	}
</style>