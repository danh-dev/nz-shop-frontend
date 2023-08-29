const routes = [
	{
		path: "",
		name: "redirect",
		// eslint-disable-next-line no-unused-vars
		redirect: to => {
			return { name: "dashboard-admin" };
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
	{
		path: "user",
		name: "user-admin",
		component: () => import("../views/admin/user/UserList.vue"),
	},
	{
		path: "post-comment",
		name: "admin-post-comment",
		component: () => import("../views/admin/comment/CommentList.vue"),
	},
	{
		path: "product-comment",
		name: "admin-product-comment",
		component: () => import("../views/admin/comment/CommentProduct.vue"),
	},
	{
		path: "review",
		name: "admin-review",
		component: () => import("../views/admin/review/ReviewList.vue"),
	},
	{
		path: "post",
		name: "dashboard",
		component: () => import("@/view/dashboard/Dashboard.vue"),
		children: [
			{
				path: "",
				name: "home",
				component: () => import(/* webpackChunkName: "Home" */ "@/view/dashboard/DemoOne.vue"),
			},
			{
				path: "demo-one",
				name: "demo-one",
				component: () => import(/* webpackChunkName: "demoOne" */ "@/view/dashboard/DemoOne.vue"),
			},
			{
				path: "demo-two",
				name: "demo-two",
				component: () => import(/* webpackChunkName: "demoTwo" */ "@/view/dashboard/DemoTwo.vue"),
			},
			{
				path: "demo-three",
				name: "demo-three",
				component: () =>
					import(/* webpackChunkName: "demoThree" */ "@/view/dashboard/DemoThree.vue"),
			},
			{
				path: "demo-four",
				name: "demo-four",
				component: () => import(/* webpackChunkName: "demoFour" */ "@/view/dashboard/DemoFour.vue"),
			},
			{
				path: "demo-five",
				name: "demo-five",
				component: () => import(/* webpackChunkName: "demoFive" */ "@/view/dashboard/DemoFive.vue"),
			},
			{
				path: "demo-six",
				name: "demo-six",
				component: () => import(/* webpackChunkName: "demoSix" */ "@/view/dashboard/DemoSix.vue"),
			},
			{
				path: "demo-seven",
				name: "demo-seven",
				component: () =>
					import(/* webpackChunkName: "demoSeven" */ "@/view/dashboard/DemoSeven.vue"),
			},
			{
				path: "demo-eight",
				name: "demo-eight",
				component: () =>
					import(/* webpackChunkName: "demoEight" */ "@/view/dashboard/DemoEight.vue"),
			},
			{
				path: "demo-nine",
				name: "demo-nine",
				component: () => import(/* webpackChunkName: "demoNine" */ "@/view/dashboard/DemoNine.vue"),
			},
		],
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
