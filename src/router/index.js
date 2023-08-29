import { createRouter, createWebHistory } from "vue-router";

import visitorRoutes from "./visitorRoutes";
import adminRoutes from "./adminRoutes";

const isLogIn = () => !!localStorage.getItem("accessToken");
const isAdmin = () => {
	//Api check admin
	return true;
};

const routes = [
	{
		name: "Index",
		path: "/",
		component: () => import("../views/visitorLayout.vue"),
		meta: { viewOf: "visitor" },
		children: [...visitorRoutes],
	},
	{
		name: "Admin",
		path: "/admincp",
		component: () => import("../views/adminLayout.vue"),
		meta: { viewOf: "admin" },
		children: [...adminRoutes],
	},
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});
router.beforeEach((to, from, next) => {
	if (to.meta.viewOf === "admin" && !isAdmin()) {
		//Protect admin area
		next({ path: "/" });
	} else if (to.meta.auth === "true" && isLogIn()) {
		// Protect login page
		next({ path: "/" });
	} else if (to.meta.auth === "login" && !isLogIn()) {
		//Request login
		next({ path: "login", query: { to: to.path !== "/" ? to.fullPath : undefined } });
	} else {
		next();
	}
});
export default router;
