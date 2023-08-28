<script setup></script>

<template>
  <v-sheet class="mb-2">
    <v-sheet class="d-flex align-center mb-2">
      <h2 class="font-weight-bold text-uppercase">
        <slot name="title"></slot>
      </h2>
      <v-sheet class="ms-auto">
        <slot name="button"></slot>
      </v-sheet>
    </v-sheet>

    <slot name="content"></slot>
  </v-sheet>
</template>

<style></style>