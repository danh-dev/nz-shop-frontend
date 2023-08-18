const routes = [
	{
		path: "",
		redirect: to => {
			return { name: 'dashboard-admin' };
		},
	},
	{
		path: "dashboard",
		name: "dashboard-admin",
		component: () => import("../views/admin/Dashboard.vue"),
	},
	{
		path: "user",
		name: "user-admin",
		component: () => import("../views/admin/user/UserList.vue"),
	},
	{
		name: "admin-product",
		path: "product",
		component: () => import("../views/admin/product/ProductList.vue"),
	},
	{
		name: "admin-product-detail",
		path: "product/:code",
		component: () => import("../views/admin/product/ProductDetail.vue"),
	},
	{
		name: "admin-product-create",
		path: "product/create",
		component: () => import("../views/admin/product/ProductCreate.vue"),
	},
];

export default routes;
