<script setup>

import {onBeforeUnmount} from "vue";
import {siteData} from "@/stores/globals";

const siteStore = siteData();

onBeforeUnmount(()=>{
  siteStore.cartInfo.orderCompleted = "";
  siteStore.useGuest = "";
  siteStore.selectStep = "stepAddress";
})
</script>

<template>
  <v-card min-height="500" min-width="500px">
    Thanh toán đơn hàng : {{siteStore.cartInfo.orderCompleted}}
  </v-card>
</template>

<style scoped>

</style>