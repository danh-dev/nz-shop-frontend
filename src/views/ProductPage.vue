<script setup>
import { onMounted, ref } from "vue";

import router from "../router";

const product = ref(null);

onMounted(() => {
  product.value = router.currentRoute.value.params.slug;
});

</script>

<template>
  <h1>{{ product }}</h1>
</template>

<style></style>