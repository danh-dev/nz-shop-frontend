<script setup>
defineProps({
  max: Number,
  step: Number,
  priceRange: Array,
});

defineEmits(["changePrice", "update:rangePrice"]);
</script>

<template>
  <v-sheet class="d-flex">
    <v-chip
      disabled
      color="red"
      class="v-chip–disabled-colorful"
    >
      {{ priceRange[0] }}
    </v-chip>
    <v-chip
      class="ms-auto me-0 v-chip–disabled-colorful"
      disabled
    >
      {{ priceRange[1] }}
    </v-chip>
  </v-sheet>

  <v-range-slider
    :model-value="priceRange"
    @update:model-value="$emit('update:rangePrice', $event)"
    :max="max"
    :step="step"
    color="red-accent-4"
    strict
    class="mx-0"
  >
    <template #prepend>
      <v-btn
        icon="mdi-minus-circle-outline"
        density="compact"
        variant="flat"
        :ripple="false"
        @click="$emit('changePrice', false)"
      ></v-btn>
    </template>
    <template #append>
      <v-btn
        icon="mdi-plus-circle-outline"
        density="compact"
        variant="flat"
        :ripple="false"
        @click="$emit('changePrice', true)"
      >
      </v-btn>
    </template>
  </v-range-slider>
</template>

<style>
.v-chip–disabled-colorful {
  opacity: 1 !important;
}
</style>