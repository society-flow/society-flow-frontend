class UserState {
	user = $state(null);
	isAuth = $derived(!!this.user?.id);

	constructor() {
		if (typeof localStorage !== 'undefined') {
			const savedUser = this.getStorageUser();
			if (savedUser) {
				this.user = savedUser;
			}
		}
	}

	login(user) {
		this.setUser(user);
	}

	logout() {
		this.user = null;
		this.deleteSotrageUser();
	}

	setUser(user) {
		this.user = user;
		localStorage.setItem('user', JSON.stringify(this.user));
	}
	getStorageUser() {
		const savedUser = localStorage.getItem('user');
		try {
			return JSON.parse(savedUser);
		} catch (err) {
			this.deleteStorageUser();
			throw err;
		}
	}
	deleteStorageUser() {
		localStorage.removeItem('user');
	}
}

export const userState = new UserState();
