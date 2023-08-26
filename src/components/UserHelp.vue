<script setup>
defineProps({ img: String });
</script>

<template>
    <v-card
        class="d-flex align-center"
        rounded="lg"
    >
        <v-avatar
            rounded="0"
            class="ma-3"
            size="50"
            :image="img"
        />
        <v-card-title class="d-flex flex-column">
            <div>
                <slot name="name"></slot>
            </div>
            <div>
                <slot name="contact"></slot>
            </div>
        </v-card-title>

    </v-card>
</template>

<style></style>