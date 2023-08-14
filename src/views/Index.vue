<template>
  <div>
    <v-btn
        @click="cartStore.add(1)"
    >
      Add to cart
    </v-btn>
  </div>
</template>
<script setup>
import {useCartStore} from "../stores/cart"

const cartStore = useCartStore();
</script>

<style scoped>

</style>