<script setup>
import UserOder from "./UserOder.vue";

defineProps({ user: Object });
</script>

<template>
    <v-card
        class="d-flex flex-column align-center"
        rounded="xl"
    >
        <v-icon
            size="50"
            color="red-accent-4"
        >
            mdi-truck-fast-outline
        </v-icon>
        <h2 class="text-red-accent-4">
            Đơn hàng của bạn
        </h2>
        <h3 class="mb-10">
            {{ user.orders }} đơn hàng

        </h3>
        <UserOder
            width="80%"
            height="20px"
            class="mb-15"
        ></UserOder>
        <v-card-actions class="mt-auto">
            <v-btn
                variant="outlined"
                color="red-accent-4"
            >Xem chi tiết</v-btn>
        </v-card-actions>


    </v-card>
</template>

<style></style>