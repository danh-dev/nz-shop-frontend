import { defineStore } from "pinia";

export const userData = defineStore("userData", {
	state: () => ({
		id: null,
		// eslint-disable-next-line camelcase
		full_name: null,
		email: null,
		// eslint-disable-next-line camelcase
		phone_number: null,
		token: null,
	}),
	actions: {
		setUserDetails(res) {
			this.$state.id = res.user.id;
			this.$state.full_name = res.user.full_name;
			this.$state.email = res.user.email;
			this.$state.phone_number = res.user.phone_number;
		},
		logout() {
			this.$state.id = null;
			this.$state.full_name = null;
			this.$state.email = null;
			this.$state.phone_number = null;
		},
	},
	persist: true,
});
