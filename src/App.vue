<script setup>
import { RouterView } from "vue-router";

import GlobalLoader from "@/components/globals/GlobalLoader.vue";
import useLoadingStore from "@/stores/loading";
import ScrollToTop from "@/components/globals/ScrollToTop.vue";
// import Footer from "./components/copy/Footer.vue";

const loadingStore = useLoadingStore();
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

.more {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.extra {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

a {
  color: #333;
  text-decoration: none;
}

.border-left {
  border-left: 2px solid #d50000;
}

.text-danger {
  color: #c50000;
}

.font-bold {
  font-weight: bold;
}

.m-card {
  background: #fff;
  border-radius: 0.5rem !important;
  box-shadow: 0 2px 9px -2px rgba(50, 71, 92, 0.06), 0 4px 9px 1px rgba(50, 71, 92, 0.04), 0 2px 6px 4px rgba(50, 71, 92, 0.02) !important;
}

.ck-editor__editable {
  height: 300px;
  border: 1px solid rgb(211, 211, 211) !important;
}

/* 
.cke_chrome {
  border-radius: 10px;
  border: 1px solid #695656;
  border-width: thin;
}

.cke_top {
  border-radius: 10px 10px 0px 0px
}

.cke_bottom {
  border-radius: 0px 0px 10px 10px
} */

@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px !important;
  }
}
</style>
