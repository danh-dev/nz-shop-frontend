<script setup>
import { computed } from "vue";
const props = defineProps({
    product: Object,
});


</script>

<template>
    <v-card
        class="d-flex px-3 py-5"
        variant="elevated"
        height="150px"
    >
        <v-img
            :src="product.image"
            width="15%"
        />
        <v-sheet width="85%">
            <v-sheet class=" mb-3">{{ product.name }}
            </v-sheet>

            <v-sheet class="d-flex justify-end mb-3">Số lượng : <v-sheet class="text-red"> {{ product.quantity
            }}</v-sheet></v-sheet>


            <v-sheet class="d-flex justify-space-between">

                <v-sheet class="d-flex">
                    <v-sheet class="mr-3 text-red">{{ product.price }}</v-sheet>
                    <v-sheet class="text-decoration-line-through">{{ product.prePrice }}</v-sheet>
                </v-sheet>
                <v-btn
                    class="text-body-2 jutify-end"
                    variant="outlined"
                    color="red-accent-4"
                >Đánh giá</v-btn>
            </v-sheet>

        </v-sheet>
    </v-card>
</template>

<style></style>