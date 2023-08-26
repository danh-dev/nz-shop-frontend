<script setup>
import UserHelp from "../components/UserHelp.vue";
</script>

<template>
    <v-sheet
        class="d-flex flex-column justify-space-between "
        height="60%"
    >
        <UserHelp img="https://cellphones.com.vn/smember/_nuxt/img/headphones%201.c7d474f.png">
            <template #name>
                Tư vấn mua hàng(8h00-22h00)
            </template>
            <template #contact>1900.9000</template>

        </UserHelp>
        <UserHelp img="	https://cellphones.com.vn/smember/_nuxt/img/waranty%201.a9ef39d.png">
            <template #name>
                Bảo hành(8h00-21h00)
            </template>
            <template #contact>1900.9090</template>
        </UserHelp>
        <UserHelp img="	https://cellphones.com.vn/smember/_nuxt/img/bad-review.ac59f16.png">
            <template #name>
                Khiếu nại(8h00-21h00)
            </template>
            <template #contact>1900.9999</template>
        </UserHelp>
        <UserHelp
            class="mb-0"
            img="https://cellphones.com.vn/smember/_nuxt/img/message%201.259c9d3.png"
        >
            <template #name>
                Email
            </template>
            <template #contact>Duytam20031996@gmail.com</template>
        </UserHelp>
    </v-sheet>
</template>

<style></style>