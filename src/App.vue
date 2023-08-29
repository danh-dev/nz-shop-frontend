<script setup>
import { RouterView } from "vue-router";

import GlobalLoader from "@/components/globals/GlobalLoader.vue";
import useLoadingStore from "@/stores/loading";

const loadingStore = useLoadingStore();
import ScrollToTop from "@/components/globals/ScrollToTop.vue";
import { useRecaptchaProvider } from "vue-recaptcha";
useRecaptchaProvider();


</script>

<template>
  <RouterView />
  <ScrollToTop />
  <GlobalLoader :loading="loadingStore.loading" />
</template>

<style>
.m-pointer {
  cursor: pointer;
}

.m-card {
  background: #fff;
  border-radius: 0.5rem !important;
  box-shadow: 0 2px 9px -2px rgba(50, 71, 92, 0.06), 0 4px 9px 1px rgba(50, 71, 92, 0.04), 0 2px 6px 4px rgba(50, 71, 92, 0.02) !important;
}

@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px !important;
  }
}
</style>
