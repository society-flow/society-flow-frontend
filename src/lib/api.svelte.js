import societies from '../content/societies.js';
import residences from '../content/residences.js';

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
				console.log('residence.id === id;', residence.id, id);
				return residence.id === id;
			});
		});
	}
}

const DATA = {
	'/societies': societies,
	'/residences': residences,
	'/expenses': []
};

const api = new Api();

export { api };
