const routes = [
	{
		path: "/",
		redirect: to => {
			return { name: 'dashboard-admin' }
		},
	},
	{
		path: "dashboard",
		name: "admin-dashboard",
		component: () => import("../views/admin/Dashboard.vue"),
	},
	{
		path: "user",
		name: "admin-user",
		component: () => import("../views/admin/user/UserList.vue"),
	},

	{
		path: "post",
		name: "admin-post",
		component: () => import("../views/post/PostList.vue"),
	},

	{
		path: "post/:title",
		name: "post-detail",
		component: () => import("../views/post/PostDetailPage.vue"),
	},

	{
		path: "slider",
		name: "admin-slider",
		component: () => import("../views/slider/SliderList.vue"),
	},
];

export default routes;
