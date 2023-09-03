import { createRouter, createWebHistory } from "vue-router";
import visitorRoutes from "./visitorRoutes";
import adminRoutes from "./adminRoutes";
import axios from "../axiosComfig";
<<<<<<< HEAD
import {siteData} from "@/stores/globals";


const routes = [
    {
        name: "Index",
        path: "/",
        component: () => import("../views/visitorLayout.vue"),
        meta: {viewOf: "visitor"},
        children: [...visitorRoutes],
    },
    {
        name: "Admin",
        path: `/${import.meta.env.VITE_ADMIN_CONTROL_PANEL||'admincp'}`,
        component: () => import("../views/adminLayout.vue"),
        meta: {viewOf: "admin"},
        children: [...adminRoutes],
    },
    {
        name: "test",
        path: "/test",
        component: () => import("../views/test.vue")
    },
    {
        name: "test2",
        path: "/test2",
        component: () => import("../views/test2.vue")
    }
=======
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
	}
>>>>>>> home-view
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from, next) => {
<<<<<<< HEAD
    const siteStore = siteData();
    const checkIsLoginFirstTime = async () => {
        const token = localStorage.getItem(import.meta.env.VITE_NAME_KEY_TOKEN || "accessToken");
        if (token) {
            try {
                const response = await axios.get("isLogin");
                siteStore.isLogin = response.data.isLogin;
            } catch (error) {
                siteStore.isLogin = false;
            }
        } else {
            siteStore.isLogin = false;
        }
    };
    const checkAdmin = async () => {
        try {
            const response = await axios.get("isAdmin");
            siteStore.isAdmin = response.data.isAdmin;
        } catch (error) {
            siteStore.isAdmin = false;
        }
    };
    if (typeof siteStore.isLogin === "undefined" || siteStore.isLogin === null) {
        console.log("run")
        await checkIsLoginFirstTime();
    }
    if (siteStore.isLogin && typeof siteStore.isAdmin === "undefined" || siteStore.isAdmin === null ) {
        console.log("run2")
        await checkAdmin();
    }
    if (to.meta.viewOf === "admin" && !siteStore.isAdmin) {
        //Protect admin area
        next({path: "/404.html"});
    } else if (to.meta.auth === "true" && siteStore.isLogin) {
        // Protect login page
        next({path: "/"});
    } else if (to.meta.auth === "login" && siteStore.isLogin) {
        //Request login
        next({path: "login", query: {to: to.path !== "/" ? to.fullPath : undefined}});
    } else {
        next();
    }
=======
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
>>>>>>> home-view
});
export default router;
