<script setup>
defineProps({
  brands: Array,
});
</script>

<template>
  <v-menu>
    <v-sheet
      class="d-flex overflow-auto"
      min-height="100%"
    >
      <v-list class="flex-1-1 overflow-visible">
        <v-list-item
          v-for="brand in brands"
          :key="brand.id"
          :value="brand.name"
        >
          <v-list-item-title>{{ brand.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list class="flex-1-1 overflow-visible">
        <v-list-item
          v-for="brand in brands"
          :key="brand.id"
          :value="brand.name"
        >
          <v-list-item-title>{{ brand.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-sheet>

  </v-menu>
</template>

<style></style>