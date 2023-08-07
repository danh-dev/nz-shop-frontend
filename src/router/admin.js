const admin = [
  {
    path: "/admin",
    name: "admin",
    component: () => import("../layouts/admin.vue"),
    children: [
      {
        path: "user",
        name: "admin-user",
        component: () => import("../pages/admin/user/user.vue")
      },

      {
        path: "role",
        name: "admin-role",
        component: () => import("../pages/admin/role/role.vue")
      },

      {
        path: "setting",
        name: "admin-setting",
        component: () => import("../pages/admin/setting/setting.vue")
      },

      {
        path: "product",
        name: "admin-product",
        component: () => import("../pages/admin/product/product.vue")
      },

      {
        path: "sale",
        name: "admin-sale",
        component: () => import("../pages/admin/sales/sale.vue")
      }
    ]
  }
];

export default admin;