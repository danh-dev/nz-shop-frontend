<script setup>
import getSlugByName from "@/utils/getSlugByName";

const url = import.meta.env.VITE_PUBLIC_URL;

defineProps({
  item: Object,
  width: String,
});
</script>

<template>
  <v-card
    rounded="lg"
    hover
    class="pa-1 card-scale"
    elevation="3"
    v-ripple
    :to="`/news/${getSlugByName(item.title)}`"
    :width="width"
  >
    <v-img
      :src="`${url}${item.image}`"
      width="100%"
      class="mb-2 rounded-t-lg"
    >
    </v-img>
    <v-sheet
      class="news-title text-body-1 font-weight-bold clamp-2 px-2"
      height="2.7rem"
      :title="item.title"
    >
      {{ item.title }}
    </v-sheet>
  </v-card>
</template>

<style>
.clamp-2 {
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.card-scale {
  transition: scale 0.5s ease-out;
}

.card-scale:hover {
  scale: 1.05;
}

.card-scale:hover .news-title {
  color: #D50000;
  text-decoration: underline;
}
</style>