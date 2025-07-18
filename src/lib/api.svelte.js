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
				bearerAuth: { type: 'apiKey', name: 'Authorization', in: 'header' }
			};
			client.authorizations = { bearerAuth };
		}
		return client;
	}

	// --- Societies & Residences ---
	async getAllSocieties() {
		const client = await this.getClient();
		const res = await client.apis.societies.getAllSocieties();
		return res.body;
	}
	async getSocietyById(id) {
		const client = await this.getClient();
		const res = await client.apis.societies.getSocietyById({ id });
		return res.body;
	}
	async createOrUpdateSociety(societyData) {
		const client = await this.getClient();
		const res = await client.apis.societies.createOrUpdateSociety({}, { requestBody: societyData });
		return res.body;
	}
	async findSocietyByNameAndLocation({ name, city, state, country }) {
		const client = await this.getClient();
		const res = await client.apis.societies.findSocietyByNameAndLocation({
			name,
			city,
			state,
			country
		});
		return res.body;
	}
	async getUserSocieties(userId = userState.user?.id) {
		const client = await this.getClient();
		const res = await client.apis.societies.getUserSocieties({ userId });
		return res.body.map(({ society, role }) => ({ ...society, role }));
	}
	async getSocietyUsers(societyId) {
		const client = await this.getClient();
		const res = await client.apis.societies.getSocietyUsers({ societyId });
		return res.body.map(({ user, role }) => ({ ...user, role }));
	}
	async assignUserToSociety({ societyId, userId, role }) {
		const client = await this.getClient();
		const res = await client.apis.societies.assignUserToSociety(
			{},
			{ requestBody: { societyId, userId, role } }
		);
		return res.body;
	}
	async assignUserWithEmailNameRoleToSociety({ societyId, userId, role, email }) {
		const client = await this.getClient();
		const res = await client.apis.societies.assignUserToSociety(
			{},
			{ requestBody: { societyId, userId, role, email } }
		);
		return res.body;
	}
	async removeUserFromSociety(societyId, userId) {
		const client = await this.getClient();
		const res = await client.apis.societies.removeUserFromSociety({ societyId, userId });
		return res.body;
	}
	async getUserRoleInSociety(societyId, userId) {
		const client = await this.getClient();
		const res = await client.apis.societies.getUserRoleInSociety({ societyId, userId });
		return res.body;
	}

	async getAllResidencesInSociety(societyId) {
		const client = await this.getClient();
		const res = await client.apis.societies.getAllResidencesInSociety({ societyId });
		return res.body;
	}
	async createOrUpdateResidence(residenceData) {
		const client = await this.getClient();
		const res = await client.apis.societies.createOrUpdateResidence(
			{},
			{ requestBody: residenceData }
		);
		return res.body;
	}

	async getResidenceById(id) {
		const client = await this.getClient();
		const res = await client.apis.societies.getResidenceById({ id });
		return res.body;
	}
	async getUserResidencesInSociety(societyId, userId) {
		const client = await this.getClient();
		const res = await client.apis.societies.getUserResidencesInSociety({ societyId, userId });
		return res.body;
	}
	
	// Get all residences in a society
	async getAllResidencesInSociety(societyId) {
		const client = await this.getClient();
		const res = await client.apis.societies.getAllResidencesInSociety({ societyId });
		return res.body;
	}
	async getUserResidences(userId) {
		const client = await this.getClient();
		const res = await client.apis.societies.getUserResidences({ userId });
		return res.body;
	}
	async findResidenceByNameInSociety(societyId, residenceName) {
		const client = await this.getClient();
		const res = await client.apis.societies.findResidenceByNameInSociety({
			societyId,
			residenceName
		});
		return res.body;
	}
	async countResidencesInSociety(societyId) {
		const client = await this.getClient();
		const res = await client.apis.societies.countResidencesInSociety({ societyId });
		return res.body;
	}
	async getResidenceUsers(residenceId) {
		const client = await this.getClient();
		const res = await client.apis.societies.getResidenceUsers({ residenceId });
		return res.body;
	}
	async assignUserWithEmailNameToResidence({ residenceId, email, name }) {
		const client = await this.getClient();
		const res = await client.apis.societies.assignUserWithEmailNameToResidence(
			{},
			{ requestBody: { residenceId, email, name } }
		);
		return res.body;
	}
	async assignUserToResidence(assignmentData) {
		const client = await this.getClient();
		const res = await client.apis.societies.assignOrUpdateUserToResidence(
			{},
			{ requestBody: assignmentData }
		);
		return res.body;
	}
	async removeUserFromResidence(residenceId, userId) {
		const client = await this.getClient();
		const res = await client.apis.societies.removeUserFromResidence({ residenceId, userId });
		return res.body;
	}
	async isUserInResidence(residenceId, userId) {
		const client = await this.getClient();
		const res = await client.apis.societies.isUserInResidence({ residenceId, userId });
		return res.body;
	}

	// --- Maintenances ---
	async triggerSocietyMaintenanceCalculation(societyId, yearMonth) {
		const client = await this.getClient();
		const res = await client.apis.maintenances.triggerSocietyMaintenanceCalculation({
			societyId,
			yearMonth
		});
		return res.body;
	}

	async getAllMaintenances(societyId, residenceId) {
		const client = await this.getClient();
		const res = await client.apis.maintenances.getAllMaintenances({ societyId, residenceId });
		return res.body;
	}

	async getLatestActiveMaintenance(societyId, residenceId) {
		const client = await this.getClient();
		const res = await client.apis.maintenances.getLatestActiveMaintenance({
			societyId,
			residenceId
		});
		return res.body;
	}

	async getAllMaintenancesFromYearMonth(societyId, residenceId, fromYearMonth) {
		const client = await this.getClient();
		const res = await client.apis.maintenances.getAllMaintenancesFromYearMonth({
			societyId,
			residenceId,
			fromYearMonth
		});
		return res.body;
	}


	async getMaintenanceByYearMonth(societyId, residenceId, yearMonth) {
		const client = await this.getClient();
		const res = await client.apis.maintenances.getMaintenanceByYearMonth({
			societyId,
			residenceId,
			yearMonth
		});
		return res.body;
	}

	// --- Users & Auth ---
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
	async getUserByEmail(email = userState.user?.email) {
		const client = await this.getClient();
		const res = await client.apis.users.getUserByEmail({ email });
		return res.body;
	}
	async getUser() {
		const client = await this.getClient();
		const res = await client.apis.users.getUser();
		return res.body;
	}

	// --- Legal ---
	async getTermsOfService(locale = 'de') {
		const client = await this.getClient();
		const res = await client.apis.legal.getTermsOfService({ locale });
		return res.body;
	}
	async getPrivacyPolicy(locale = 'de') {
		const client = await this.getClient();
		const res = await client.apis.legal.getPrivacyPolicy({ locale });
		return res.body;
	}
	async getCookiePolicy(locale = 'en') {
		const client = await this.getClient();
		const res = await client.apis.legal.getCookiePolicy({ locale });
		return res.body;
	}
	async getDataProcessingInfo() {
		const client = await this.getClient();
		const res = await client.apis.legal.getDataProcessingInfo();
		return res.body;
	}
	async getLegal(type, lang = 'en') {
		if (!validLegalDocumentTypes.includes(type))
			throw new Error(`Invalid legal document type: ${type}`);
		switch (type) {
			case 'terms-of-service':
				return this.getTermsOfService(lang);
			case 'privacy-policy':
				return this.getPrivacyPolicy(lang);
			case 'cookie-policy':
				return this.getCookiePolicy(lang);
			case 'data-processing-info':
				return this.getDataProcessingInfo();
			default:
				throw new Error(`Unsupported legal document type: ${type}`);
		}
	}

	// --- GDPR ---
	async exportUserData() {
		const client = await this.getClient();
		const res = await client.apis.gdpr.exportUserData();
		return res.body;
	}
	async updateUserData(userData) {
		const client = await this.getClient();
		const res = await client.apis.gdpr.updateUserData({}, { requestBody: userData });
		return res.body;
	}
	async createDataRequest(requestType) {
		const client = await this.getClient();
		const res = await client.apis.gdpr.createDataRequest({ requestType });
		return res.body;
	}
	async deleteUserAccount(deleteCompletely = false) {
		const client = await this.getClient();
		const res = await client.apis.gdpr.deleteUserAccount({ deleteCompletely });
		return res.body;
	}

	// --- Finances ---
    async getSocietyFundBySocietyId(societyId) {
        const client = await this.getClient();
        const res = await client.apis.funds.getSocietyFundBySocietyId({ societyId });
        return res.body;
    }
    /**
     * Retrieve a maintenance by its ID.
     */
    async getMaintenanceById(id) {
        const client = await this.getClient();
        const res = await client.apis.maintenances.getMaintenanceById({ id });
        return res.body;
    }
    /**
     * Create or update a maintenance record.
     */
    async createOrUpdateMaintenance(maintenanceData) {
        const client = await this.getClient();
        const res = await client.apis.maintenances.createOrUpdateMaintenance({}, { requestBody: maintenanceData });
        return res.body;
    }
    async getResidenceFundByResidenceId(residenceId) {
        const client = await this.getClient();
        const res = await client.apis.funds.getResidenceFundByResidenceId({ residenceId });
        return res.body;
    }
	async getAllExpensesBySociety(societyId) {
		const client = await this.getClient();
		const res = await client.apis.expenses.getAllExpensesBySociety({ societyId });
		return res.body;
	}
	async getExpenseById(id) {
		const client = await this.getClient();
		const res = await client.apis.expenses.getExpenseById({ id });
		return res.body;
	}
	async createOrUpdateExpense(expenseData) {
		const client = await this.getClient();
		const res = await client.apis.expenses.createOrUpdateExpense({}, { requestBody: expenseData });
		return res.body;
	}
	async getAllExpenseDistributionsByExpenseId(expenseId) {
		const client = await this.getClient();
		const res = await client.apis.expenses.getAllExpenseDistributionsByExpenseId({ expenseId });
		return res.body;
	}
	async createOrUpdateExpenseDistribution(distributionData) {
		const client = await this.getClient();
		const res = await client.apis.expenses.createOrUpdateExpenseDistribution(
			{},
			{ requestBody: distributionData }
		);
		return res.body;
	}
    async triggerCalculationForSociety(societyId, yearMonth) {
        const client = await this.getClient();
        const res = await client.apis.calculations.triggerCalculationForSociety({ societyId, yearMonth });
        return res.body;
    }
	async getAllCalculationsByExpense(expenseId) {
		const client = await this.getClient();
		const res = await client.apis.calculations.getAllCalculationsByExpense({ expenseId });
		return res.body;
	}
	async getAllCalculationsByExpenseYearMonth(expenseId, yearMonth) {
		const client = await this.getClient();
		const res = await client.apis.calculations.getAllCalculationsByExpenseYearMonth({
			expenseId,
			yearMonth
		});
		return res.body;
	}
	async isCalculationForExpenseYearMonthUpdatable(expenseId, yearMonth) {
		const client = await this.getClient();
		const res = await client.apis.calculations.isCalculationForExpenseYearMonthUpdatable({
			expenseId,
			yearMonth
		});
		return res.body;
	}
	async getCalculationByExpenseYearMonthResidence(expenseId, yearMonth, residenceId) {
		const client = await this.getClient();
		const res = await client.apis.calculations.getCalculationByExpenseYearMonthResidence({
			expenseId,
			yearMonth,
			residenceId
		});
		return res.body;
	}
	async getAllCalculationsByExpenseFromYearMonth(expenseId, fromYearMonth) {
		const client = await this.getClient();
		const res = await client.apis.calculations.getAllCalculationsByExpenseFromYearMonth({
			expenseId,
			fromYearMonth
		});
		return res.body;
	}

	// --- Expense Payments ---
	async createExpensePayment(paymentData) {
		const client = await this.getClient();
		const res = await client.apis.payments.addExpensePayment({}, { requestBody: paymentData });
		return res.body;
	}
	async getExpensePaymentsByExpenseId(expenseId) {
		const client = await this.getClient();
		const res = await client.apis.payments.getAllPaymentsForExpense({ expenseId });
		return res.body;
	}

	// --- Maintenance Payments ---
	async createMaintenancePayment(paymentData) {
		const client = await this.getClient();
		const res = await client.apis.payments.addMaintenancePayment({}, { requestBody: paymentData });
		return res.body;
	}
	async getMaintenancePaymentsByMaintenanceId(maintenanceId) {
		const client = await this.getClient();
		const res = await client.apis.payments.getAllPaymentsForMaintenance({ maintenanceId });
		return res.body;
	}
	async getMaintenancePaymentsByResidenceId(residenceId) {
		const client = await this.getClient();
		const res = await client.apis.payments.getAllMaintenancePaymentsForResidence({ residenceId });
		return res.body;
	}


	// --- Advertisings ---
	async getAllAdvertisements(requestBody = {}) {
		const client = await this.getClient();
		const res = await client.apis.advertisings.getAllAdvertisements({}, { requestBody });
		return res.body;
	}
	async getAdvertisementById(id) {
		const client = await this.getClient();
		const res = await client.apis.advertisings.getAdvertisementById({ id });
		return res.body;
	}
	async getAdvertisementsByUserId(userId, isActive = true) {
		const client = await this.getClient();
		const res = await client.apis.advertisings.getAllAdvertisements(
			{},
			{ requestBody: { userId, isActive } }
		);
		return res.body;
	}
	async getAdvertisementsBySocietyId(societyId, isActive = true) {
		const client = await this.getClient();
		const res = await client.apis.advertisings.getAllAdvertisements(
			{},
			{ requestBody: { societyId, isActive } }
		);
		return res.body;
	}
	async createAdvertisement(adData) {
		const client = await this.getClient();
		const res = await client.apis.advertisings.createAdvertisement({}, { requestBody: adData });
		return res.body;
	}
	async updateAdvertisement(id, adData) {
		const client = await this.getClient();
		const res = await client.apis.advertisings.updateAdvertisement({ id }, { requestBody: adData });
		return res.body;
	}
	async deleteAdvertisement(id) {
		const client = await this.getClient();
		const res = await client.apis.advertisings.deleteAdvertisement({ id });
		return res.body;
	}
	async getActiveAdvertisements() {
		const client = await this.getClient();
		const res = await client.apis.advertisings.getActiveAdvertisements();
		return res.body;
	}
	async getAllAdTypes() {
		const client = await this.getClient();
		const res = await client.apis.advertisings.getAllAdTypes();
		return res.body;
	}
	async getAdTypeById(id) {
		const client = await this.getClient();
		const res = await client.apis.advertisings.getAdTypeById({ id });
		return res.body;
	}

	// --- Invitations ---
	// Create a new invitation
	async createInvitation(invitationData) {
		const client = await this.getClient();
		const res = await client.apis.invitations.createInvitation({}, { requestBody: invitationData });
		return res.body;
	}
	
	// Get invitation by ID
	async getInvitationById(id) {
		const client = await this.getClient();
		const res = await client.apis.invitations.getInvitationById({ id });
		return res.body;
	}
	
	// Get my received invitations
	async getMyInvitations() {
		const client = await this.getClient();
		const res = await client.apis.invitations.getMyInvitations();
		return res.body;
	}
	
	// Get my sent invitations
	async getSentInvitations() {
		const client = await this.getClient();
		const res = await client.apis.invitations.getSentInvitations();
		return res.body;
	}
	
	// Get invitations for a society
	async getSocietyInvitations(societyId) {
		const client = await this.getClient();
		const res = await client.apis.invitations.getSocietyInvitations({ societyId });
		return res.body;
	}
	
	// Accept an invitation
	async acceptInvitation(id) {
		const client = await this.getClient();
		const res = await client.apis.invitations.acceptInvitation({ id }, {});
		return res.body;
	}
	
	// Decline an invitation
	async declineInvitation(id) {
		const client = await this.getClient();
		const res = await client.apis.invitations.declineInvitation({ id }, {});
		return res.body;
	}
	
	// Cancel an invitation
	async cancelInvitation(id) {
		const client = await this.getClient();
		const res = await client.apis.invitations.cancelInvitation({ id });
		return res.body;
	}

	// --- Messages ---
	async createMessage(messageData) {
		const client = await this.getClient();
		const res = await client.apis.messaging.createMessage({}, { requestBody: messageData });
		return res.body;
	}

	async updateMessage(messageData) {
		const client = await this.getClient();
		const res = await client.apis.messaging.updateMessage({}, { requestBody: messageData });
		return res.body;
	}

	async deleteMessage(id) {
		const client = await this.getClient();
		const res = await client.apis.messaging.deleteMessage({ id });
		return res.body;
	}

	async getMessageById(id) {
		const client = await this.getClient();
		const res = await client.apis.messaging.getMessageById({ id });
		return res.body;
	}

	async searchMessages(searchData) {
		const client = await this.getClient();
		const res = await client.apis.messaging.searchMessages({}, { requestBody: searchData });
		return res.body;
	}

	async getSentMessages() {
		const client = await this.getClient();
		const res = await client.apis.messaging.getSentMessages();
		return res.body;
	}

	async getReceivedMessages() {
		const client = await this.getClient();
		const res = await client.apis.messaging.getReceivedMessages();
		return res.body;
	}

	async getUnreadMessages() {
		const client = await this.getClient();
		const res = await client.apis.messaging.getUnreadMessages();
		return res.body;
	}

	async getUnreadMessageCount() {
		const client = await this.getClient();
		const res = await client.apis.messaging.getUnreadMessageCount();
		return res.body;
	}

	async getThreadMessages(threadId) {
		const client = await this.getClient();
		const res = await client.apis.messaging.getMessagesByThread({ threadId });
		return res.body;
	}

	async interactWithMessage(messageId, interactionType) {
		const client = await this.getClient();
		const res = await client.apis.messaging.interactWithMessage({}, { 
			requestBody: { messageId, interactionType } 
		});
		return res.body;
	}

	async markMessageAsRead(messageId) {
		return this.interactWithMessage(messageId, 'MARK_READ');
	}

	async getSocietyMessages(societyId) {
		const client = await this.getClient();
		const searchData = { societyId };
		const res = await client.apis.messaging.searchMessages({}, { requestBody: searchData });
		return res.body;
	}

	async getResidenceMessages(residenceId) {
		const client = await this.getClient();
		const searchData = { residenceId };
		const res = await client.apis.messaging.searchMessages({}, { requestBody: searchData });
		return res.body;
	}

	async getAdMessages(adId) {
		const client = await this.getClient();
		const searchData = { adId };
		const res = await client.apis.messaging.searchMessages({}, { requestBody: searchData });
		return res.body;
	}

	// --- DELETE Methods ---
	// Delete society
	async deleteSociety(societyId) {
		const client = await this.getClient();
		const res = await client.apis.societies.deleteSociety({ societyId });
		return res.body;
	}

	// Remove user from society
	async removeUserFromSociety(societyId, userId) {
		const client = await this.getClient();
		const res = await client.apis.societies.removeUserFromSociety({ societyId, userId });
		return res.body;
	}

	// Delete residence
	async deleteResidence(residenceId) {
		const client = await this.getClient();
		const res = await client.apis.societies.deleteResidence({ residenceId });
		return res.body;
	}

	// Remove user from residence
	async removeUserFromResidence(residenceId, userId) {
		const client = await this.getClient();
		const res = await client.apis.societies.removeUserFromResidence({ residenceId, userId });
		return res.body;
	}

	// Delete expense
	async deleteExpense(expenseId) {
		const client = await this.getClient();
		const res = await client.apis.expenses.deleteExpense({ expenseId });
		return res.body;
	}

	// Delete expense distribution
	async deleteExpenseDistribution(distributionId) {
		const client = await this.getClient();
		const res = await client.apis.expenses.deleteExpenseDistribution({ distributionId });
		return res.body;
	}
}

export const api = new Api();

export async function initApi() {
	await initSwaggerClient();
	console.log('api client', swaggerClient);
}
