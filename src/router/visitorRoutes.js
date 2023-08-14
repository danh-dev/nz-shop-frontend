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
    }
];

export default routes;
