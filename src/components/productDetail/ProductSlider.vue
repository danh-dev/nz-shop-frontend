<!-- eslint-disable vue/valid-v-slot -->
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
			v-for="image in images"
			:key="image.id"
			:src="image.src"
			cover
			height="100%"
		/>
	</v-carousel>
</template>

<style></style>
