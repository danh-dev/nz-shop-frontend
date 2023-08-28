<script setup>

import { RouterView } from "vue-router";
import UserLayout from "./components/UserLayout.vue";
import UserMenu from "./components/UserMenu.vue";
import UserCard from "./components/UserCard.vue";
import UserCardItem from "./components/UserCardItem.vue";
import UserCarousel from "./components/UserCarousel.vue";
import UserOder from "./components/UserOder.vue";
import UserBill from "./components/UserBill.vue";



import ScrollToTop from "@/components/globals/ScrollToTop.vue";
import { useRecaptchaProvider } from "vue-recaptcha";

useRecaptchaProvider();
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.m-pointer {
  cursor: pointer;
}

.m-card {
  border-radius: 0.5rem !important;
  box-shadow: 0 2px 9px -2px rgba(50, 71, 92, 0.06), 0 4px 9px 1px rgba(50, 71, 92, 0.04), 0 2px 6px 4px rgba(50, 71, 92, 0.02) !important;
}

@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px !important;
  }
}
</style>
