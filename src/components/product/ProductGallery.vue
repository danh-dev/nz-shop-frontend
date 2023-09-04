<script setup>
import getSlugByName from "../../utils/getSlugByName.js";

defineProps({
	products: Array,
});
const url = "http://127.0.0.1:8000/";
</script>

<template>
	<v-item-group
		class="d-none d-md-none d-lg-block"
		v-for="item in products"
		:key="item.id"
	>
		<v-item>
			<v-card
				class="d-flex flex-column align-center me-2"
				height="200"
				width="250"
				elevation="3"
				rounded="lg"
			>
				<h6>{{ item.name }}</h6>
				<p>{{ item.sell_price }}</p>
			</v-card>
		</v-item>

	</v-item-group>
</template>

<style scoped></style>
