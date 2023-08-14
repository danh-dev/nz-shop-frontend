const routes = [
	{
		path: "",
		name: "dashboard",
        component: () => import("../views/admin/Dashboard.vue"),
	},
];

export default routes;
