<script setup>
import {useSeoMeta} from "@unhead/vue";
import {useRoute} from "vue-router";

const route = useRoute();

route.meta.title = "Trang quản trị Admin"
useSeoMeta({
  title: route.meta.title,
})

</script>

<template>
  <router-link to="user">test</router-link>
</template>

<style scoped>

</style>