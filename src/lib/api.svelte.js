import Swagger from 'swagger-client';
import { userState } from '$lib/states/user.svelte.js';
import { DOCUMENT_TYPES as validLegalDocumentTypes } from '$lib/const/legal.js';
import societies from '../content/societies.js';
import residences from '../content/residences.js';
import expenses from '../content/expenses.js';
import adverts from '../content/adverts.js';
import { PUBLIC_API_URL } from '$env/static/public';

const MOCK_DATA = {
	'/societies': societies,
	'/residences': residences,
	'/expenses': expenses,
	'/adverts': adverts
};

let swaggerClient = null;

export async function initSwaggerClient() {
	if (!swaggerClient) {
		swaggerClient = await Swagger('https://gigrandom.com/api-docs');
	}
	return swaggerClient;
}

export function getSwaggerClient() {
	if (!swaggerClient) throw new Error('Swagger client not initialized. Call initApi() first.');
	return swaggerClient;
}

class Api {
	urlMock = window.location.origin;
	url = $state(`${PUBLIC_API_URL}/api`);

	async getClient() {
		const client = getSwaggerClient();
		const token = userState?.token;
		if (token) {
			client.spec.securityDefinitions = {
				bearerAuth: {
					type: 'apiKey',
					name: 'Authorization',
					in: 'header'
				}
			};
			client.authorizations = {
				bearerAuth: `Bearer ${token}`
			};
		}
		return client;
	}

	// Mocked endpoints
	fetchMock(endpoint) {
		return Promise.resolve(MOCK_DATA[endpoint]);
	}
	getSocieties() {
		return this.fetchMock('/societies');
	}
	getSociety(id) {
		return this.getSocieties().then((list) => list.find((i) => i.id === id));
	}
	getResidences() {
		return this.fetchMock('/residences');
	}
	getResidence(id) {
		return this.getResidences().then((list) => list.find((i) => i.id === id));
	}
	getExpenses() {
		return this.fetchMock('/expenses');
	}
	getExpense(id) {
		return this.getExpenses().then((list) => list.find((i) => i.id === id));
	}
	getAdverts() {
		return this.fetchMock('/adverts');
	}
	getAdvert(id) {
		return this.getAdverts().then((list) => list.find((i) => i.id === id));
	}

	// Auth methods
	logout() {
		userState.logout();
	}
	async login({ email }) {
		const client = await this.getClient();
		console.log('client', client);
		console.log('client', client.apis['client user']);
		return client.apis['User Controller'].login({ body: { email } });
	}
	async register({ name, email }) {
		const client = await this.getClient();
		return client.apis['User Controller'].createUser({ name, email });
	}
	async verifyOtp({ email, otp }) {
		const client = await this.getClient();
		const res = await client.apis['User Controller'].verifyOtp({ email, otp });
		userState.setToken(res.body.token);
		return res;
	}

	async getUser() {
		const client = await this.getClient();
		return client.apis['User Controller'].getUser();
	}
	async getUserByEmail(email = userState?.user?.email) {
		const client = await this.getClient();
		return client.apis['User Controller'].getUserByEmail({ email });
	}

	// Legal content (fallback to fetch)
	async getLegal(legalDocumentType, lang = 'en') {
		if (!validLegalDocumentTypes.includes(legalDocumentType)) {
			throw new Error(
				`Invalid legal document type. Must be one of: ${validLegalDocumentTypes.join(', ')}`
			);
		}

		const endpoint = `/legal/${legalDocumentType}?lang=${lang}`;
		const res = await fetch(`${this.url}${endpoint}`, {
			method: 'GET',
			headers: { 'Content-Type': 'text/plain' }
		});

		if (!res.ok) {
			const err = await res.json();
			throw new Error(err.message || res.statusText);
		}
		return legalDocumentType === 'data-processing-info' ? res.json() : res.text();
	}
}

export const api = new Api();

// Main entrypoint to call once on app load
export async function initApi() {
	await initSwaggerClient();
}
