<script setup>
import { ref } from "vue";
</script>

<template>
    <v-sheet width="100%">
        <v-card
            class="d-flex"
            variant="elevated"
            rounded="lg"
        >
            <v-btn
                class="text-center "
                rounded="lg"
                width="50%"
                variant="plain"
                @click="0"
            >
                <v-sheet class="text-body-2 text-red-accent-4"> Đơn hàng</v-sheet>
            </v-btn>
            <v-btn
                rounded="lg"
                class="text-center"
                width="50%"
                variant="plain"
                @click="0"
            >
                <v-sheet class="text-body-2 text-red-accent-4"> Tổng tiền tích lũy</v-sheet>

            </v-btn>
        </v-card>
        <v-container>
            <v-sheet class="d-flex mt-10 mb-10 justify-space-around">
                <v-btn
                    v-for="(promotion, index) in Promotions"
                    :key="promotion"
                    :value="promotion"
                    @click="0"
                >
                    <v-list-item-title>{{ promotion }}</v-list-item-title>
                </v-btn>
            </v-sheet></v-container>
    </v-sheet>
</template>

<style></style>