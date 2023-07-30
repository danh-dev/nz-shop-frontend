<script setup>
import { ref } from "vue";
const categories = ref(["laptop", "dien thoai", "may tinh"]);

</script>

<template>
  <v-list
    position="absolute"
    class="menu-activator"
    color="primary"
  >
    <v-list-item
      v-for="(category, index) in categories"
      :key="index"
    >
      <v-list-item-title>{{ category }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<style></style>