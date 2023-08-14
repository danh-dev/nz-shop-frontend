const routes = [
	{
		path: "",
		redirect: to => {
			return { name: 'dashboard-admin' }
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
];

export default routes;
