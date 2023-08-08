import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

import { createApp } from "vue";
import { createPinia } from "pinia";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";

import App from "./App.vue";
import router from "./router";

// Vuetify
const vuetify = createVuetify({
	icons: {
		defaultSet: "mdi", // This is already the default value - only for display purposes
	},
	defaults: {}
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
