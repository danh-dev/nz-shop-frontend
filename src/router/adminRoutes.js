const routes = [
	// {
	// 	path: "",
	// 	name: "dashboard",
	// 	component: () => import("@/view/dashboard/Dashboard.vue"),
	// 	children: [],
	// },
	{
		path: "user",
		name: "user-admin",
		component: () => import("../views/admin/user/UserList.vue"),
	},
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
];

export default routes;
