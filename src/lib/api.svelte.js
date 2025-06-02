import societies from '../content/societies.js';
import residences from '../content/residences.js';
import expenses from '../content/expenses.js';
import adverts from '../content/adverts.js';

class Api {
	url = window.location.origin;

	fetch(endpoint) {
		return fetch(this.url).then(() => {
			return DATA[endpoint];
		});
	}

	getSocieties() {
		return this.fetch('/societies');
	}
	getSociety(id) {
		return this.fetch('/societies').then((societies) => {
			return societies.find((society) => {
				return society.id === id;
			});
		});
	}
	getResidences() {
		return this.fetch('/residences');
	}
	getResidence(id) {
		return this.fetch('/residences').then((residences) => {
			return residences.find((residence) => {
				return residence.id === id;
			});
		});
	}
	getExpenses() {
		return this.fetch('/expenses');
	}
	getExpense(id) {
		return this.fetch('/expenses').then((expenses) => {
			return expenses.find((expense) => {
				return expense.id === id;
			});
		});
	}
	getAdverts() {
		return this.fetch('/adverts');
	}
	getAdvert(id) {
		return this.fetch('/adverts').then((adverts) => {
			return adverts.find((advert) => {
				return advert.id === id;
			});
		});
	}
}

const DATA = {
	'/societies': societies,
	'/residences': residences,
	'/expenses': expenses,
	'/adverts': adverts
};

const api = new Api();

export { api };
