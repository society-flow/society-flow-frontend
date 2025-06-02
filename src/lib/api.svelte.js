import societies from '../content/societies.js';

class Api {
	url = window.location.origin;

	fetch(endpoint) {
		/* const url = this.url + endpoint; */
		/* console.log('url', url); */
		return fetch(this.url).then(() => {
			return DATA[endpoint];
		});
	}

	getSocieties() {
		console.log('society');
		return this.fetch('/societies');
	}
	getSociety(id) {
		return this.fetch('/societies').then((societies) => {
			const so = societies.find((society) => {
				console.log('society.id === id', society.id, id, society.id === id);
				return society.id === id;
			});
			console.log('so', so);
			return so;
		});
	}
}

const DATA = {
	'/societies': societies,
	'/residences': [],
	'/expenses': []
};

const api = new Api();

export { api };
