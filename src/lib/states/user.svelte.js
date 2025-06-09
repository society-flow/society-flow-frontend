class UserState {
	user = $state(null);
	token = $state(null);

	isAuth = $derived(!!this.token);
	isDemo = $derived(this.user?.email === 'demo@example.com');

	constructor() {
		if (typeof localStorage !== 'undefined') {
			const savedUser = localStorage.getItem('user');
			if (savedUser) {
				try {
					this.user = JSON.parse(savedUser);
				} catch (err) {
					localStorage.removeItem('user');
					throw err;
				}
			}
		}
	}
	setUser(user) {
		this.user = user;
		localStorage.setItem('user', JSON.stringify(user));
	}
	deleteUser() {
		this.user = null;
		localStorage.removeItem('user');
	}
	setToken(token) {
		this.token = token;
		localStorage.setItem('token', token);
	}
	deleteToken() {
		this.token = null;
		localStorage.removeItem('token');
	}
	logout() {
		this.deleteUser();
		this.deleteToken();
	}
	loginDemo() {
		this.setUser({
			id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
			email: 'demo@example.com',
			name: 'Demo User',
			createdAt: '2025-06-04T05:41:36.367Z',
			updatedAt: '2025-06-04T05:41:36.367Z'
		});
		this.setToken('1234abcd');
	}
}

export const userState = new UserState();
