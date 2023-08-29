<script setup>
import { storeToRefs } from "pinia";

import useCategoryStore from "@/stores/category.js";
import getSlugByName from "@/utils/getSlugByName";

defineProps({
  modal: {
    type: String,
    default: "",
  },
});

const { parentCategories } = storeToRefs(useCategoryStore());

const url = import.meta.env.VITE_PUBLIC_URL;
</script>

<template>
  <v-list>
    <v-hover
      v-for="category in parentCategories"
      :key="category.id"
      #default="{ isHovering, props }"
    >
      <v-list-item
        :class="[`${getSlugByName(category.name)}-activator${modal} flex-1-1`, isHovering ? 'text-red-accent-4' : '']"
        v-bind="props"
        :value="category.name"
        :href="`/categories/${getSlugByName(category.name)}`"
        density="compact"
        class="py-0 ps-1 pr-0"
        color="red-accent-4"
        variant="text"
      >
        <div class="d-flex align-center">
          <v-icon class="me-3">
            <v-img
              :class="isHovering && 'change-my-color'"
              :src="`${url}${category.icon}`"
            />
          </v-icon>
          {{ category.name }}
          <v-icon
            class="ms-auto"
            icon="mdi-chevron-right"
          ></v-icon>
        </div>
      </v-list-item>
    </v-hover>
    <v-hover #default="{ isHovering, props }">
      <v-list-item
        :class="[`flex-1-1`, isHovering ? 'text-red-accent-4' : '']"
        v-bind="props"
        value="Khuyến mãi"
        density="compact"
        class="py-0 ps-1 pr-0"
        color="red-accent-4"
        variant="text"
        :activatorClass="`sale-activator${modal} flex-1-1`"
      >
        <div class="d-flex align-center">
          <v-icon
            class="me-3"
            icon="mdi-sale"
          />
          Khuyến mãi
          <v-icon
            class="ms-auto"
            icon="mdi-chevron-right"
          />
        </div>
      </v-list-item>
    </v-hover>

    <v-hover #default="{ isHovering, props }">
      <v-list-item
        :class="[`flex-1-1`, isHovering ? 'text-red-accent-4' : '']"
        v-bind="props"
        value="Tin tức"
        density="compact"
        class="py-0 ps-1 pr-0"
        color="red-accent-4"
        variant="text"
        :activatorClass="`news-activator${modal} flex-1-1`"
      >
        <div class="d-flex align-center">
          <v-icon
            class="me-3"
            icon="mdi-newspaper"
          />
          Tin tức
          <v-icon
            class="ms-auto"
            icon="mdi-chevron-right"
          />
        </div>
      </v-list-item>
    </v-hover>
  </v-list>
</template>

<style>
.change-my-color {
  filter: invert(12%) sepia(93%) saturate(3029%) hue-rotate(351deg) brightness(125%) contrast(126%);
}

.flex {
  justify-content: center;
}
</style>