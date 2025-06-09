class UserState {
	user = $state(this.load('user', null));
	token = $state(this.load('token', null));
	settings = $state(this.load('settings', {}));

	isAuth = $derived(!!this.token);
	isDemo = $derived(this.user?.email === 'demo@example.com');

	// ---------- Persistence helpers ----------
	load(key, fallback) {
		if (typeof localStorage === 'undefined') return fallback;
		try {
			const value = localStorage.getItem(key);
			return value ? JSON.parse(value) : fallback;
		} catch {
			localStorage.removeItem(key);
			return fallback;
		}
	}

	save(key, value) {
		if (typeof localStorage === 'undefined') return;
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch {}
	}

	remove(key) {
		if (typeof localStorage === 'undefined') return;
		localStorage.removeItem(key);
	}

	// ---------- User methods ----------
	setUser(user) {
		this.user = user;
		this.save('user', user);
	}

	deleteUser() {
		this.user = null;
		this.remove('user');
	}

	// ---------- Token methods ----------
	setToken(token) {
		this.token = token;
		this.save('token', token);
	}

	deleteToken() {
		this.token = null;
		this.remove('token');
	}

	// ---------- Settings methods ----------
	setSettings(settings) {
		this.settings = settings;
		this.save('settings', settings);
	}

	deleteSettings() {
		this.settings = {};
		this.remove('settings');
	}

	// ---------- Session control ----------
	logout() {
		this.deleteUser();
		this.deleteToken();
		this.deleteSettings();
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
		this.setSettings({ theme: 'dark', lang: 'en' }); // optional demo settings
	}
}

export const userState = new UserState();
