import { createRouter, createWebHistory } from "vue-router";
import ProductDetailPage from "../views/ProductDetailPage.vue";
import NewsPage from "../views/NewsPage.vue";
import NewsDetailPage from "../views/NewsDetailPage.vue";

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
			path: "/home/:productName",
			component: ProductDetailPage,
		},
		// News router
		{
			path: "/news",
			component: NewsPage,
		},
		{
			path: "/news/:newsName",
			component: NewsDetailPage,
		},
		],
});

export default router;
