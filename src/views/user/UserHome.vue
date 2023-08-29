<script setup>
import UserCard from "@/components/user/UserCard.vue";
import UserCarousel from "@/components/user/UserCarousel.vue";
import UserCardItem from "@/components/user/UserCardItem.vue";
defineProps({ user: Object });
</script>

<template>
    <v-sheet
        class="f-flex flex-column"
        width="100%"
    >
        <UserCarousel
            class="mb-4"
            height="300px"
        >
        </UserCarousel>

        <UserCard
            :user="{ id, name, rank, date, point } = user"
            class="mb-4"
        ></UserCard>

    </v-sheet>
</template>

<style></style>