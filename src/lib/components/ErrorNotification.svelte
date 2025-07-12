<script>
	import { errorNotification } from '$lib/stores/errorNotification.svelte.js';
	
	function handleClose() {
		errorNotification.hide();
	}
</script>

{#if errorNotification.isVisible && errorNotification.error}
	<div class="error-notification">
		<div class="error-content">
			<div class="error-header">
				<span class="error-status">Error {errorNotification.error.status}</span>
				<button onclick={handleClose} class="close-btn">×</button>
			</div>
			<div class="error-message">
				{errorNotification.error.message || errorNotification.error.error || 'An error occurred'}
			</div>
		</div>
	</div>
{/if}

<style>
	.error-notification {
		position: fixed;
		bottom: 60px;
		left: 20px;
		right: 20px;
		z-index: 1000;
		max-width: 600px;
		margin: 0 auto;
	}
	
	.error-content {
		background: #f8d7da;
		border: 1px solid #f5c6cb;
		border-radius: 4px;
		padding: 12px 16px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}
	
	.error-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 4px;
	}
	
	.error-status {
		font-weight: bold;
		color: #721c24;
		font-size: 14px;
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
	}
	
	.close-btn:hover {
		opacity: 0.7;
	}
	
	.error-message {
		color: #721c24;
		font-size: 14px;
		line-height: 1.4;
	}
</style>