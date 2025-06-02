class UserState {
	user = $state(null);
	isAuth = $derived(!!this.user);

	constructor() {
		if (typeof localStorage !== 'undefined') {
			const savedUser = localStorage.getItem('user');
			if (savedUser) {
				this.user = JSON.parse(savedUser);
			}
		}
	}

	login(user) {
		this.user = user;
		localStorage.setItem('user', JSON.stringify(this.user));
	}

	logout() {
		this.user = null;
		localStorage.removeItem('user');
	}
}

export const userState = new UserState();
