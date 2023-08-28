<script setup>

import { RouterView } from "vue-router";



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


.text-danger,
.bg-danger,
.danger,
a:hover {
  color: #c50000;
}

.font-bold {
  font-weight: bold;
}

.m-card {
  border-radius: 0.5rem !important;
  box-shadow: 0 2px 9px -2px rgba(50, 71, 92, 0.06), 0 4px 9px 1px rgba(50, 71, 92, 0.04), 0 2px 6px 4px rgba(50, 71, 92, 0.02) !important;
}
</style>
