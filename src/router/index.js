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
			path: "/",
			component: HomePage,
		},
		{
			path: "/:categorySlugs(.*)*",
			component: CategoryPage,
			children: {
				path: "/:productSlug",
				component: ProductPage
			}
		},
		{
			path: "/news/:newsName",
			component: NewsPage,
		},
		{
			path: "/register",
			component: RegisterPage,
		},
	],
});

export default router;
