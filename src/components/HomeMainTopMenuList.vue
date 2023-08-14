<script setup>
import useCategoryStore from "../stores/category.js";
import { storeToRefs } from "pinia";
import getSlugByName from "../utils/getSlugByName";

import HomeMainItem from "./HomeMainItem.vue";
defineProps({
  modal: {
    type: String,
    default: "",
  },
});

const { parentCategories } = storeToRefs(useCategoryStore());

</script>

<template>
  <v-list>
    <v-hover
      v-for="category in parentCategories"
      :key="category.id"
      #default="{ isHovering, props }"
    >
      <HomeMainItem
        :class="[`${getSlugByName(category.name)}-activator${modal} flex-1-1`, isHovering ? 'text-red-accent-4' : '']"
        v-bind="props"
        :value="category.name"
        :href="`/categories/${getSlugByName(category.name)}`"
      >
        <template #icon>{{ category.icon }}</template>
        <template #name>{{ category.name }}</template>
      </HomeMainItem>
    </v-hover>

    <HomeMainItem :activatorClass="`sale-activator${modal} flex-1-1`">
      <template #icon>mdi-sale</template>
      <template #name>Khuyến mãi</template>
    </HomeMainItem>
    <HomeMainItem :activatorClass="`news-activator${modal} flex-1-1`">
      <template #icon>mdi-newspaper</template>
      <template #name>Tin tức</template>
    </HomeMainItem>
  </v-list>
</template>

<style></style>