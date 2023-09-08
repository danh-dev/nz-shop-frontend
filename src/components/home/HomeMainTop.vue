<script setup>
import { ref, watch, computed } from "vue";
import { useDisplay } from "vuetify";
import { storeToRefs } from "pinia";

import useCategoryStore from "@/stores/category";
import getSlugByName from "@/utils/getSlugByName";
import TopCarousel from "@/components/globals/TopCarousel.vue";
import HomeMainTopSliderButtonGroup from "./HomeMainTopSliderButtonGroup.vue";
import HomeMainTopMenuItem from "./HomeMainTopMenuItem.vue";
import HomeMainTopMenuList from "./HomeMainTopMenuList.vue";

defineProps({
  gallery: Array,
});

const categoryStore = useCategoryStore();
const { parentCategories } = storeToRefs(categoryStore);
const { findBrandsOfParentCategory } = categoryStore;

const { mdAndUp, name } = useDisplay();
const buttonGroupLength = computed(() => {
  switch (name.value) {
    case "xs":
      return 3;
    case "sm":
      return 4;
    case "md":
      return 4;
    case "xl":
      return 6;
    case "xxl":
      return 7;
    default:
      return 5;
  }
});


const model = ref(0);
const maxModel = ref(0);

const handleGroupButtonClick = (index) => {
  model.value = index;
};

watch(model, (cur, pre) => {
  if ((cur > pre && cur > maxModel.value) || maxModel.value - (buttonGroupLength.value - 1) > cur) {
    maxModel.value = cur;
  }
});

</script>

<template>
  <v-sheet
    class="d-flex mb-4"
    :height="mdAndUp ? '23rem' : '20rem'"
  >
    <v-sheet
      width="15rem"
      max-width="23%"
      class="d-none d-sm-block rounded-lg overflow-hidden elevation-3 mr-3 py-1"
    >
      <HomeMainTopMenuList
        class="py-0 d-flex flex-column scrollbar"
        height="100%"
      />
    </v-sheet>
    <v-sheet
      id="parent-item"
      class="d-flex flex-1-1"
      position="relative"
      width="calc(100% - 15rem - 12px)"
      min-width="calc(77% - 12px)"
    >
      <v-sheet
        class="d-flex flex-column rounded-lg overflow-hidden elevation-3"
        :width="'100%'"
      >
        <v-sheet height="80%">
          <TopCarousel
            v-model="model"
            height="100%"
            :gallery="gallery"
          ></TopCarousel>
        </v-sheet>
        <v-sheet height="20%">
          <HomeMainTopSliderButtonGroup
            class="d-flex overflow-hidden"
            height="100%"
            :gallery="gallery"
            :model="model"
            :maxModel="maxModel"
            :buttonGroupLength="buttonGroupLength"
            @handleGroupButtonClick="handleGroupButtonClick"
          />
        </v-sheet>
      </v-sheet>

      <!-- <v-sheet
        width="15.5rem"
        class="d-none d-md-flex flex-column justify-space-between bg-transparent ms-3"
        height="100%"
      >
        <v-card
          v-for="(banner, index) in rightBanners"
          :key="banner.id"
          :class="index !== 3 ? 'mb-2' : ''"
          class="d-flex rounded-lg elevation-3 flex-0-1"
          :href="getSlugByName(banner.image)"
        >
          <v-img :src="`./src/assets/images/${banner.image}`" />
        </v-card>
      </v-sheet> -->

    </v-sheet>
  </v-sheet>

  <HomeMainTopMenuItem
    v-for="category in parentCategories"
    :key="category.id"
    :activator="`.${getSlugByName(category.name)}-activator`"
    :brands="findBrandsOfParentCategory(category.id)"
    location-strategy="static"
    attach="#parent-item"
    width="100%"
    height="100%"
    transition="fade-transition"
    :open-on-hover="mdAndUp"
  ></HomeMainTopMenuItem>
</template>

<style>
.position-fixed {
  position: fixed;
}
</style>
