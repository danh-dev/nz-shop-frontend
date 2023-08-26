<script setup>
import ProductModal from "./ProductModal.vue";
// import { ref } from "vue";
import informations from "../../../public/informations.js";
</script>

<template>
	<!-- Chọn sản phẩm theo loại, màu -->
	<v-sheet
		v-for="information in informations"
		:key="information.id"
	>
		<v-sheet>
			<h5 class="text-center text-uppercase mb-2">Lựa chọn sản phẩm yêu thích</h5>
			<v-btn
				v-for="design in information.designs"
				:key="design.id"
				:href="design.link"
				color="danger"
				variant="tonal"
				rounded="2"
				class="w-100 h-50 my-2 py-2 text-none text-center"
				>{{ design.name }} <br />
				{{ design.price }}
			</v-btn>
		</v-sheet>

		<v-sheet class="d-flex flex-column justify-content-center align-center text-none">
			<h5 class="text-uppercase pt-3">Lựa chọn màu yêu thích</h5>
			<v-radio-group inline>
				<v-radio
					v-for="color in information.colors"
					:key="color.id"
					:label="color.name"
					:value="color.value"
					color="danger"
				>
				</v-radio>
			</v-radio-group>
		</v-sheet>

		<v-btn
			color="danger"
			variant="text"
			size="large"
			class="w-100 text-h4"
			>{{ information.price }}</v-btn
		>

		<!-- Chương trình khuyến mãi -->
		<v-sheet
			rounded="2"
			class="my-3 p-2 border border-success"
		>
			<v-sheet class="d-flex">
				<v-icon
					size="20"
					color="danger"
					>mdi-gift</v-icon
				>
				<h5 class="text-uppercase text-danger px-1">Khuyến mãi</h5>
			</v-sheet>
			<p
				v-for="discount in information.discounts"
				:key="discount.id"
				class="text-medium p-1"
			>
				<v-icon
					size="18"
					color="green"
					class="px-2 text-justify"
					>mdi-check-circle</v-icon
				>
				{{ discount.name }}
			</p>
		</v-sheet>

		<!-- Mua ngay, Thêm giỏ hàng -->
		<v-sheet class="action d-flex mt-2 w-100">
			<v-btn
				rounded="0"
				href="#"
				stacked
				color="danger"
				class="text-white text-none w-75 rounded-s-lg"
			>
				<h3 class="text-uppercase">Mua ngay</h3>
				<p class="text-small text-center px-1">Giao nhanh trong 2 giờ hoặc nhận tại cửa hàng</p>
			</v-btn>
			<v-btn
				rounded="0"
				href="#"
				color="danger"
				variant="outlined"
				stacked
				class="px-1 text-none w-25 rounded-e-lg"
			>
				<v-icon>mdi-cart-plus</v-icon>
				<p class="text-small text-center">Thêm giỏ hàng</p>
			</v-btn>
		</v-sheet>

		<!-- Ưu đãi thêm -->
		<v-sheet
			border="1"
			class="my-3 p-2 rounded-lg text-medium text-justify border-success"
		>
			<h5 class="text-uppercase text-medium text-danger fw-bold py-1">Ưu đãi thêm</h5>
			<v-sheet
				v-for="promotion in information.promotions"
				:key="promotion.id"
			>
				<p class="py-1">
					<v-icon
						size="18"
						color="green"
						class="px-2"
						>mdi-check-circle</v-icon
					>
					{{ promotion.name }}
				</p>
			</v-sheet>
		</v-sheet>

		<!-- Thông số kỹ thuật -->
		<v-sheet
			elevation="3"
			rounded="2"
		>
			<v-table class="my-3 py-2 text-medium my-2">
				<thead>
					<tr>
						<th colspan="2">
							<div class="d-flex align-center">
								<v-icon color="danger">mdi-information-outline</v-icon>
								<h3 class="px-1 text-uppercase">Thông số kỹ thuật</h3>
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="specification in information.specifications"
						:key="specification.id"
					>
						<td style="width: 40%; font-weight: 600">{{ specification.title }}</td>
						<td>{{ specification.name }}</td>
					</tr>
				</tbody>
			</v-table>
			<ProductModal />
		</v-sheet>
	</v-sheet>
</template>

<style></style>
