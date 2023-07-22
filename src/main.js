<<<<<<< HEAD
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
=======
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
>>>>>>> 2e31b4ded6198b2c3cf18989fa1d4120327a63c7
