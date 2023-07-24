import "./assets/base.css";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

import { createApp } from "vue";
import { createPinia } from "pinia";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import App from "./App.vue";
import router from "./router";

// Vuetify
const vuetify = createVuetify({
	components,
	directives,
	icons: {
		defaultSet: "mdi", // This is already the default value - only for display purposes
	},
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount("#app");
