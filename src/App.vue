<script setup>
import {RouterView} from "vue-router";
import ScrollToTop from "@/components/globals/ScrollToTop.vue";
import {useRecaptchaProvider} from "vue-recaptcha";

useRecaptchaProvider();


</script>

<template>
  <RouterView/>
  <ScrollToTop/>
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

.m-box {
  border: 1px solid #cccccc;
  border-radius: 5px;
}

.active {
  border-color: #dc3545 !important;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px !important;
  }
}
</style>
