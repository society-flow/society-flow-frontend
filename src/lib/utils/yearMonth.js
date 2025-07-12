/**
 * Utility functions for handling yearMonth operations
 */

/**
 * Get current yearMonth in YYYYMM format
 * @returns {number} Current yearMonth as integer
 */
export function getCurrentYearMonth() {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	return parseInt(`${year}${month}`);
}

/**
 * Format yearMonth integer to readable string
 * @param {number} yearMonth - YYYYMM format integer
 * @returns {string} Formatted as YYYY-MM
 */
export function formatYearMonth(yearMonth) {
	const year = Math.floor(yearMonth / 100);
	const month = yearMonth % 100;
	return `${year}-${month.toString().padStart(2, '0')}`;
}

/**
 * Generate array of yearMonth options for dropdowns
 * @param {number} monthsAhead - Number of future months to include (default: 12)
 * @returns {Array} Array of {value, label} objects
 */
export function generateYearMonthOptions(monthsAhead = 12) {
	const options = [];
	
	for (let i = 0; i < monthsAhead; i++) {
		const date = new Date();
		date.setMonth(date.getMonth() + i);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const yearMonth = parseInt(`${year}${month}`);
		options.push({
			value: yearMonth,
			label: `${year}-${month}`
		});
	}
	return options;
}