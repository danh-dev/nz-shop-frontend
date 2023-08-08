<script setup>
defineProps({
  brands: Array,
});
</script>

<template>
  <v-menu>
    <v-list>
      <v-list-item
        v-for="brand in brands"
        :key="brand.id"
        :value="brand.name"
      >
        <v-list-item-title>{{ brand.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style></style>