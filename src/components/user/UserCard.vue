<script setup>
import UserCardBadge from "./UserCardBadge.vue";
defineProps({
    user: Object
});
</script>
<template>
    <v-card
        rounded="xl"
        class="d-flex flex-column align-center"
    >
        <v-avatar
            variant="elevated"
            size="80"
            image="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.0251fdd.png"
        ></v-avatar>
        <div>Xin Chào</div>
        <h2 class="text-uppercase text-red-accent-4">{{ user.name }}</h2>
        <v-sheet
            width="100%"
            class="d-flex justify-space-around "
        >
            <UserCardBadge>
                <template #icon>mdi-calendar-account-outline</template>
                <template #name>Ngày tham gia</template>
                <template #data>{{ user.date }}</template>
            </UserCardBadge>
            <UserCardBadge>
                <template #icon>mdi-medal-outline</template>
                <template #name>Hạng thành viên</template>
                <template #data>{{ user.rank }}</template>
            </UserCardBadge>
            <UserCardBadge>
                <template #icon>mdi-bitcoin</template>
                <template #name>Điểm tích lũy</template>
                <template #data>{{ user.point }}</template>
            </UserCardBadge>
        </v-sheet>
    </v-card>
</template>
<style></style>