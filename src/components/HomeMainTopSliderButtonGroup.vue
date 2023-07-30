<script setup>
import HomeMainTopSliderButtonItem from "./HomeMainTopSliderButtonItem.vue";

defineProps({
  images: Array,
  model: Number,
  maxModel: Number,
});

defineEmits(["handleGroupButtonClick"]);
</script>

<template>
  <v-sheet class="d-flex overflow-hidden">
    <HomeMainTopSliderButtonItem
      v-for="(image, index) in images"
      :key="image.id"
      @click="$emit('handleGroupButtonClick', index)"
      :style="[model === index ? { paddingTop: '2px', borderBottom: '2px solid red' } : '', { transition: 'translate 0.3s' }, maxModel > 4 ? { translate: `${-100 * (maxModel - 4)}%` } : {}]"
      :class="[model === index ? 'text-body-1' : 'text-body-2']"
    >
      {{ image.id }}
    </HomeMainTopSliderButtonItem>
  </v-sheet>
</template>

<style></style>