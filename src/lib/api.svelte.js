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
		swaggerClient = await Swagger(`${PUBLIC_API_URL}/api-docs`);
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
		const bearerAuth = userState?.token;
		if (bearerAuth) {
			client.spec.securityDefinitions = {
				bearerAuth: {
					type: 'apiKey',
					name: 'Authorization',
					in: 'header'
				}
			};
			client.authorizations = { bearerAuth };
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

	// Society API endpoints
	async getAllSocieties() {
		const client = await this.getClient();
		const response = await client.apis.societies.getAllSocieties();
		return response.body;
	}

	async getSocietyById(id) {
		const client = await this.getClient();
		const response = await client.apis.societies.getSocietyById({ id });
		return response.body;
	}

	async createOrUpdateSociety(societyData) {
		const client = await this.getClient();
		const response = await client.apis.societies.createOrUpdateSociety(
			{},
			{ requestBody: societyData }
		);
		return response.body;
	}

	async findSocietyByNameAndLocation({ name, city, state, country }) {
		const client = await this.getClient();
		const response = await client.apis.societies.findSocietyByNameAndLocation({
			name,
			city,
			state,
			country
		});
		return response.body;
	}

	async getUserSocieties(userId) {
		const client = await this.getClient();
		const response = await client.apis.societies.getUserSocieties({ userId });
		return response.body;
	}

	async getSocietyUsers(societyId) {
		const client = await this.getClient();
		const response = await client.apis.societies.getSocietyUsers({ societyId });
		return response.body;
	}

	async assignUserToSociety(assignmentData) {
		const client = await this.getClient();
		const response = await client.apis.societies.assignUserToSociety(
			{},
			{ requestBody: assignmentData }
		);
		return response.body;
	}

	async removeUserFromSociety(societyId, userId) {
		const client = await this.getClient();
		const response = await client.apis.societies.removeUserFromSociety({
			societyId,
			userId
		});
		return response.body;
	}

	async getUserRoleInSociety(societyId, userId) {
		const client = await this.getClient();
		const response = await client.apis.societies.getUserRoleInSociety({
			societyId,
			userId
		});
		return response.body;
	}

	// Residence endpoints related to societies
	async getAllResidencesInSociety(societyId) {
		const client = await this.getClient();
		const response = await client.apis.societies.getAllResidencesInSociety({
			societyId
		});
		return response.body;
	}

	async createOrUpdateResidence(residenceData) {
		const client = await this.getClient();
		const response = await client.apis.societies.createOrUpdateResidence(
			{},
			{ requestBody: residenceData }
		);
		return response.body;
	}

	async getResidenceById(id) {
		const client = await this.getClient();
		const response = await client.apis.societies.getResidenceById({ id });
		return response.body;
	}

	async getUserResidencesInSociety(societyId, userId) {
		const client = await this.getClient();
		const response = await client.apis.societies.getUserResidencesInSociety({
			societyId,
			userId
		});
		return response.body;
	}

	async getUserResidences(userId) {
		const client = await this.getClient();
		const response = await client.apis.societies.getUserResidences({ userId });
		return response.body;
	}

	async findResidenceByNameInSociety(societyId, residenceName) {
		const client = await this.getClient();
		const response = await client.apis.societies.findResidenceByNameInSociety({
			societyId,
			residenceName
		});
		return response.body;
	}

	async countResidencesInSociety(societyId) {
		const client = await this.getClient();
		const response = await client.apis.societies.countResidencesInSociety({
			societyId
		});
		return response.body;
	}

	async getResidenceUsers(residenceId) {
		const client = await this.getClient();
		const response = await client.apis.societies.getResidenceUsers({ residenceId });
		return response.body;
	}

	async assignUserToResidence(assignmentData) {
		const client = await this.getClient();
		const response = await client.apis.societies.assignUserToResidence(
			{},
			{ requestBody: assignmentData }
		);
		return response.body;
	}

	async removeUserFromResidence(residenceId, userId) {
		const client = await this.getClient();
		const response = await client.apis.societies.removeUserFromResidence({
			residenceId,
			userId
		});
		return response.body;
	}

	async isUserInResidence(residenceId, userId) {
		const client = await this.getClient();
		const response = await client.apis.societies.isUserInResidence({
			residenceId,
			userId
		});
		return response.body;
	}

	// Auth methods
	logout() {
		userState.logout();
	}
	async login({ email }) {
		const client = await this.getClient();
		return client.apis.users.login({}, { requestBody: { email } });
	}
	async register({ email, name }) {
		const client = await this.getClient();
		return client.apis.users.createUser({}, { requestBody: { name, email } });
	}
	async verifyOtp({ email, otp }) {
		const client = await this.getClient();
		const res = await client.apis.users.verifyOtp({}, { requestBody: { email, otp } });
		userState.setToken(res.body.token);
		return res;
	}
	async getUserByEmail(email = userState?.user?.email) {
		const client = await this.getClient();
		return client.apis.users.getUserByEmail({ email });
	}
	async getUser() {
		const client = await this.getClient();
		return client.apis.users.getUser().then((res) => res.body);
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

	// GDPR endpoints
	async exportUserData() {
		const client = await this.getClient();
		const response = await client.apis['GDPR Controller'].exportUserData();
		return response.body;
	}

	async updateUserData(userData) {
		const client = await this.getClient();
		const response = await client.apis['GDPR Controller'].updateUserData(
			{},
			{ requestBody: userData }
		);
		return response.body;
	}

	async createDataRequest(requestType) {
		const client = await this.getClient();
		const response = await client.apis['GDPR Controller'].createDataRequest({ requestType });
		return response.body;
	}

	async deleteUserAccount(deleteCompletely = false) {
		const client = await this.getClient();
		const response = await client.apis['GDPR Controller'].deleteUserAccount({ deleteCompletely });
		return response.body;
	}
}

export const api = new Api();

// Main entrypoint to call once on app load
export async function initApi() {
	await initSwaggerClient();
}
