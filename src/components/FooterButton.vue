<script setup>
import { useDisplay } from "vuetify";

const { width } = useDisplay();
</script>

<template>
  <v-btn class="pa-0">
    <v-icon>
      <slot name="icon"></slot>
    </v-icon>
    <v-sheet
      :class="width < 390 ? 'd-none' : 'd-block'"
      color="transparent"
    >
      <slot name="label"></slot>
    </v-sheet>
  </v-btn>
</template>

<style></style>