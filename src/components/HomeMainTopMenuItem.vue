<script setup>
import { ref } from "vue";
const items = ref([
  {
    name: "Item #1",
    id: 1,
  },
  {
    name: "Item #2",
    id: 2,
  },
  {
    name: "Item #3",
    id: 3,
  },
  {
    name: "Item #3",
    id: 3,
  },
  {
    name: "Item #3",
    id: 3,
  },
  {
    name: "Item #3",
    id: 3,
  },
  {
    name: "Item #3",
    id: 3,
  },
  {
    name: "Item #3",
    id: 3,
  },
  {
    name: "Item #3",
    id: 3,
  },
]);
</script>

<template>
  <v-menu
    activator=".menu-activator"
    open-on-hover
    attach="#parent-menu"
  >
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :value="index"
      >
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style></style>