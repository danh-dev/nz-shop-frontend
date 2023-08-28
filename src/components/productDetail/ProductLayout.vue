<script setup>
import ProductInfomation from "./ProductInfomation.vue";
import ProductAccessories from "./ProductAccessories.vue";
import ProductFAQ from "./ProductFAQ.vue";
import ProductReviews from "./ProductReviews.vue";
import ProductQA from "./ProductQA.vue";
import ProductSpecifications from "./ProductSpecifications.vue";
import ProductNews from "./ProductNews.vue";

import ProductSlider from "./ProductSlider.vue";
import ProductThumbnailGroup from "./ProductThumbnailGroup.vue";

import informations from "../../../public/informations.js";

import { onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
const { xs } = useDisplay();

// Product photos Slider
const model = ref(0);
const maxModel = ref(0);

const images = ref([
	{
		id: 1,
		src: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12s_4__1_2.jpg",
	},
	{
		id: 2,
		src: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_1.jpg",
	},
	{
		id: 3,
		src: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_6__1.jpg",
	},
	{
		id: 4,
		src: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_1__1.jpg",
	},
	{
		id: 5,
		src: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_8__1.jpg",
	},
	{
		id: 6,
		src: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_7__1.jpg",
	},
	{
		id: 7,
		src: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_4__1.jpg",
	},
	{
		id: 8,
		src: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/x/i/xiaomi-redmi-note-12-pro-5g_5__1.jpg",
	},
]);

const handleGroupButtonClick = index => {
	model.value = index;
};

watch(model, (cur, pre) => {
	if ((cur > pre && cur > maxModel.value) || maxModel.value - 4 > cur) {
		maxModel.value = cur;
	}
});

onMounted(() => {});
</script>

<template>
	<v-container class="my-3">
		<v-sheet
			class="d-flex align-center my-3 d-none d-sm-flex"
			v-for="information in informations"
			:key="information.id"
		>
			<b class="text-h6">{{ information.name }}</b>
			<v-rating
				:model-value="information.rating"
				color="yellow-darken-3"
				readonly
				density="compact"
				size="small"
				class="mx-2"
			></v-rating>
			<p class="text-body-1">{{ information.review }}</p>
		</v-sheet>

		<v-row>
			<v-col
				:cols="12"
				lg="8"
				md="8"
			>
				<!-- Begin : Slide hình ảnh sản phẩm -->
				<v-sheet
					max-height="30rem"
					width="100%"
					class="d-flex flex-column"
					:style="xs ? { aspectRatio: 16 / 9 } : { aspectRatio: 3 / 2 }"
				>
					<v-sheet
						class="ma-0"
						height="80%"
					>
						<ProductSlider
							height="100%"
							:images="images"
							v-model="model"
						/>
					</v-sheet>
					<v-sheet
						class="ma-0"
						height="20%"
					>
						<ProductThumbnailGroup
							class="d-flex overflow-hidden ma-1"
							height="100%"
							:images="images"
							:model="model"
							:maxModel="maxModel"
							@handleGroupButtonClick="handleGroupButtonClick"
						/>
					</v-sheet>
				</v-sheet>

				<!-- Thông tin sản phẩm -->
				<ProductInfomation />

				<!-- Phụ kiện mua cùng -->
				<h4 class="text-uppercase text-danger py-2">Phụ kiện mua cùng</h4>
				<ProductAccessories />

				<v-sheet class="d-md-block d-lg-none">
					<ProductSpecifications />
				</v-sheet>
			</v-col>

			<v-col
				:cols="12"
				md="4"
				lg="4"
			>
				<!-- Thông tin sản phẩm -->
				<v-sheet class="d-none d-md-flex d-md-none d-lg-block">
					<ProductSpecifications />
				</v-sheet>
			</v-col>
		</v-row>

		<v-row>
			<v-col :cols="12">
				<h4 class="text-uppercase">Sản phẩm tương tự</h4>
				<ProductAccessories />
			</v-col>
		</v-row>

		<v-row>
			<v-col
				:cols="12"
				lg="8"
				md="8"
			>
				<!-- Begin : Câu hỏi thường gặp -->
				<ProductFAQ />

				<!-- Begin: Đánh giá & nhận xét sản phẩm -->
				<ProductReviews />

				<!-- Begin : Hỏi đáp -->
				<ProductQA />
			</v-col>
			<v-col
				:cols="12"
				md="4"
				lg="4"
			>
				<!-- Tin tức -->
				<v-sheet class="d-none d-md-flex d-md-none d-lg-block">
					<ProductNews />
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>
</template>

<style>
.text-medium {
	font-size: 0.85rem;
}

.text-small {
	font-size: 0.7rem;
}

.mdi-star {
	color: goldenrod;
	font-size: 20px;
}

/* .border-light {
	border: 1px solid gainsboro;
	border-radius: 10px;
	box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15), 0 8px 12px rgba(0, 0, 0, 0.28);
	z-index: -1;
} */

.new > img:hover {
	transform: scale(1.05);
}

/* Begin : Design Modal */
.modal.open,
.product-modal.open,
.comment-modal.open {
	display: flex;
}

.modal,
.product-modal {
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.4);
	display: none;
	align-items: center;
	justify-content: center;
	animation: fadeIn linear 0.5s;
}

.modal-container {
	max-width: 600px;
	z-index: 3;
}

.product-modal-container {
	max-width: 600px;
	height: 500px;
	z-index: 3;
	border-radius: 10px !important;
}

.modal-close-btn,
.product-modal-close-btn {
	opacity: 0.9;
}

.modal-close-btn:hover,
.product-modal-close-btn:hover {
	opacity: 0.7;
}

.modal-header {
	height: 10%;
	color: #fff;
	font-size: 1.2rem;
}

.modal-body {
	max-height: 800px;
	padding: 16px;
	background-color: #fff;
	font-size: 0.9rem;
	height: 80%;
	overflow: auto;
	z-index: 1;
}

.modal-footer {
	background-color: #fff;
	font-size: 0.9rem;
	height: auto;
}

@keyframes fadeIn {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}

/* End : Design Modal */
@media screen and (max-width: 767px) {
	.action,
	.payment > .text-uppercase,
	.payment > p {
		font-size: 0.6rem;
	}
}

@media screen and (min-width: 768px) and (max-width: 1023px) {
}

@media screen and (min-width: 1024px) {
}
</style>
