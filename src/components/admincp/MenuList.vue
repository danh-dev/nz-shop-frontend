<script setup>

import {ref} from "vue";

const menus= ref([
  {icon: 'mdi-home-outline', text: 'Dashboard', route: 'dashboard'},
  {icon: 'mdi-ticket-percent-outline', text: 'Coupons', route: 'coupons'},
  {icon: 'mdi-account-outline', text: 'User Manager', route: 'users'},
  {icon: 'mdi-shield-star-outline', text: 'Roles Manager', route: 'roles'},
  {icon: 'mdi-database-cog', text: 'Admin Panel', route: '/adminpanel'},
]);
</script>

<template>
  <v-list density="compact" nav>
    <v-list-item v-for="item in menus" :prepend-icon="item.icon" :to="item.route" color="red-darken-2">
      <v-list-item-title class="text-menu">{{item.text}}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style>
.v-list-item__prepend{
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