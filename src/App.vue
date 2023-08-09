<script setup>

import { RouterView } from "vue-router";
import Header from "@/components/globals/header.vue";

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

a {
  color: #333;
  text-decoration: none;
}

.text-danger, .bg-danger, .danger, a:hover {
  color: #cd3545;
}

.font-bold {
  font-weight: bold;
}
</style>
