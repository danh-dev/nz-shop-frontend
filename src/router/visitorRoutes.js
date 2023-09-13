// import { createRouter, createWebHistory } from "vue-router";
import ProductPage from "../views/ProductPage.vue";
import NewsList from "../views/post/NewsList.vue";
import NewsPage from "../views/post/NewsPage.vue";
import PageDetail from "../views/page/PageDetail.vue";

const routes = [
    // 	Long
    {
        path: "",
        name: "home",
        component: () => import("../views/HomePage.vue"),
    },
    {
        name: "categories",
        path: "/danh-muc/:slugs+",
        component: () => import("../views/CategoryPage.vue"),
    },
    {
        name: "search",
        path: "/tim-kiem",
        component: () => import("../views/CategoryPage.vue"),
    },
    // Danh
    {
        name: "404",
        path: ":pathMatch(.*)*",
        redirect: () => {
            return {name: "page-404"};
        },
    },
    {
        name: "page-404",
        path: "/404",
        component: () => import("../views/404.vue")
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
    {
        path: "cart",
        name: "cart-page",
        component: () => import("../views/cart/Cart.vue"),
    },
    {
        path: "checkout",
        name: "checkout-page",
        component: () => import("../views/cart/CheckOut.vue"),
    },
    {
        path: "verify-email",
        name: "verify-email-page",
        component: () => import("../views/Verify.vue"),
    },
    {
        path: "forgot-password",
        name: "forgot-password-page",
        meta: {auth: "true"},
        component: () => import("../views/ForgotPassword.vue"),
    },
    {
        path: "reset-password",
        name: "reset-password-page",
        component: () => import("../views/ResetPassword.vue"),
    },
    {
        name: "check-order-page",
        path: "/check-order/:code",
        component: () => import("../views/OrderView.vue"),
    },
    // Tam
    {
        name: "user",
        path: "/user",
        meta: { auth: "login" },
        redirect: () => {
            return {name: "user-home"};
        },
        component: () => import("@/components/user/UserLayout.vue"),
        children: [
            {
                name: "user-home",
                path: "/user/home",
                meta: { auth: "login" },
                component: () => import("@/views/user/UserHome.vue"),
            },
            {
                name: "user-history",
                path: "/user/history",
                meta: { auth: "login" },
                component: () => import("@/views/user/UserHistory.vue"),
            },
            {
                name: "user-history-detail",
                path: "/user/history/detail/:code",
                meta: { auth: "login" },
                component: () => import("@/views/user/UserHistoryDetail.vue"),
            },
            {
                name: "user-address",
                path: "/user/address",
                meta: { auth: "login" },
                component: () => import("@/views/user/AddressList.vue"),
            },
            {
                name: "user-account",
                path: "/user/account",
                meta: { auth: "login" },
                component: () => import("@/views/user/UserAccount.vue"),
            },
            {
                name: "user-change-password",
                path: "/user/account/change-password",
                meta: { auth: "login" },
                component: () => import("@/views/user/UserPassword.vue"),
            },
            {
                name: "user-feedback",
                path: "/user/feedback",
                meta: { auth: "login" },
                component: () => import("@/views/user/UserFeedback.vue"),
            },
        ],
    },
    // Sang
    {
        path: "/san-pham/:name",
        component: ProductPage,
    },
    {
        path: "/news",
        component: NewsList,
    },
    {
        path: "/news/:title",
        component: NewsPage,
    },
    {
        path: "/page/:name",
        component: PageDetail,
    },
    {
        path: "/page/:name",
        component: PageDetail,
    },
];

export default routes;
