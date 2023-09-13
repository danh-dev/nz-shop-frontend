<script setup>
import { useDisplay } from "vuetify";

import { storeToRefs } from "pinia";

import HomeMainTopMenuItem from "../home/HomeMainTopMenuItem.vue";
import HomeMainTopMenuList from "../home/HomeMainTopMenuList.vue";
import useCategoryStore from "../../stores/category";
import getSlugByName from "../../utils/getSlugByName";

const categoryStore = useCategoryStore();
const { parentCategories } = storeToRefs(categoryStore);
const { findBrandsOfParentCategory } = categoryStore;

const { mdAndUp, lgAndUp } = useDisplay();
</script>

<template>
  <v-overlay>
    <v-container :fluid="!lgAndUp">
      <v-sheet
        class="d-flex mb-4 bg-transparent"
        :height="mdAndUp ? '23rem' : '20rem'"
      >
        <v-sheet
          width="15rem"
          max-width="23%"
          class="d-none d-sm-block rounded-lg overflow-hidden mr-3 py-1"
        >
          <HomeMainTopMenuList
            class="py-0 d-flex flex-column scrollbar"
            height="100%"
            modal="-modal"
          />
        </v-sheet>
        <v-sheet
          id="parent"
          class="d-flex flex-1-1"
          position="relative"
          color="transparent"
          width="calc(100% - 15rem - 12px)"
          min-width="calc(77% - 12px)"
        >
        </v-sheet>
      </v-sheet>
    </v-container>

    <HomeMainTopMenuItem
      v-for="category in parentCategories"
      :key="category.id"
      :activator="`.${getSlugByName(category.name)}-activator-modal`"
      :brands="findBrandsOfParentCategory(category.id)"
      location-strategy="static"
      attach="#parent"
      width="100%"
      height="100%"
      transition="fade-transition"
      :open-on-hover="mdAndUp"
    ></HomeMainTopMenuItem>
  </v-overlay>
</template>

<style></style>