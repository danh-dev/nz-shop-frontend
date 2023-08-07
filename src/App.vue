<script setup>

import {RouterView} from "vue-router";
import Header from "@/components/globals/header.vue";

</script>

<template>
  <v-app>
    <Header/>
    <v-main>
      <v-container>
        <RouterView/>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.m-pointer{
  cursor:pointer;
}
</style>
