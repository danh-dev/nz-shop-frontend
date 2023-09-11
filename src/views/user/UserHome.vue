<script setup>
import UserCard from "@/components/user/UserCard.vue";
import UserCarousel from "@/components/user/UserCarousel.vue";
import UserWishlist from "@/components/user/UserWishlist.vue";
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
        <UserWishlist
            class="mb-4"
            height="300px"
        >

        </UserWishlist>

    </v-sheet>
</template>

<style></style>