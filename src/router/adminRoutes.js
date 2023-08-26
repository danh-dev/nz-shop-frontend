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
	{
		name: "admin-product-detail",
		path: "product/:id",
		component: () => import("../views/admin/product/ProductDetail.vue"),
	},
	{
		name: "admin-product-detail-variant",
		path: "product/:id/variant",
		component: () => import("../views/admin/product/ProductVariant.vue"),
	},
	{
		name: "admin-product-update",
		path: "product/update/:id",
		component: () => import("../views/admin/product/ProductUpdate.vue"),
	},
	{
		name: "admin-category",
		path: "category",
		component: () => import("../views/admin/category/CategoryList.vue"),
	},
	{
		name: "admin-subcategory",
		path: "category/:id",
		component: () => import("../views/admin/category/ChildCategoryList.vue"),
	},
	{
		name: "admin-category-create",
		path: "category/create",
		component: () => import("../views/admin/category/CategoryCreate.vue"),
	},
	{
		name: "admin-category-update",
		path: "category/update/:id",
		component: () => import("../views/admin/category/CategoryUpdate.vue"),
	},
];

export default routes;
