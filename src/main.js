import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

import { createApp } from "vue";
import { createPinia } from "pinia";
// Axios
import axios from "axios";
window.axios = axios;
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";


import App from "./App.vue";
import router from "./router/index.js";

// Vuetify
const vuetify = createVuetify({
	icons: {
		defaultSet: "mdi",
	},
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

// chuyển đổi tiền tệ
app.config.globalProperties.formatPrice = (value) => {
	return parseFloat(value).toLocaleString("vi-VN", {"style": "currency", "currency": "VND"});
};

app.mount("#app");
