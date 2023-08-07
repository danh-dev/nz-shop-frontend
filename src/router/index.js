import { createRouter, createWebHistory } from "vue-router";
import products from "./products.js";
import admin from "./admin.js";
import news from "./new.js";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		
		...products, ...admin, ...news],
});

export default router;
