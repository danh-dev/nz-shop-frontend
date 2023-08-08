<script setup>
defineProps({
  product: Object
});
</script>

<template>
  <v-card
    class="pt-8 overflow-hidden product-card"
    rounded="lg"
    v-ripple
    hover
    elevation="2"
  >
    <v-sheet>
      <v-sheet class="d-flex">
        <v-img
          :src=product.image
          max-height="10rem"
          max-width="10rem"
          class="mx-auto"
          :aspect-ratio="1"
          cover
        >
        </v-img>
      </v-sheet>
      <v-card-item>
        <v-card-title class="text-body-2 font-weight-bold text-wrap">
          {{ product.name }}
        </v-card-title>
        <v-sheet class="d-flex align-center">
          <v-sheet class="me-2 text-body-1 text-red-accent-4 font-weight-bold ">
            {{ product.price }}
          </v-sheet>
          <v-sheet class="text-decoration-line-through">
            {{ product.prePrice }}
          </v-sheet>
        </v-sheet>
      </v-card-item>

      <v-card-text>
        <v-rating
          :model-value="3.5"
          color="amber"
          density="compact"
          half-increments
          readonly
          size="small"
        >
        </v-rating>
      </v-card-text>
    </v-sheet>


    <v-card-actions class="justify-end">
      <span>Yeu thich</span>
      <v-rating
        color="red-accent-4"
        size="small"
        length="1"
        empty-icon="mdi-heart-outline"
        full-icon="mdi-heart"
        clearable
        hover
      >
      </v-rating>
    </v-card-actions>

    <v-sheet
      position="absolute"
      location="top left"
      color="red-accent-4"
      class="px-2"
      rounded="be-lg"
    >
      <v-sheet
        class="text-caption"
        color="transparent"
      >
        Giam {{ 0 }}%
      </v-sheet>
    </v-sheet>
  </v-card>
</template>

<style></style>