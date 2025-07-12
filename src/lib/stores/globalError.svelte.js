/**
 * Global error store for displaying API errors at the bottom of the screen
 */

let errorState = $state({
	error: null,
	timeoutId: null
});

export const globalError = {
	get error() {
		return errorState.error;
	},
	
	/**
	 * Show global error notification
	 * @param {Object} error - Error object (API error or any error)
	 * @param {number} duration - Auto-hide duration in ms (default: 8000)
	 */
	show(error, duration = 8000) {
		// Clear existing timeout
		if (errorState.timeoutId) {
			clearTimeout(errorState.timeoutId);
		}
		
		errorState.error = error;
		
		// Auto-hide after duration
		if (duration > 0) {
			errorState.timeoutId = setTimeout(() => {
				this.hide();
			}, duration);
		}
	},
	
	/**
	 * Hide global error notification
	 */
	hide() {
		errorState.error = null;
		if (errorState.timeoutId) {
			clearTimeout(errorState.timeoutId);
			errorState.timeoutId = null;
		}
	}
};