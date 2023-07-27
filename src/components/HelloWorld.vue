<script setup>
import { storeToRefs } from "pinia";
import { useCounterStore } from "../stores/counter";

const { count, doubleCount} = storeToRefs(useCounterStore());
const { increment } = useCounterStore();
</script>

<template>
	<v-btn @click="increment">count: {{ count }}</v-btn>
	<div>{{ doubleCount }}</div>
</template>

<style></style>
