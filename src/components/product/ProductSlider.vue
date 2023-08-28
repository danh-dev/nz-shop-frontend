<!-- eslint-disable vue/valid-v-slot -->
<script setup>
import ProductSliderArrow from "./ProductSliderArrow.vue";
defineProps({
	gallery: String,
});

const url = "http://127.0.0.1:8000/";
</script>

<template>
	<v-carousel
		hide-delimiters
		cycle
		interval="5000"
		show-arrows="hover"
		class="rounded-lg"
	>
		<template v-slot:prev="{ props }">
			<ProductSliderArrow
				:icon="props.icon"
				@click="props.onClick"
				:class="[props.class]"
			/>
		</template>
		<template v-slot:next="{ props }">
			<ProductSliderArrow
				:icon="props.icon"
				@click="props.onClick"
				:class="[props.class]"
			/>
		</template>
		<v-carousel-item
			v-for="image in gallery.split('|')"
			:key="image"
			:src="`${url}${image}`"
			height="100%"
		/>
	</v-carousel>
</template>

<style></style>
