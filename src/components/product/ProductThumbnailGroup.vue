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
		<v-slide-x-transition
			mode="in-out"
			group
		>
			<ProductThumbnail
				width="20%"
				height="100%"
				v-for="(thumbImg, index) in images"
				:key="thumbImg.id"
				@click="$emit('handleGroupButtonClick', index)"
				:style="[
					model === index ? { paddingTop: '2px', borderBottom: '2px solid red' } : '',
					maxModel > 4 ? { translate: `${-100 * (maxModel - 4)}%` } : {},
				]"
				:class="[model === index ? 'text-body-1' : 'text-body-2']"
			>
				<img
					:src="thumbImg.src"
					class="rounded w-100 h-100"
				/>
			</ProductThumbnail>
		</v-slide-x-transition>
	</v-sheet>
</template>

<style></style>
