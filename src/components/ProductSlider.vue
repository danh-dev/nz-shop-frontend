<script setup>
import ProductSliderArrow from "./ProductSliderArrow.vue";
defineProps({
	images: Array,
});
</script>

<template>
	<v-carousel
		hide-delimiters
		cycle
		interval="5000"
		show-arrows="hover"
		height="100%"
		class="rounded-lg"
	>
		<template #prev="{ props }">
			<ProductSliderArrow
				:icon="props.icon"
				@click="props.onClick"
				:class="[props.class, 'ms-n10 ps-5']"
			/>
		</template>
		<template #next="{ props }">
			<ProductSliderArrow
				:icon="props.icon"
				@click="props.onClick"
				:class="[props.class, 'me-n10 pe-5']"
			/>
		</template>
		<v-carousel-item
			v-for="image in images"
			:key="image.id"
			:src="image.src"
			cover
			height="100%"
		/>
	</v-carousel>
</template>

<style></style>
