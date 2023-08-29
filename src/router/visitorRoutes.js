import HomePage from "@/views/HomePage.vue";
import CategoryPage from "@/views/CategoryPage.vue";
import TrackingPage from "@/views/TrackingPage.vue";

const routes = [
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
        name: "tracking",
        path: "/tracking",
        component: TrackingPage,
    },
    {
        path: "",
        name: "index-page",
        component: () => import("../views/Index.vue"),
    },
    {
        path: "login",
        name: "login-page",
        meta: { auth: "true" },
        component: () => import("../views/Login.vue"),
    },
    {
        path: "register",
        name: "register-page",
        meta: { auth: "true" },
        component: () => import("../views/Register.vue"),
    },
    // Cart feature
    {
        path: "cart",
        name: "cart-page",
        component: () => import("../views/cart/Cart.vue"),
    },
    {
        path: "checkout",
        name: "checkout-page",
        meta: { auth: "login" },
        component: () => import("../views/cart/CheckOut.vue"),
    },
    {
        path: ":pathMatch(.*)*",
        component: () => import("../views/404.vue"),
    }
];

export default routes;
