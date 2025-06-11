import Swagger from 'swagger-client';
import { userState } from '$lib/states/user.svelte.js';
import { DOCUMENT_TYPES as validLegalDocumentTypes } from '$lib/const/legal.js';
import { PUBLIC_API_URL } from '$env/static/public';

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

	// Residence endpoints
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

	async findResidenceByNameInSociety(societyid, residenceName) {
		const client = await this.getClient();
		const response = await client.apis.societies.findResidenceByNameInSociety({
			societyid,
			residenceName
		});
		return response.body;
	}

	async countResidencesInSociety(societyid) {
		const client = await this.getClient();
		const response = await client.apis.societies.countResidencesInSociety({
			societyId: societyid
		});
		return response.body;
	}

	async getResidenceUsers(residenceid) {
		const client = await this.getClient();
		const response = await client.apis.societies.getResidenceUsers({ residenceid });
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
			residenceid,
			userid
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

	// Legal endpoints - Updated to match OpenAPI spec
	async getTermsOfService(locale = 'de') {
		const client = await this.getClient();
		const response = await client.apis.legal.getTermsOfService({ locale });
		return response.body;
	}

	async getPrivacyPolicy(locale = 'de') {
		const client = await this.getClient();
		const response = await client.apis.legal.getPrivacyPolicy({ locale });
		return response.body;
	}

	async getCookiePolicy(locale = 'en') {
		const client = await this.getClient();
		const response = await client.apis.legal.getCookiePolicy({ locale });
		return response.body;
	}

	async getDataProcessingInfo() {
		const client = await this.getClient();
		const response = await client.apis.legal.getDataProcessingInfo();
		return response.body;
	}

	// Legacy method - consider deprecating in favor of specific methods above
	async getLegal(legalDocumentType, lang = 'en') {
		if (!validLegalDocumentTypes.includes(legalDocumentType)) {
			throw new Error(
				`Invalid legal document type. Must be one of: ${validLegalDocumentTypes.join(', ')}`
			);
		}

		// Map to new specific methods
		switch (legalDocumentType) {
			case 'terms-of-service':
				return this.getTermsOfService(lang);
			case 'privacy-policy':
				return this.getPrivacyPolicy(lang);
			case 'cookie-policy':
				return this.getCookiePolicy(lang);
			case 'data-processing-info':
				return this.getDataProcessingInfo();
			default:
				throw new Error(`Unsupported legal document type: ${legalDocumentType}`);
		}
	}

	// GDPR endpoints - Fixed namespace
	async exportUserData() {
		const client = await this.getClient();
		const response = await client.apis.gdpr.exportUserData();
		return response.body;
	}

	async updateUserData(userData) {
		const client = await this.getClient();
		const response = await client.apis.gdpr.updateUserData({}, { requestBody: userData });
		return response.body;
	}

	async createDataRequest(requestType) {
		const client = await this.getClient();
		const response = await client.apis.gdpr.createDataRequest({ requestType });
		return response.body;
	}

	async deleteUserAccount(deleteCompletely = false) {
		const client = await this.getClient();
		const response = await client.apis.gdpr.deleteUserAccount({ deleteCompletely });
		return response.body;
	}

	// Error handling wrapper - Consider adding this to all methods
	async _handleApiCall(apiCall) {
		try {
			return await apiCall();
		} catch (error) {
			console.error('API call failed:', error);
			// Handle specific error cases based on status codes
			if (error.status === 401) {
				this.logout();
				throw new Error('Authentication required');
			}
			throw error;
		}
	}
}

export const api = new Api();

// Main entrypoint to call once on app load
export async function initApi() {
	await initSwaggerClient();
}
