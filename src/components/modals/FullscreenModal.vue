<script setup>
import { ref, watch } from "vue";
import useCategoryStore from "../../stores/category";

import HomeMainMobileItem from "../home/HomeMainMobileItem.vue";
import MenuTree from "../home/MenuTree.vue";

const categoryStore = useCategoryStore();

const colors = ["red", "blue", "teal", "green", "orange", "cyan-accent", "lime", "yellow", "amber"];
const selected = ref({});

watch(() => categoryStore.parentCategories, () => {
  selected.value = categoryStore.parentCategories[0];
});
</script>

<template>
  <v-overlay>
    <v-sheet
      height="100%"
      class="overflow-auto d-flex"
    >
      <v-list
        class="d-flex flex-column py-0"
        width="5.5rem"
      >
        <HomeMainMobileItem
          v-for="(category, index) in categoryStore.parentCategories"
          :key="category.id"
          :category="category"
          :color="colors[index % colors.length]"
          :active="selected === category"
          @click="selected = category"
        >
          {{ category.name }}
        </HomeMainMobileItem>
      </v-list>
      <v-sheet
        id="mobile-menu"
        class="pa-2"
        position="relative"
        width="calc(100% - 5.5rem)"
      >
        <MenuTree :parentCategory="selected">
        </MenuTree>
      </v-sheet>
    </v-sheet>

  </v-overlay>
</template>

<style></style>