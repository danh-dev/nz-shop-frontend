<script setup>
import { useDisplay } from "vuetify";

import HeaderLogoSmall from "./logos/HeaderLogoSmall.vue";
import HeaderLogoBig from "./logos/HeaderLogoBig.vue";

const { mdAndUp } = useDisplay();
</script>

<template>
  <v-sheet
    :min-width="mdAndUp ? '10rem' : ''"
    class="bg-transparent d-flex align-center"
  >
    <template v-if="mdAndUp">
      <HeaderLogoBig />
    </template>
    <template v-else>
      <HeaderLogoSmall />
    </template>
  </v-sheet>
</template>

<style></style>