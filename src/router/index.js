import { createRouter, createWebHistory } from "vue-router";
import visitorRoutes from "./visitorRoutes";
import adminRoutes from "./adminRoutes";
import axios from "../axiosComfig";
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
        name: "invoice-page",
        path: "/invoice/:code",
        component: () => import("../views/Invoice.vue")
    },
    {
        name: "test",
        path: "/test",
        component: () => import("../views/test.vue")
    }
];
const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from, next) => {
    const siteStore = siteData();
    await siteStore.fetchSettingSite()
    const checkIsLoginFirstTime = async () => {
        const token = localStorage.getItem(import.meta.env.VITE_NAME_KEY_TOKEN || "accessToken");
        if (token) {
            try {
                const response = await axios.get("isLogin");
                siteStore.isLogin = response.data.isLogin;
                if(response.data.status !== 'active'){
                    siteStore.isLogin = false;
                    localStorage.removeItem(import.meta.env.VITE_NAME_KEY_TOKEN || "accessToken")
                }
                if(!response.data.isLogin){
                    localStorage.removeItem(import.meta.env.VITE_NAME_KEY_TOKEN || "accessToken")
                }
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
        await checkIsLoginFirstTime();
    }
    if (siteStore.isLogin && typeof siteStore.isAdmin === "undefined" || siteStore.isAdmin === null ) {
        await checkAdmin();
    }
    if (to.meta.viewOf === "admin" && !siteStore.isAdmin) {
        //Protect admin area
        next({path: "/404"});
    } else if (to.meta.auth === "true" && siteStore.isLogin) {
        // Protect login page
        next({path: "/"});
    } else if (to.meta.auth === "login" && !siteStore.isLogin) {
        //Request login
        next({path: "login", query: {to: to.path !== "/" ? to.fullPath : undefined}});
    } else {
        next();
    }
});
export default router;
