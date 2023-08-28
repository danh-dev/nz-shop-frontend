// import { createRouter, createWebHistory } from "vue-router";
import ProductPage from "../views/ProductPage.vue";
import NewsList from "../views/post/NewsList.vue";
import NewsPage from "../views/post/NewsPage.vue";
import PageDetail from "../views/page/PageDetail.vue";

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
    {
        path: ':pathMatch(.*)*',
        component: () => import('../views/404.vue'),
    },
    // Product router
    {
        path: "/:name",
        component: ProductPage,
    },
    // News router
    {
        path: "/news",
        component: NewsList,
    },
    {
        path: "/news/:title",
        component: NewsPage,
    },
    // page router
    // {
    //     path: "/page",
    //     component: PageList,
    // },
    {
        path: "/page/:name",
        component: PageDetail,
    },

];

export default routes;
