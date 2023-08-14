<script setup>
defineEmits(["click"]);
</script>

<template>
  <v-card
    position="absolute"
    location="top left"
    style=" z-index: 1; translate: 0 36px; cursor: default;"
    elevation="3"
    @click.stop
    :ripple="false"
    class="pa-2"
  >
    <v-card-title class="d-flex text-body-1 font-weight-bold mb-2 pa-0">
      <slot name="filter-title"></slot>
      <v-btn
        class="ms-auto"
        icon="mdi-close"
        density="compact"
        variant="text"
        color="red-accent-4"
        @click="$emit('click')"
      ></v-btn>
    </v-card-title>
    <slot name="sub-filter"></slot>

  </v-card>
</template>

<style></style>