<script setup>
import { useDisplay } from "vuetify";

defineProps({
	size: {
		type: String,
		default: "x-large"
	}
});

const { lgAndUp, mdAndUp } = useDisplay();
</script>

<template>
	<v-btn
		variant="text"
		class="text-none text-grey-lighten-5"
		:height="lgAndUp ? 'auto' : '4rem'"
		min-height="2.5rem"
		:rounded="mdAndUp ? 'lg' : '0'"
	>
		<v-icon :size=size>
			<slot name="icon"></slot>
		</v-icon>
		<v-sheet
			class="d-none d-md-block bg-transparent text-body-2 text-wrap text-center"
			max-width="4.5rem"
			width="auto"
		>
			<slot name="label"></slot>
		</v-sheet>
		<slot name="badge"></slot>
	</v-btn>
</template>

<style></style>
