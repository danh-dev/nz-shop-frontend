<script setup>
import HomeMainTopCarousel from "./HomeMainTopCarousel.vue";
import HomeMainTopMenuList from "./HomeMainTopMenuList.vue";
import HomeMainTopSliderButtonGroup from "./HomeMainTopSliderButtonGroup.vue";
import HomeMainTopMenuItem from "./HomeMainTopMenuItem.vue";

import { ref, watch } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { smAndDown } = useDisplay();
const images = ref([
  {
    id: 1,
    src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
  }, {
    id: 2,
    src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
  }, {
    id: 3,
    src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
  }, {
    id: 4,
    src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
  },
  {
    id: 5,
    src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
  }, {
    id: 6,
    src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
  }, {
    id: 7,
    src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
  }, {
    id: 8,
    src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
  },
]);
const model = ref(0);
const maxModel = ref(0);

const handleGroupButtonClick = (index) => {
  model.value = index;
};

watch(model, (cur, pre) => {
  if ((cur > pre && cur > maxModel.value) || maxModel.value - 4 > cur) {
    maxModel.value = cur;
  }
});

</script>

<template>
  <v-sheet
    class="d-flex"
    height="25rem"
  >
    <v-sheet
      :width="smAndDown ? '25%' : '20%'"
      class="d-none d-sm-block rounded-lg overflow-hidden elevation-15 mr-3 flex-1-1"
    >
      <HomeMainTopMenuList></HomeMainTopMenuList>
    </v-sheet>
    <v-sheet
      class="d-flex flex-1-1"
      :width="smAndDown ? '75%' : '80%'"
      position="relative"
      id="parent-item"
    >
      <v-sheet class="d-flex flex-column rounded-lg overflow-hidden elevation-15 flex-1-1">
        <v-sheet height="80%">
          <HomeMainTopCarousel
            height="100%"
            v-model="model"
            :images="images"
          ></HomeMainTopCarousel>
        </v-sheet>
        <v-sheet height="20%">
          <HomeMainTopSliderButtonGroup
            class="d-flex overflow-hidden"
            height="100%"
            :images="images"
            :model="model"
            :maxModel="maxModel"
            @handleGroupButtonClick="handleGroupButtonClick"
          />
        </v-sheet>
      </v-sheet>
      <v-sheet
        width="30%"
        class="d-none d-md-flex flex-column justify-space-between bg-transparent ms-3"
      >
        <v-img
          v-for="i in 3"
          :key="i"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          class="rounded-lg flex-1-1 elevation-15"
          :class="i !== 3 ? 'mb-2' : ''"
          :aspectRatio="16 / 9"
          cover
        />
      </v-sheet>
    </v-sheet>
  </v-sheet>

  <HomeMainTopMenuItem
    location-strategy="static"
    attach="#parent-item"
    width="100%"
    height="100%"
  ></HomeMainTopMenuItem>
</template>

<style></style>


<!-- <v-row
    class="ma-0"
    style="height: 25rem;"
  >
    <v-col
      :cols="smAndDown ? 3 : 2"
      class="h-100 pa-0 ma-0 rounded-lg overflow-hidden elevation-15"
    >
      <HomeMainTopMenuList></HomeMainTopMenuList>
    </v-col>
    <v-col
      :cols="smAndDown ? 0 : 7"
      class="h-100 pa-0 ma-0 rounded-lg overflow-hidden elevation-15"
      elevation="20"
    >
      <v-sheet
        id="parent-item"
        position="relative"
      >
        <HomeMainTopMenuItem
          location-strategy="static"
          attach="#parent-item"
          width="100%"
        ></HomeMainTopMenuItem>
      </v-sheet>

      <v-row class="h-75 ma-0">
        <HomeMainTopCarousel
          v-model="model"
          :images="images"
        ></HomeMainTopCarousel>
      </v-row>
<v-row class="h-25 ma-0">
        <HomeMainTopSliderButtonGroup
          class="d-flex overflow-hidden"
          height="100%"
          width="100%"
          :images="images"
          :model="model"
          :maxModel="maxModel"
          @handleGroupButtonClick="handleGroupButtonClick"
        />
      </v-row>
    </v-col>
<v-col
      cols="3"
      class="h-100 py-0 ma-0"
      :class="smAndDown ? 'd-none' : ''"
    >
      <HomeMainTopRightBanner></HomeMainTopRightBanner>
    </v-col>
  </v-row> -->