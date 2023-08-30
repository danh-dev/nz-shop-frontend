import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import CKEditor from "@ckeditor/ckeditor5-vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { VueRecaptchaPlugin } from "vue-recaptcha";
import { createHead } from "@unhead/vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import * as labsComponents from 'vuetify/labs/components'
import App from "./App.vue";
import router from "./router/index";

// Vuetify
const vuetify = createVuetify({
	components: {
		...components,
		...labsComponents,
	},
	icons: {
		defaultSet: "mdi",
	},
	defaults: {},
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const head = createHead();

const app = createApp(App);
app.use(CKEditor);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(head);
app.use(VueRecaptchaPlugin, {
	v2SiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
});

app.config.globalProperties.formatPrice = value => {
	return parseFloat(value).toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

app.mount("#app");
