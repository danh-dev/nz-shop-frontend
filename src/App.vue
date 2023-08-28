<script setup>
import { RouterView } from "vue-router";
import { useRecaptchaProvider } from "vue-recaptcha";

import GlobalLoader from "@/components/globals/GlobalLoader.vue";
import useLoadingStore from "@/stores/loading";
import ScrollToTop from "@/components/globals/ScrollToTop.vue";
// import Footer from "./components/copy/Footer.vue";

const loadingStore = useLoadingStore();
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

.more {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

a {
  color: #333;
  text-decoration: none;
}

.text-danger {
  color: #c50000;
}

.font-bold {
  font-weight: bold;
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
