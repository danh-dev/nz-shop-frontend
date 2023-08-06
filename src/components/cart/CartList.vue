<template>
  <v-card class="my-2" elevation="0">
    <v-container id="productList">
      <v-row class="border-bottom my-3" v-for="(product,index) in data.productList" :key="index">
        <v-col cols="4">
          <v-img class="ma-auto" :width="160" aspect-ratio="1/1" cover :src="product.thumbnail"></v-img>
        </v-col>
        <v-col cols="8">
          <h4><a class="titleProduct" :href="product.url">{{ product.name }}</a></h4>
          <div class="listVariations py-1">
            <v-badge color="white" class="border rounded border-danger px-2 me-2"
                     v-for="variation in product.variations" :key="variation" :content="variation" inline></v-badge>
          </div>
          <div class="productPrice py-1">
            <span v-if="product.priceSale" class="sale-price text-body-1 text-red-darken-2 font-weight-bold me-2">
              {{ formatPrice(product.priceSale) }}
            </span>
            <span :class="
            !product.priceSale ?
            'text-body-1 text-red-darken-2 font-weight-bold' : 'regular-price text-body-2'
            ">
              {{ formatPrice(product.priceRegular) }}
            </span>
          </div>
          <span>a</span><input type="number" :value="product.quantity" readonly><span>a</span>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import {defineProps} from "vue";

const data = defineProps(["productList"]);

</script>

<style scoped>
.titleProduct {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
  text-decoration: none;
}

.regular-price {
  -webkit-text-decoration: line-through;
  text-decoration: line-through;
}
#productList>div:last-child{
  border-bottom:0 !important;
}
</style>