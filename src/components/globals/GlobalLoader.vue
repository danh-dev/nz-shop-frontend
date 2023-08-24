<script setup>
defineProps({
  loading: Boolean,
});
</script>

<template>
  <v-overlay
    :model-value="loading"
    class="align-center justify-center"
  >
    <v-progress-circular
      color="red-accent-4"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<style></style>