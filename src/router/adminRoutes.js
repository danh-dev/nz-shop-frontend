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
];

export default routes;
