/**
 * Global error notification store for displaying API errors
 */

let errorState = $state({
	isVisible: false,
	error: null,
	timeoutId: null
});

export const errorNotification = {
	get isVisible() {
		return errorState.isVisible;
	},
	get error() {
		return errorState.error;
	},
	
	/**
	 * Show error notification
	 * @param {Object} error - Error object with status, message, etc.
	 * @param {number} duration - Auto-hide duration in ms (default: 5000)
	 */
	show(error, duration = 5000) {
		// Clear existing timeout
		if (errorState.timeoutId) {
			clearTimeout(errorState.timeoutId);
		}
		
		errorState.error = error;
		errorState.isVisible = true;
		
		// Auto-hide after duration
		if (duration > 0) {
			errorState.timeoutId = setTimeout(() => {
				this.hide();
			}, duration);
		}
	},
	
	/**
	 * Hide error notification
	 */
	hide() {
		errorState.isVisible = false;
		errorState.error = null;
		if (errorState.timeoutId) {
			clearTimeout(errorState.timeoutId);
			errorState.timeoutId = null;
		}
	}
};