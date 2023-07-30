<script setup>
import HomeMainTopSliderArrow from "./HomeMainTopSliderArrow.vue";

defineProps({
  images: Array,
});

</script>

<template>
  <v-carousel
    hide-delimiters
    cycle
    interval="5000"
    show-arrows="hover"
  >
    <template #prev="{ props }">
      <HomeMainTopSliderArrow
        :icon="props.icon"
        @click="props.onClick"
        :class="[props.class, 'ms-n10 ps-5']"
      />
    </template>
    <template #next="{ props }">
      <HomeMainTopSliderArrow
        :icon="props.icon"
        @click="props.onClick"
        :class="[props.class, 'me-n10 pe-5']"
      />
    </template>
    <v-carousel-item
      v-for="image in images"
      :key="image.id"
      :src="image.src"
      :aspect-ratio="16 / 9"
      cover
    />
  </v-carousel>
</template>

<style></style>