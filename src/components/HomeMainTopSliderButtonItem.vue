<script setup></script>

<template>
  <v-btn
    variant="text"
    rounded="0"
    height="100%"
    width="20%"
    v-ripple="{ class: `text-grey-darken-3` }"
  >
    <slot />
  </v-btn>
</template>

<style></style>