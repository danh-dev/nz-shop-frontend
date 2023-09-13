<script setup>
import product from "../../product.js";
</script>

<template>
	<v-sheet>
		<!-- Begin : Thông tin sản phẩm -->
		<v-sheet
			class="my-2"
			v-for="item in product.productInfo"
			:key="item.id"
		>
			<h4 class="py-2">Thông tin sản phẩm</h4>
			<v-sheet class="text-medium d-flex py-1">
				<v-icon>mdi-cellphone</v-icon>
				<p class="px-2">{{ item.status }}</p>
			</v-sheet>

			<v-sheet class="text-medium d-flex py-1">
				<v-icon>mdi-gift-open</v-icon>
				<summary class="px-2">
					<p
						v-for="item in product.productAccessories"
						:key="item.id"
					>
						{{ item.name }}
					</p>
				</summary>
			</v-sheet>

			<v-sheet class="text-medium d-flex py-1">
				<v-icon>mdi-security</v-icon>
				<p class="px-2">{{ item.guarantee }}</p>
			</v-sheet>
			<v-sheet class="text-medium d-flex py-1">
				<v-icon>mdi-receipt-text</v-icon>
				<p class="px-2">{{ item.invoice }}</p>
			</v-sheet>
		</v-sheet>

		<!-- Begin : Đặc điểm nổi bật -->
		<v-sheet
			elevation="3"
			rounded="lg"
			class="text-medium text-justify my-3 pa-2"
		>
			<h3 class="text-uppercase text-center text-danger p-1">đặc điểm nổi bật</h3>
			<v-sheet
				class="d-flex align-center py-1"
				v-for="item in product.productSpecial"
				:key="item.id"
			>
				<v-icon
					size="20"
					color="green"
				>mdi-check-circle</v-icon>
				<p class="px-1">{{ item.name }}</p>
			</v-sheet>

			<RouterLink
				to="#"
				class="text-decoration-none text-dark"
				v-for="item in product.productInfo"
				:key="item.id"
			>
				<strong class="text-danger">{{ item.name }}</strong>{{ item.description }}
			</RouterLink>
		</v-sheet>
	</v-sheet>
</template>

<style></style>
