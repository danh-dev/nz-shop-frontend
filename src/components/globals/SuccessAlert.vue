<script setup>
defineProps({
  title: String,
  to: Object,
  show: Boolean,
});
</script>

<template>
  <v-alert
    density="compact"
    :text="title"
    type="success"
    variant="tonal"
    closable
    prominent
    :model-value="show"
  >
    <template
      #append
      v-if="to"
    >
      <v-btn
        color="success"
        variant="outlined"
        :to="to"
      >Xem danh sách
      </v-btn>
    </template>
  </v-alert>
</template>

<style></style>