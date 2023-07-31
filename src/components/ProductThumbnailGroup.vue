<script setup>
import ProductThumbnail from "./ProductThumbnail.vue";

defineProps({
	images: Array,
	model: Number,
	maxModel: Number,
});

defineEmits(["handleGroupButtonClick"]);
</script>

<template>
	<v-sheet class="d-flex overflow-hidden">
		<ProductThumbnail
			width="20%"
			height="100%"
			v-for="(image, index) in images"
			:key="image.id"
			@click="$emit('handleGroupButtonClick', index)"
			:style="[
				model === index ? { paddingTop: '2px', borderBottom: '2px solid red' } : '',
				{ transition: 'translate 0.3s' },
				maxModel > 4 ? { translate: `${-100 * (maxModel - 4)}%` } : {},
			]"
			:class="[model === index ? 'text-body-1' : 'text-body-2']"
		>
			<v-img
				:src="image.src"
				cover
				width="150"
				max-width="150"
				min-width="25"
				max-height="100%"
				min-height="100%"
				class="rounded"
			/>
		</ProductThumbnail>
	</v-sheet>
</template>

<style></style>
