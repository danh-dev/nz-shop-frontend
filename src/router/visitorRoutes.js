import NewsPage from "../views/NewsPage.vue";
import ProductPage from "../views/ProductPage.vue";
import NewsList from "../views/NewsList.vue";
import PageList from "../views/PageList.vue";
import PageDetail from "../views/PageDetail.vue";

const routes = [
	{
		path: "",
		name: "home",
		component: () => import("../views/HomePage.vue"),
	},
	{
		name: "categories",
		path: "/categories/:slugs+",
		component: () => import("../views/CategoryPage.vue"),
	},
	{
		path: "login",
		name: "login-page",
		meta: { auth: "true" },
		component: () => import("../views/Login.vue"),
	},
	{
		path: "register",
		name: "register-page",
		meta: { auth: "true" },
		component: () => import("../views/Register.vue"),
	},
	// Cart feature
	{
		path: "cart",
		name: "cart-page",
		component: () => import("../views/cart/Cart.vue"),
	},
	{
		path: "checkout",
		name: "checkout-page",
		meta: { auth: "login" },
		component: () => import("../views/cart/CheckOut.vue"),
	},
	{
		path: ":pathMatch(.*)*",
		component: () => import("../views/404.vue"),
	},
	{
		name: "user",
		path: "/user",
		redirect: () => {
			return { name: "user-home" };
		},
		component: () => import("@/components/user/UserLayout.vue"),
		children: [
			{
				name: "user-home",
				path: "/user/home",
				component: () => import("@/views/user/UserHome.vue"),
			},
			{
				name: "user-history",
				path: "/user/history",
				component: () => import("@/views/user/UserHistory.vue"),
			},
			{
				name: "user-history-detail",
				path: "/user/history/detail/:code",
				component: () => import("@/views/user/UserHistoryDetail.vue"),
			},
			{
				name: "user-promotion",
				path: "/user/promotion",
				component: () => import("@/views/user/UserPromotion.vue"),
			},
			{
				name: "user-account",
				path: "/user/account",
				component: () => import("@/views/user/UserAccount.vue"),
			},
			{
				name: "user-change-password",
				path: "/user/account/change-password",
				component: () => import("@/views/user/UserPassword.vue"),
			},
			{
				name: "user-feedback",
				path: "/user/feedback",
				component: () => import("@/views/user/UserFeedback.vue"),
			},
			// Product router
			{
				path: "/san-pham/:name",
				component: ProductPage,
			},
			// News router
			{
				path: "/news",
				component: NewsList,
			},
			{
				path: "/news/:title",
				component: NewsPage,
			},
			// page router
			{
				path: "/page",
				component: PageList,
			},
			{
				path: "/page/:name",
				component: PageDetail,
			},
		],
	},
    {
        path: "verify-email",
        name: "verify-email-page",
        component: () => import("../views/Verify.vue"),
    },
    {
        path: "forgot-password",
        name: "forgot-password-page",
        meta: { auth: "true" },
        component: () => import("../views/ForgotPassword.vue"),
    },
    {
        path: "reset-password",
        name: "reset-password-page",
        meta: { auth: "true" },
        component: () => import("../views/ResetPassword.vue"),
    },
    {
        path: ":pathMatch(.*)*",
        component: () => import("../views/404.vue"),
    }
];

export default routes;
