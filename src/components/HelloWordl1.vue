<script setup>
import { storeToRefs } from "pinia";
import { useCounterStore } from "../stores/counter";

const { count, doubleCount} = storeToRefs(useCounterStore());
const { increment } = useCounterStore();
</script>

<template>
	<button @click="increment">count: {{ count }}</button>
	<div>{{ doubleCount }}</div>
</template>

<style></style>
