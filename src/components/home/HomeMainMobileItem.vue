<script setup>
defineProps({
  category: Object,
  color: String,
});

const url = import.meta.env.VITE_PUBLIC_URL;
</script>

<template>
  <v-list-item
    :id="`${category.name}-mobile`"
    rounded="0"
    class="d-flex flex-column align-center pa-0 justify-center align-center text-subtitle-2"
    :value="category.name"
    active-class="border-right font-weight-bold"
    :class="`bg-${color}-accent-1`"
    style="aspect-ratio: 1;"
  >
    <v-sheet
      color="transparent"
      class="d-flex"
    >
      <v-img
        height="50px"
        width="50px"
        max-width="50px"
        class="mx-auto"
        :src="`${url}${category.image}`"
      >
      </v-img>
    </v-sheet>

    <v-sheet
      color="transparent"
      class="text-center mt-1 clamp-1"
    >
      {{ category.name }}
    </v-sheet>
  </v-list-item>
</template>

<style>
.clamp-1 {
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.border-right {
  border-right: 2px red solid;
}
</style>