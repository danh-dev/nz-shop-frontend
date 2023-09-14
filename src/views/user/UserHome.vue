<script setup>
import UserCard from "@/components/user/UserCard.vue";
import UserCarousel from "@/components/user/UserCarousel.vue";
import UserWishlist from "@/components/user/UserWishlist.vue";
import UserCardItem from "@/components/user/UserCardItem.vue";
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
            class="mb-4"
        ></UserCard>

    </v-sheet>
</template>

<style></style>