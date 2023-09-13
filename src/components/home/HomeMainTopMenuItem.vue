<script setup>
import getSlugByName from "@/utils/getSlugByName";

defineProps({
  brands: Array,
  others: Array,
});
</script>

<template>
  <v-menu>
    <v-sheet
      class="d-flex overflow-auto"
      min-height="100%"
    >
      <v-list
        class="overflow-visible"
        width="33%"
        v-if="brands?.length > 0"
      >
        <v-list-subheader>Thương hiệu</v-list-subheader>
        <v-hover
          v-for="brand in brands"
          :key="brand.id"
          #default="{ isHovering, props }"
        >
          <v-list-item
            v-bind="props"
            :value="brand.name"
            density="compact"
            color="red-accent-4"
            :class="[isHovering ? 'text-red-accent-4' : '']"
            :to="`/danh-muc/${getSlugByName(brand.name)}`"
          >
            <v-list-item-title>{{ brand.name }}</v-list-item-title>
          </v-list-item>
        </v-hover>

      </v-list>
      <v-list
        class="overflow-visible"
        width="33%"
        v-if="others?.length > 0"
      >
        <v-list-subheader>Khác</v-list-subheader>
        <v-hover
          v-for="item in others"
          :key="item.id"
          #default="{ isHovering, props }"
        >
          <v-list-item
            v-bind="props"
            :value="item.name"
            density="compact"
            color="red-accent-4"
            :class="[isHovering ? 'text-red-accent-4' : '']"
            :to="`/danh-muc/${getSlugByName(item.name)}`"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-hover>

      </v-list>
    </v-sheet>

  </v-menu>
</template>

<style></style>