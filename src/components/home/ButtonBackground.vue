<script setup>
defineProps({
  url: String,
});
</script>

<template>
  <v-list-item
    class="image-background"
    rounded="lg"
  >
    <slot></slot>
  </v-list-item>
</template>

<style>
.image-background {
  background-color: #EF5350;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 100% 100%;
}
</style>