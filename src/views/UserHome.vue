<script setup>
import UserCard from "../components/UserCard.vue";
import UserCarousel from "../components/UserCarousel.vue";
import UserCardItem from "../components/UserCardItem.vue";
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
        <UserCardItem :user="user">
        </UserCardItem>

    </v-sheet>
</template>

<style></style>