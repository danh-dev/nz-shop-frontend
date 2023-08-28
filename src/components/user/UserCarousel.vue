<script setup>
import { ref } from "vue";

const items = ref([
    {
        src: "	https://cdn2.cellphones.com.vn/x/media/tmp/catalog/product/s/l/sliding-zfold-moi-2023-dat-hang.png",
    },
    {
        src: "https://cdn2.cellphones.com.vn/x/media/tmp/catalog/product/s/l/sliding-tab-s9-dat-hang.png",
    },
    {
        src: "https://cdn2.cellphones.com.vn/x/media/tmp/catalog/product/w/a/watch-sliding-009.png",
    },

]);


</script>
<template>
    <v-card
        color="red-accent-1"
        class="d-flex flex-column align-center pa-5"
        rounded="xl"
    >
        <v-sheet
            color="red-accent-4"
            class="px-8 py-2 text-h5 text-uppercase mb-3"
            rounded="lg"
        >Chương trình nổi
            bật</v-sheet>
        <v-carousel
            class="rounded-xl"
            height="100%"
            cycle
            :show-arrows="false"
            hide-delimiter-background
        >
            <v-carousel-item
                v-for="(item, i) in items"
                :key="i"
                :src="item.src"
            ></v-carousel-item>
        </v-carousel>
    </v-card>
</template>
