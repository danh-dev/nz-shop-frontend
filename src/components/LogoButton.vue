<script setup>
defineProps({
  logo: String
});
</script>

<template>
  <v-btn
    class="pa-0 logo-button"
    rounded="lg"
    :ripple="false"
  >
    <v-img
      :src="logo"
      width="50px"
    ></v-img>

  </v-btn>
</template>

<style>
.logo-button:hover {
  color: white;
}
</style>