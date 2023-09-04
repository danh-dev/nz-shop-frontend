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
	// Tam
	{
		path: "post-comment",
		name: "admin-post-comment",
		component: () => import("../views/admin/comment/CommentPostList.vue"),
	},
	{
		path: "product-comment",
		name: "admin-product-comment",
		component: () => import("../views/admin/comment/CommentProductList.vue"),
	},
	{
		path: "product-comment/:id/product-feedback",
		name: "admin-product-feedback",
		component: () => import("../views/admin/comment/FeedbackProductList.vue"),
	},
	{
		path: "post-feedback",
		name: "admin-post-feedback",
		component: () => import("../views/admin/comment/FeedbackPostList.vue"),
	},
	{
		path: "review",
		name: "admin-review",
		component: () => import("../views/admin/review/ReviewList.vue"),
	},
	{
		name: "admin-product",
		path: "product",
		component: () => import("../views/admin/product/ProductList.vue"),
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
		name: "admin-product-variant",
		path: "variants/:id",
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
	// 	Sang
	{
		path: "post",
		name: "admin-post",
		component: () => import("../views/post/PostList.vue"),
	},

	{
		path: "post/add",
		name: "post-add",
		component: () => import("../views/post/AddNewPost.vue"),
	},

	{
		path: "post/edit/:id",
		name: "post-edit",
		component: () => import("../views/post/EditPost.vue"),
	},
	// Slider router:
	{
		path: "slider",
		name: "admin-slider",
		component: () => import("../views/slider/SliderList.vue"),
	},

	{
		path: "slider/add",
		name: "slider-add",
		component: () => import("../views/slider/AddNewSlider.vue"),
	},

	{
		path: "slider/edit/:id",
		name: "slider-edit",
		component: () => import("../views/slider/EditSlider.vue"),
	},
	// Page router:
	{
		path: "page",
		name: "admin-page",
		component: () => import("../views/page/PageList.vue"),
	},

	{
		path: "page/add",
		name: "page-add",
		component: () => import("../views/page/AddNewPage.vue"),
	},

	{
		path: "page/edit/:id",
		name: "page-detail",
		component: () => import("../views/page/EditPage.vue"),
	},
];

export default routes;
