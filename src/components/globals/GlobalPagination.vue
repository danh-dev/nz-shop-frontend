<script setup>
defineProps({
  page: Number,
  numberOfPages: Number,
});

defineEmits(["update:page"]);
</script>

<template>
  <div class="text-center">
    <v-pagination color="red-accent-4" :model-value="page" @update:model-value="$emit('update:page', $event)"
      :length="numberOfPages" rounded="0"></v-pagination>
  </div>
</template>

<style></style>