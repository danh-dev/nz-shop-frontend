import { createRouter, createWebHistory } from "vue-router";
import ProductPage from "../views/ProductPage.vue";
import NewsPage from "../views/NewsPage.vue";
import NewsDetail from "../views/NewsDetail.vue";
import admin from "./admin.js";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: "home",
			path: "/",
			component: () => import("../views/testhome.vue"),
		},
		// Cart router
		{
			name: "cart",
			path: "/cart",
			component: () => import("../views/cart/CartView.vue"),
		},
		{
			name: "checkout",
			path: "/checkout",
			component: () => import("../views/cart/CheckOut.vue"),
		},
		// Product router
		{
			path: "/home/Xiaomi-Redmi-Note-12-Pro",
			component: ProductPage,
		},
		// News router
		{
			path: "/news",
			component: NewsPage,
		},
		{
			path: "/news/:newsName",
			component: NewsDetail,
		},
		...admin],
});

export default router;
