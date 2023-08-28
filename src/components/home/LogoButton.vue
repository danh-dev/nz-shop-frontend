<script setup>
defineProps({
  image: String
});

const url = "http://127.0.0.1:8000/";
</script>

<template>
  <v-btn
    class="pa-0 logo-button"
    rounded="lg"
    :ripple="false"
  >
    <v-img
      :src="`${url}${image}`"
      width="50px"
    ></v-img>

  </v-btn>
</template>

<style>
.logo-button:hover {
  color: white;
}
</style>