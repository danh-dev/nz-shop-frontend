<script setup>
defineProps({
  breadCrumbsItems: Array,
});
</script>

<template>
  <v-container
      class="py-1 elevation-2"
      fluid
      style="position: absolute; top: 64px; left: 0;"
  >
    <v-container class="pa-0 w-100">
      <v-breadcrumbs
          class="pa-0 ps-1 text-body-2 w-100"
          :items="breadCrumbsItems"
          color="red-accent-4"
          rounded="sm"
      >
        <template #prepend>
          <a to="/">
            <v-icon
                size="small"
                icon="mdi-home-outline"
                color="red-accent-4"
            ></v-icon>
          </a>
        </template>
        <template #divider>
          <v-icon
              icon="mdi-chevron-right"
              color="red-accent-4"
          ></v-icon>
        </template>
      </v-breadcrumbs>
    </v-container>
  </v-container>
</template>

<style></style>