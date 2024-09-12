const routes = [
    {
        path: "",
        name: "redirect",
        redirect: to => {
            return {name: "dashboard-admin"};
        },
    },
    {
        path: "dashboard",
        name: "dashboard-admin",
        component: () => import("../views/admin/Dashboard.vue"),
    },
    {
        path: "users",
        name: "user-admin",
        component: () => import("../views/admin/UserList.vue"),
    },
    {
        path: "roles",
        name: "roles-admin",
        component: () => import("../views/admin/RoleManager.vue"),
    },
    {
        path: "coupons",
        name: "coupons-admin",
        component: () => import("../views/admin/CouponsManager.vue"),
    },
];

export default routes;
