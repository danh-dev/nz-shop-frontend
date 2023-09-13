<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-sheet class="rounded pa-3 d-flex flex-column justify-center align-center" elevation="0">
    <div>
      <LottieAnimation :animation-data="Error404" :auto-play="true" :loop="true" :speed="1" style="width: 500px"/>
    </div>
    <div class="ma-3">
      <p>Không tìm thấy dữ liệu</p>
    </div>
    <v-btn class="ma-3" density="default" color="red-accent-4" @click="$router.go(-1)">Quay lại</v-btn>
  </v-sheet>
</template>

<script setup>

import {ref} from "vue";
import {LottieAnimation} from "lottie-web-vue";
import Error404 from "@/assets/e404.json"

const color = ref();
</script>

<style scoped>

</style>