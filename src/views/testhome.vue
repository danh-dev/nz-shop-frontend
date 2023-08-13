<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card v-for="product in datas" :key="product.code">
    <h4><a class="titleProduct" :href="product.url">{{ product.name }}</a></h4>
    <div class="listVariations py-1">
      <v-badge color="white" class="border rounded px-2 me-2" v-for="variation in product.variations"
        :key="variation" :content="variation" inline></v-badge>
    </div>
    <div class="d-flex justify-space-between">
      <div class="productPrice py-1">
        <span v-if="product.priceSale" class="sale-price text-body-1 text-red-darken-2 font-weight-bold me-2">
          {{ formatPrice(product.priceSale) }}
        </span>
        <span :class="!product.priceSale ?
                  'text-body-1 text-red-darken-2 font-weight-bold' : 'regular-price text-body-2'
                  ">
          {{ formatPrice(product.priceRegular) }}
        </span>
      </div>
      <v-btn @click="cartStore.add(product.id)" prepend-icon="$vuetify">
        Button
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
import data from "@/data";

import { ref } from "vue";
import { useCartStore } from "@/stores/cart";

const datas = ref(data);
const cartStore = useCartStore();

</script>

<style scoped></style>