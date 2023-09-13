<script setup>
import ProductThumbnail from "./ProductThumbnail.vue";

defineProps({
	gallery: String,
	model: Number,
	maxModel: Number,
});

defineEmits(["handleGroupButtonClick"]);

const url = "http://127.0.0.1:8000/";
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
				v-for="(thumbImg, index) in gallery.split('|')"
				:key="thumbImg"
				@click="$emit('handleGroupButtonClick', index)"
				:style="[
					model === index ? { paddingTop: '2px', borderBottom: '2px solid red' } : '',
					maxModel > 4 ? { translate: `${-100 * (maxModel - 4)}%` } : {},
				]"
				:class="[model === index ? 'text-body-1' : 'text-body-2']"
			>
				<v-img
					:src="`${url}${thumbImg}`"
					class="rounded"
					width="70"
					height="70"
				/>
			</ProductThumbnail>
		</v-slide-x-transition>
	</v-sheet>
</template>

<style></style>
