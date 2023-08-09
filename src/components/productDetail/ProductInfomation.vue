<script setup>
import product from "../../product.js";
</script>

<template>
	<v-sheet>
		<!-- Begin : Thông tin sản phẩm -->
		<v-sheet class="my-2" v-for="detail in product.details" :key="detail.id">
			<h4 class="py-2">Thông tin sản phẩm</h4>
			<v-sheet class="text-medium d-flex py-1">
				<v-icon>mdi-cellphone</v-icon>
				<p class="px-2">{{ detail.status }}</p>
			</v-sheet>

			<v-sheet class="text-medium d-flex py-1">
				<v-icon>mdi-gift-open</v-icon>
				<summary class="px-2">
					<p v-for="accessory in product.accessories" :key="accessory.id">
						{{ accessory.name }}
					</p>
				</summary>
			</v-sheet>

			<v-sheet class="text-medium d-flex py-1">
				<v-icon>mdi-security</v-icon>
				<p class="px-2">{{ detail.guarantee }}</p>
			</v-sheet>
			<v-sheet class="text-medium d-flex py-1">
				<v-icon>mdi-receipt-text</v-icon>
				<p class="px-2">{{ detail.invoice }}</p>
			</v-sheet>
		</v-sheet>

		<!-- Begin : Đặc điểm nổi bật -->
		<v-sheet elevation="3" rounded="lg" class="text-medium text-justify my-3 pa-2">
			<h3 class="text-uppercase text-center text-danger p-1">đặc điểm nổi bật</h3>
			<v-sheet class="d-flex align-center py-1" v-for="special in product.specials" :key="special.id">
				<v-icon size="20" color="green">mdi-check-circle</v-icon>
				<p class="px-1">{{ special.name }}</p>
			</v-sheet>

			<a href="#" class="text-decoration-none text-dark" v-for="detail in product.details" :key="detail.id">
				<strong class="text-danger">{{ detail.name }}</strong>{{ detail.description }}</a>
		</v-sheet>
	</v-sheet>
</template>

<style></style>
