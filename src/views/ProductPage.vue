<script setup>
import { onMounted, ref } from "vue";

import router from "../router";
import getSlugByName from "../utils/getSlugByName.js";

const categoryNames = ref([]);

onMounted(() => {
  categoryNames.value = router.currentRoute.value.params.categorySlugs.map(getSlugByName);
});

</script>

<template>
  <h1>{{ categoryNames[0] }}</h1>
</template>

<style></style>