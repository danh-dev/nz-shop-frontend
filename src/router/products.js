const products = [
  {
    path: "/home",
    component: () => import("../layouts/product.vue"),
    children: [
      {
        path: "mobiles",
        name: "home-mobiles",
        component: () => import("../pages/products/mobiles/index.vue"),
        children: [
          {
            path: "Xiaomi-Redmi-Note-12-Pro",
            name: "Xiaomi-Redmi-Note-12-Pro",
            component: () => import("../components/productDetail/ProductLayout.vue")
          }
        ]
      },
      {
        path: "tablets",
        name: "home-tablets",
        component: () => import("../pages/products/tablets/index.vue"),
      },
      {
        path: "laptops",
        name: "home-laptops",
        component: () => import("../pages/products/laptops/index.vue"),
      }
    ]
  }
];
export default products;