<script setup>
import SpecificationsModal from "../modals/SpecificationsModal.vue";
import product from "../../product.js";
import { useCartStore } from "../../stores/cart.js";

const cartStore = useCartStore();
</script>

<template>
	<v-sheet>
		<!-- Choosing product: type, color -->
		<v-sheet>
			<v-sheet>
				<h5 class="text-center text-uppercase mb-2">Lựa chọn sản phẩm yêu thích</h5>
				<v-btn v-for="design in product.designs" :key="design.id" :href="design.url" color="#cd3545" variant="tonal"
					rounded="lg" class="w-100 h-50 my-2 py-2 text-none text-center">{{ design.name }} <br />
					{{ formatPrice(design.priceRegular) }}
				</v-btn>
			</v-sheet>

			<v-sheet class="d-flex flex-column justify-center align-center text-none">
				<h5 class="text-uppercase pt-3">Lựa chọn màu yêu thích</h5>
				<v-radio-group inline>
					<v-radio v-for="color in product.colors" :key="color.id" :label="color.name" :value="color.value"
						color="#cd3545">
					</v-radio>
				</v-radio-group>
			</v-sheet>

			<v-btn color="#cd3545" variant="text" size="large" class="w-100 text-h4">
				{{ formatPrice(product.priceRegular) }}
			</v-btn>
		</v-sheet>

		<!-- Promotions -->
		<v-sheet rounded="lg" elevation="0" class="my-3 pa-2 border-success">
			<v-sheet class="d-flex">
				<v-icon size="20" color="#cd3545">mdi-gift</v-icon>
				<h5 class="text-uppercase text-danger px-1">Khuyến mãi</h5>
			</v-sheet>
			<p v-for="discount in product.discounts" :key="discount.id" class="text-medium pa-1">
				<v-icon size="18" color="green" class="px-2 text-justify">mdi-check-circle</v-icon>
				{{ discount.name }}
			</p>
		</v-sheet>

		<!-- Buy now, Add to cart -->
		<v-sheet class="d-flex mt-2 w-100">
			<v-btn rounded="0" elevation="1" @click="cartStore.add(product.id)" href="" stacked color="#cd3545"
				class="text-white text-none text-caption w-75 rounded-s-lg">
				<h3 class="text-uppercase">Mua ngay</h3>
				<p class="text-caption text-center px-1">Giao nhanh trong 2 giờ hoặc nhận tại cửa hàng</p>
			</v-btn>
			<v-btn rounded="0" elevation="1" color="#cd3545" variant="outlined" stacked class="text-none w-25 rounded-e-lg"
				@click="cartStore.add(product.id)">
				<v-icon>mdi-cart-plus</v-icon>
				<p class="text-caption text-center">Thêm giỏ hàng</p>
			</v-btn>
		</v-sheet>

		<!-- More discounts -->
		<v-sheet rounded="lg" elevation="0" class="my-3 pa-2 text-medium text-justify border-success">
			<h5 class="text-uppercase text-medium text-danger py-1">Ưu đãi thêm</h5>
			<v-sheet v-for="promotion in product.promotions" :key="promotion.id">
				<p class="py-1">
					<v-icon size="18" color="green" class="px-2">mdi-check-circle</v-icon>
					{{ promotion.name }}
				</p>
			</v-sheet>
		</v-sheet>

		<!-- Specifications -->
		<v-sheet elevation="3" rounded="lg">
			<v-table class="my-3 py-2 text-medium my-2">
				<thead>
					<tr>
						<th colspan="2">
							<div class="d-flex align-center">
								<v-icon color="#cd3545">mdi-information-variant-circle</v-icon>
								<h3 class="px-1 text-uppercase">Thông số kỹ thuật</h3>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="specification in product.specifications" :key="specification.id">
						<td style="width: 40%; font-weight: 600">{{ specification.title }}</td>
						<td>{{ specification.name }}</td>
					</tr>
				</tbody>
			</v-table>
			<SpecificationsModal />
		</v-sheet>

	</v-sheet>
</template>

<style>
.border-success {
	border: 1px solid forestgreen;
}
</style>
