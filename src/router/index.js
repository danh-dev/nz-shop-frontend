import { createRouter, createWebHistory } from "vue-router";
import products from "./products.js";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [...products],
});

export default router;
