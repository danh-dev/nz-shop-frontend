<script setup>
defineProps({
  direction: String,
  disabled: Boolean,
});
</script>

<template>
  <v-btn
    :id="direction"
    :location="direction"
    :disabled="disabled"
    :icon="disabled ? 'mdi-dots-horizontal' : `mdi-chevron-${direction}`"
    :style="{ translate: direction === 'left' ? '-50%' : '50%' }"
    :class="[direction === 'left' ? 'ps-5' : 'pe-5', disabled ? 'text-red-accent-1' : 'text-red-accent-4']"
    position="absolute"
    density="compact"
    variant="elevated"
    size="x-large"
  />
</template>

<style></style>