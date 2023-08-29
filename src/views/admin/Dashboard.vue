<template>
  <router-link to="user">test</router-link>
</template>
<script setup>
import {useSeoMeta} from "@unhead/vue";
import {useRoute} from "vue-router";

const route = useRoute();

route.meta.title = "Dashboard";
useSeoMeta({
  title: route.meta.title,
});

</script>
<style scoped>

</style>