<script setup>

import { ref, onMounted } from "vue";

const scrollTop = ref(0);

const handleScroll = () => {
  scrollTop.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<template>
  <VScaleTransition style="transform-origin: center;" class="scroll-to-top d-print-none">
    <VBtn v-show="scrollTop > 200" icon density="comfortable" @click="scrollToTop" color="red-accent-4">
      <VIcon size="22" color="white" icon="mdi-rocket" />
    </VBtn>
  </VScaleTransition>
</template>

<style>
.scroll-to-top {
  position: fixed !important;
  z-index: 999;
  inset-block-end: 5%;
  inset-inline-end: 25px;
}
</style>
