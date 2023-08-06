import { createRouter, createWebHistory } from "vue-router";
import products from "./products.js";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [{
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
		},
	...products,
	],
});

export default router;
