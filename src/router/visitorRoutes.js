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
    {
        path: "verify-email",
        name: "verify-email-page",
        component: () => import("../views/Verify.vue"),
    },
    {
        path: "forgot-password",
        name: "forgot-password-page",
        meta: { auth: "true" },
        component: () => import("../views/ForgotPassword.vue"),
    },
    {
        path: "reset-password",
        name: "reset-password-page",
        meta: { auth: "true" },
        component: () => import("../views/ResetPassword.vue"),
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
        path: "test",
        name: "test-page",
        // meta: { auth: "login" },
        component: () => import("../views/test.vue"),
    },
    {
        path: ':pathMatch(.*)*',
        component: () => import('../views/404.vue'),
    }
];

export default routes;
