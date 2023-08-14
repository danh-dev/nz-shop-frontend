import { createRouter, createWebHistory } from "vue-router";

import HomePage from "../views/HomePage.vue";
import CategoryPage from "../views/CategoryPage.vue";
import ProductPage from "../views/ProductPage.vue";
import NewsPage from "../views/NewsPage.vue";
import RegisterPage from "../views/RegisterPage.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			name: "home",
			path: "/",
			component: HomePage,
		},
		{
			name: "categories",
			path: "/categories/:slugs+",
			component: CategoryPage,

		},
		{
			name: "product",
			path: "/:slug",
			component: ProductPage
		},
		{
			name: "news",
			path: "/news",
			component: NewsPage,
		},
		{
			name: "",
			path: "/news/:slug",
			component: NewsPage,
		},
		{
			name: "register",
			path: "/register",
			component: RegisterPage,
		},
	],
});

export default router;
