<script setup>
import HomeMainTopSliderButtonItem from "./HomeMainTopSliderButtonItem.vue";

defineProps({
  gallery: Array,
  model: Number,
  maxModel: Number,
  buttonGroupLength: Number,
});

defineEmits(["handleGroupButtonClick"]);

const setFontWeight = (index, model) => {
  return model === index ? "font-weight-bold" : "";
};

const setSelectedStyle = (index, model) => {
  return model === index ? { paddingTop: "2px", borderBottom: "2px solid red" } : {};
};

const translateBackToFirstItem = (maxModel, buttonGroupLength) => {
  return maxModel > buttonGroupLength - 1 ? { translate: -100 * (maxModel - (buttonGroupLength - 1)) + "%" } : {};
};
</script>

<template>
  <v-sheet class="d-flex overflow-hidden">
    <v-slide-x-transition
      mode="in-out"
      group
    >
      <HomeMainTopSliderButtonItem
        v-for="(item, index) in gallery"
        :key="item.id"
        :style="[setSelectedStyle(index, model), translateBackToFirstItem(maxModel, buttonGroupLength)]"
        class="pa-0"
        :width="`calc(100% / ${buttonGroupLength})`"
        @click="$emit('handleGroupButtonClick', index)"
      >
        <v-sheet>
          <v-sheet
            class="text-uppercase text-body-2"
            :class="setFontWeight(index, model)"
          >{{ item.title }}</v-sheet>
          <v-sheet
            class="text-caption"
            :class="setFontWeight(index, model)"
          > {{ item.subtitle }}</v-sheet>
        </v-sheet>
      </HomeMainTopSliderButtonItem>
    </v-slide-x-transition>

  </v-sheet>
</template>

<style></style>