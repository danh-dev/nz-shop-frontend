const news = [
  {
    path: "/home/news",
    name: "news",
    component: () => import("../layouts/news.vue"),
  },

  {
    path: "/home/news/market",
    name: "news-market",
    component: () => import("../pages/news/index.vue"),
  }
];

export default news;