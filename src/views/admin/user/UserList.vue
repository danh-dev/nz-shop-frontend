<template>
  <div>
zxczxczxc
  </div>
</template>

<script setup>
import {useSeoMeta} from "@unhead/vue";
import {useRoute} from "vue-router";

const route = useRoute();

route.meta.title = "User Management"
useSeoMeta({
  title: route.meta.title,
})
</script>

<style lang="scss" scoped>

</style>