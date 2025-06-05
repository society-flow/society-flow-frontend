import { userState } from '$lib/states/user.svelte.js';
import { PUBLIC_API_URL } from '$env/static/public';
import societies from '../content/societies.js';
import residences from '../content/residences.js';
import expenses from '../content/expenses.js';
import adverts from '../content/adverts.js';

const DATA = {
	'/societies': societies,
	'/residences': residences,
	'/expenses': expenses,
	'/adverts': adverts
};

class Api {
	urlMock = window.location.origin;
	url = $state(`${PUBLIC_API_URL}/api`);

	constructor() {
		if (!PUBLIC_API_URL) {
			console.warn('Missing PUBLIC_API_URL env var');
		}
	}

	async fetch(endpoint, { method = 'GET', data } = {}) {
		const options = {
			method,
			headers: {
				'Content-Type': 'application/json'
			}
		};

		if (data) {
			options.body = JSON.stringify(data);
		}

		return fetch(`${this.url}${endpoint}`, options).then(async (res) => {
			if (!res.ok) {
				const errorBody = await res.json();
				throw new Error(errorBody.message || res.statusText);
			}
			return res.json();
		});
	}

	// ========== MOCK METHODS ==========
	fetchMock(endpoint) {
		return fetch(this.urlMock).then(() => DATA[endpoint]);
	}

	getSocieties() {
		return this.fetchMock('/societies');
	}
	getSociety(id) {
		return this.getSocieties().then((s) => s.find((i) => i.id === id));
	}

	getResidences() {
		return this.fetchMock('/residences');
	}
	getResidence(id) {
		return this.getResidences().then((r) => r.find((i) => i.id === id));
	}

	getExpenses() {
		return this.fetchMock('/expenses');
	}
	getExpense(id) {
		return this.getExpenses().then((e) => e.find((i) => i.id === id));
	}

	getAdverts() {
		return this.fetchMock('/adverts');
	}
	getAdvert(id) {
		return this.getAdverts().then((a) => a.find((i) => i.id === id));
	}

	// ========== AUTH METHODS ==========
	async register({ name, email }) {
		// for testing
		return Promise.resolve({
			id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
			email: email,
			name: name,
			createdAt: '2025-06-04T06:05:18.702Z',
			updatedAt: '2025-06-04T06:05:18.702Z'
		});
		/* return this.fetch('/users', {
			 method: 'POST',
			 data: { name, email }
		   }); */
	}

	async login({ email }) {
		// for testing
		return true;
		/* return this.fetch('/users/login', {
			 method: 'POST',
			 data: { email }
		   }); */
		// login doesn't return a user — no storage here
	}

	async verifyOtp({ email, otp }) {
		// for testing
		return Promise.resolve({
			id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
			email: email,
			name: 'Bobi Diye',
			createdAt: '2025-06-04T05:41:36.367Z',
			updatedAt: '2025-06-04T05:41:36.367Z'
		}).then((user) => {
			return userState.login(user);
		});
		/* return this.fetch('/users/verify-otp', {
			 method: 'POST',
			 data: { email, otp }
		   }).then((user) => {
			 return userState.login(user);
		   }); */
	}

	logout() {
		userState.logout();
	}
}

export const api = new Api();
