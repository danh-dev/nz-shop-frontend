const routes = [
	{
		path: "",
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
];

export default routes;
