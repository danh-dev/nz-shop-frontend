<script setup>
import ProductCard from "@/components/globals/ProductCard.vue";

defineProps({
  productsLength: Number,
  products: Array,
  productsPerPages: Number,
  page: Number
});
</script>

<template>
  <v-sheet class="d-flex flex-wrap">
    <v-sheet
      :width="`calc((100% - ${12 * (productsLength - 1)}px) / ${productsLength})`"
      v-for="(product, index) in products.slice(productsPerPages * (page - 1), productsPerPages * page)"
      :key="product.id"
      :class="index % productsLength === productsLength - 1 ? `me-0` : `me-3`"
      class="mb-3"
    >
      <ProductCard
        :product="product"
        :href="`/san-pham/${product.slug}`"
      ></ProductCard>
    </v-sheet>
  </v-sheet>
</template>

<style></style>