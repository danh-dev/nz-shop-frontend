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

		{
			name: "user",
			path: "/user",
			redirect: () => {
				return { name: "user-home" };
			},
			component: () => import("../components/UserLayout.vue"),
			children: [
				{
					name: "user-home",
					path: "/user/home",
					component: () => import("../views/UserHome.vue"),
				},
				{
					name: "user-history",
					path: "/user/history",
					component: () => import("../views/UserHistory.vue"),
				},
				{
					name: "user-history-detail",
					path: "/user/history/detail/:code",
					component: () => import("../views/UserHistoryDetail.vue"),
				},
				{
					name: "user-promotion",
					path: "/user/promotion",
					component: () => import("../views/UserPromotion.vue"),
				},
				{
					name: "user-account",
					path: "/user/account",
					component: () => import("../views/UserAccount.vue"),
				},
				{
					name: "user-change-password",
					path: "/user/account/change-password",
					component: () => import("../views/UserPassword.vue"),
				},
			],
		},
	],
});

export default router;
