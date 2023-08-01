import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [{
		name: "home",
		path: "/",
		component: () => import('../views/ProductDetail.vue')
	},{
		name: "cart",
		path: "/cart",
		components: {
			default: () => import("../views/cart/Cart.vue"),
			child: () => import("../views/cart/CartTable.vue"),
		},
	},
		{
			name: "checkout",
			path: "/checkout",
			components: {
				default: () => import("../views/cart/Cart.vue"),
				child: () => import("../views/cart/CheckOut.vue"),
			},
		}
	],
});

export default router;
