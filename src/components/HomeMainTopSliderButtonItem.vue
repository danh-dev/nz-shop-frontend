<script setup></script>

<template>
  <v-btn
    variant="text"
    rounded="0"
    height="100%"
    v-ripple="{ class: `text-grey-darken-3` }"
  >
    <slot></slot>
  </v-btn>
</template>

<style></style>