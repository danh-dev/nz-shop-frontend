<script setup>

import {ref} from "vue";

const menus = ref([
  { icon: 'mdi-home-outline', text: 'Dashboard', route: 'dashboard' },
  { icon: 'mdi-newspaper-variant-multiple', text: 'Posts', route: 'post' },
  { icon: 'mdi-book-open-page-variant-outline', text: 'Pages', route: 'page' },
  { icon: 'mdi-image-multiple-outline', text: 'Sliders', route: 'slider' },
  { icon: 'mdi-comment-outline', text: 'Comments Post', route: 'post-comment' },
  { icon: 'mdi-comment-outline', text: 'Comments Product', route: 'product-comment' },
  { icon: 'mdi-star-outline', text: 'Reviews', route: 'review' },
  { icon: 'mdi-comment-off-outline', text: 'Từ khoá cấm', route: 'bad-words' },
  { icon: 'mdi-list-box-outline', text: 'Category Product', route: 'category' },
  { icon: 'mdi-package-variant-closed', text: 'Product', route: 'product' },
  { icon: 'mdi-archive-outline', text: 'Order Management', route: 'orders' },
  { icon: 'mdi-cash-sync', text: 'Transactions', route: 'transactions' },
  { icon: 'mdi-truck-fast-outline', text: 'Tracking', route: 'tracking' },
  { icon: 'mdi-ticket-percent-outline', text: 'Coupon Management', route: 'coupons' },
  { icon: 'mdi-account-outline', text: 'User Management', route: 'users' },
  { icon: 'mdi-shield-star-outline', text: 'Roles Management', route: 'roles' },
  { icon: 'mdi-cogs', text: 'Site Settings', route: 'site-settings' },
]);
</script>

<template>
  <v-list
    density="compact"
    nav
  >
    <v-list-item
      v-for="item in menus"
      :key="item.text"
      :prepend-icon="item.icon"
      :to="`/admincp/${item.route}`"
      color="red-darken-2"
    >
      <v-list-item-title class="text-menu">{{ item.text }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style>
.v-list-item__prepend {
  max-width: 35px !important;
}

.text-menu {
  font-size: 0.8rem !important;
  font-weight: 700 !important;
  line-height: 1.2rem;
  letter-spacing: 0.02em !important;
  text-transform: none !important;
}
</style>
