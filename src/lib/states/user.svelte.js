class UserState {
	user = $state(null);
	isAuth = $derived(!!this.user);

	login(user) {
		this.user = user;
	}
	logout() {
		this.user = null;
	}
}

const userState = new UserState();

export { userState };
