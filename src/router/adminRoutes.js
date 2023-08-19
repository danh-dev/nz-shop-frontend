/* eslint-disable no-unused-vars */
const routes = [
	{
		path: "/",
		redirect: to => {
			return { name: "dashboard-admin" };
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
	// Post router:
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
		path: "post/edit/:title",
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
		path: "slider/edit/:name",
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
		path: "page/edit/:name",
		name: "page-detail",
		component: () => import("../views/page/EditPage.vue"),
	},
];

export default routes;
