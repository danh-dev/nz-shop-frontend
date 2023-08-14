<script setup>
import { ref, onMounted } from "vue";
import useCategoryStore from "../../stores/category";
import { storeToRefs } from "pinia";

import HomeMainMobileItem from "../HomeMainMobileItem.vue";
import MenuTree from "../MenuTree.vue";

const categoryStore = useCategoryStore();
const { parentCategories } = storeToRefs(categoryStore);

const colors = ["red", "blue", "teal", "green", "orange", "cyan-accent", "lime", "yellow", "amber"];
const selected = ref(null);

onMounted(() => {
  selected.value = parentCategories.value[0];
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
          v-for="(category, index) in parentCategories"
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