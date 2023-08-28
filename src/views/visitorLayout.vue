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
<script setup>
import { RouterView } from "vue-router";
import Header from "@/components/globals/Header.vue";
</script>

<style scoped></style>