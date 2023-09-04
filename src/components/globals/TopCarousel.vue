<script setup>
import getSlugByName from "../../utils/getSlugByName";

const url = import.meta.env.VITE_PUBLIC_URL;

defineProps({
  gallery: Array,
});

</script>

<template>
  <v-carousel
    hide-delimiters
    cycle
    interval="5000"
    show-arrows="hover"
  >
    <template #prev="{ props }">
      <v-btn
        :class="[props.class, 'text-red-accent-4']"
        :icon="props.icon"
        @click="props.onClick"
      ></v-btn>
    </template>

    <template #next="{ props }">
      <v-btn
        :class="[props.class, 'text-red-accent-4']"
        :icon="props.icon"
        @click="props.onClick"
      ></v-btn>
    </template>
    <v-carousel-item
      v-for="item in gallery"
      :key="item.id"
    >
      <v-card
        width="100%"
        height="100%"
        :href="`/${getSlugByName(item.name)}`"
        v-ripple="false"
        class="d-flex align-center"
      >
        <v-img :src="`${url}${item.image}`" />
      </v-card>
    </v-carousel-item>
  </v-carousel>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s linear;
}

.list-enter-from,
.list-leave-to {
  transform: translateX(-100%);
}
</style>