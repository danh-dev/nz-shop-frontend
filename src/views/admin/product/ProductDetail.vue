<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const product = ref([]);
onMounted(() => {
  console.log(route.params.code);
  //call API by route.params.code

  product.value = {
    id: 1,
    code: "ABCDEA",
    name: "Samsung Galaxy S23 Ultra 256GB abcdef adasd ádasdas adasdsa  ádsaá đâsd ádasdasdas  ádsaá đâsd ádasdasdas  ádsaá đâsd ádasdasdas  ádsaá đâsd ádasdasdas",
    image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/b/4/b48cd136-7366-4d01-8d58-8ee3d5dc93b7_1.jpg",
    price: 10000000,
    date: "20/10/2001",
  };


});
</script>

<template>
  <div>hello</div>
</template>

<style></style>