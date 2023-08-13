import ProductDetailPage from "../views/ProductDetailPage.vue";
import NewsPage from "../views/NewsPage.vue";
import NewsDetailPage from "../views/NewsDetailPage.vue";

const routes = [
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
    // Product router
    {
        path: "/home/:productName",
        component: ProductDetailPage,
    },
    // News router
    {
        path: "/news",
        component: NewsPage,
    },
    {
        path: "/news/:newsName",
        component: NewsDetailPage,
    },
];

export default routes;
