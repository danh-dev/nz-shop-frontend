import { createRouter, createWebHistory } from "vue-router";
import ProductPage from "../views/ProductPage.vue";
import NewsList from "../views/NewsList.vue";
import NewsPage from "../views/NewsPage.vue";
import PageList from "../views/PageList.vue";
import PageDetail from "../views/PageDetail.vue";

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
			path: "/:productName",
			component: ProductPage,
		},
		// News router
		{
			path: "/news",
			component: NewsList,
		},
		{
			path: "/news/:title",
			component: NewsPage,
		},
		// page router
		{
			path: "/page",
			component: PageList,
		},
		{
			path: "/page/:name",
			component: PageDetail,
		},
	],
});

export default router;
