<script setup>
import useCategoryStore from "@/stores/category";
import getSlugByName from "@/utils/getSlugByName";

import LogoButton from "./LogoButton.vue";
defineProps({
  parentCategory: Object,
});

const { findBrandsOfParentCategory, findRecursiveCategorySlug } = useCategoryStore();

</script>

<template>
  <v-sheet class="d-flex align-center">
    <v-sheet class="text-body-1 font-weight-bold mb-3">{{ parentCategory.name || "" }}</v-sheet>
    <a
      :href="`/categories/${getSlugByName(parentCategory.name || '')}`"
      class="ms-auto text-body-2 text-decoration-none"
    >Xem tất cả</a>
  </v-sheet>
  <v-sheet class="text-body-2 font-weight-bold mb-2">Thương hiệu {{ parentCategory.name || "" }}</v-sheet>
  <v-sheet
    class="d-flex flex-wrap"
    width="100%"
  >
    <LogoButton
      v-for="( category, index ) in  findBrandsOfParentCategory(parentCategory.id || '') "
      :key="category.id"
      :image="category.image"
      :href="`/categories${findRecursiveCategorySlug(category)}`"
      class="mb-2"
      :class="index !== findBrandsOfParentCategory(parentCategory?.id).length - 1 ? 'me-2' : ''"
    ></LogoButton>
  </v-sheet>
  <v-sheet class="text-body-2 font-weight-bold mb-2">Hot</v-sheet>
</template>

<style></style>