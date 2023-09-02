import { createRouter, createWebHistory } from "vue-router";
import visitorRoutes from "./visitorRoutes";
import adminRoutes from "./adminRoutes";
import axios from "../axiosComfig";
import { userData } from "@/stores/userData";

const isLogIn = async () => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		try {
			const response = await axios.get("isLogin");
			return response.data.check_value;
		} catch (error) {
			return true;
		}
	} else {
		return true;
	}
};

const isAdmin = async () => {
	if (await isLogIn()) {
		try {
			const response = await axios.get("isAdmin");
			return response.data.check_value;
		} catch (error) {
			return true;
		}
	}
	return true;
};

const routes = [
	{
		name: "Index",
		path: "/",
		component: () => import("../views/VisitorLayout.vue"),
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
	{
		name: "test",
		path: "/test",
		component: () => import("../views/test2.vue"),
	},
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from, next) => {
	if (!(await isLogIn())) {
		const userStore = userData();
		userStore.logout();
		localStorage.removeItem("accessToken");
	}
	if (to.meta.viewOf === "admin" && !(await isAdmin())) {
		//Protect admin area
		next({ path: "/" });
	} else if (to.meta.auth === "true" && (await isLogIn())) {
		// Protect login page
		next({ path: "/" });
	} else if (to.meta.auth === "login" && !(await isLogIn())) {
		//Request login
		next({ path: "login", query: { to: to.path !== "/" ? to.fullPath : undefined } });
	} else {
		next();
	}
});
export default router;
