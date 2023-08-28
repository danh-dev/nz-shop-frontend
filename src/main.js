import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import CKEditor from "@ckeditor/ckeditor5-vue";
import { VueRecaptchaPlugin } from "vue-recaptcha";
import { createHead } from "@unhead/vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import router from "./router/index.js";
import App from "./App.vue";

// Vuetify
const vuetify = createVuetify({
	icons: {
		defaultSet: "mdi",
	},
	defaults: {}
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const head = createHead();

const app = createApp(App);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(head);
app.use(VueRecaptchaPlugin, {
	v2SiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
});
app.use(CKEditor);

app.config.globalProperties.formatPrice = (value) => {
	return parseFloat(value).toLocaleString("vi-VN", { "style": "currency", "currency": "VND" });
};

app.mount("#app");
