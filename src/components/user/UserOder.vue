<script setup>
import { ref } from "vue";
const count = ref(0);
const processes = ref(["chua giao hang", "dang giao", "gan toi", "da giao"]);

</script>


<template>
    <v-sheet
        class="d-flex align-center justify-space-between"
        color="blue-lighten-3"
        rounded="xl"
        position="relative"
        style="z-index: -1;"
    >

        <v-sheet
            class="d-flex align-center justify-space-between  "
            :width="`calc(100%/3 * ${count})`"
            height="100%"
            color="red"
            rounded="xl"
            position="absolute"
            style="z-index: -1;"
        ></v-sheet>

        <v-sheet
            v-for="(process, index) in processes"
            :key="index"
            color="red-accent-4"
            rounded="circle"
            width="30px"
            height="30px"
            position="relative"
        >
            <img
                v-if="index === count"
                src="../assets/wired-lineal-497-truck-delivery.apng"
                style="position: absolute; width: 60px; height: 60px;translate: -15px -15px ; top: -30px; left: 0px;"
            >
            <v-sheet
                class="text-center"
                color="blue"
                width="100px"
                position="absolute"
                style="translate: -35px 0px;top: 30px; left: 0px;"
            > {{ process }} </v-sheet>
        </v-sheet>

    </v-sheet>
</template>

<style></style>