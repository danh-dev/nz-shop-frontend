<script setup>
defineProps({
  activatorClass: String,
  category: String,
});
</script>

<template>
  <v-hover #default="{ isHovering, props }">
    <v-list-item
      density="compact"
      class="pa-0"
      v-bind="props"
      :class="[activatorClass, isHovering ? 'text-red-accent-4' : '']"
      :value="category"
      color="red-accent-4"
      variant="text"
      :href="category"
    >
      <v-list-item-title class="d-flex align-center text-subtitle-2 text-md-body-2 text-lg-body-1">
        <v-sheet
          color="transparent"
          class="d-flex align-center"
        >
          <v-icon class="mx-2">
            <slot name="icon"></slot>
          </v-icon>
          <v-sheet color="transparent text-wrap">
            <slot name="name"></slot>
          </v-sheet>
        </v-sheet>
        <v-icon class="ms-auto">mdi-chevron-right</v-icon>
      </v-list-item-title>
    </v-list-item>
  </v-hover>
</template>

<style></style>