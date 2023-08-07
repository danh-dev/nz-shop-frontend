import { createRouter, createWebHistory } from "vue-router";
import products from "./products.js";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: "home",
			path: "/",
			component: () => import("../views/testhome.vue"),
		},
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
	...products,
	],
});

export default router;
