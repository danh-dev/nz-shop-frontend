<script setup>
import UserCardBadge from "./UserCardBadge.vue";
import {siteData} from "@/stores/globals";
defineProps({
    user: Object
});
const siteStore = siteData();
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString();
  return `${day}/${month}/${year}`;
}
</script>
<template>
    <v-card
        rounded="xl"
        class="d-flex flex-column align-center py-10"
    >
        <div>Xin Chào</div>
        <h2 class="text-uppercase text-red-accent-4">{{ siteStore.userInfo.full_name}}</h2>
        <v-sheet
            width="100%"
            class="d-flex justify-space-around "
        >
            <UserCardBadge>
                <template #icon>mdi-calendar-account-outline</template>
                <template #name>Ngày tham gia</template>
                <template #data>{{ formatDate(siteStore.userInfo.created_at)}}</template>
            </UserCardBadge>
        </v-sheet>
    </v-card>
</template>
<style></style>