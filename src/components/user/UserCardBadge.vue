<script setup></script>

<template>
    <v-sheet class="d-flex flex-column align-center">
        <div>
            <slot name="name"></slot>
        </div>
        <v-icon
            size="50"
            color="red-accent-4"
        >
            <slot name="icon"></slot>
        </v-icon>
        <div>
            <slot name="data"></slot>
        </div>
    </v-sheet>
</template>

<style></style>