<script setup>
import ProductInfomation from "./ProductInfomation.vue";
import ProductFAQ from "./ProductFAQ.vue";
import ProductReviews from "./ProductReviews.vue";
import ProductQA from "./ProductQA.vue";
import ProductSpecifications from "./ProductSpecifications.vue";
import ProductNews from "./ProductNews.vue";

import ProductSlider from "./ProductSlider.vue";
import ProductThumbnailGroup from "./ProductThumbnailGroup.vue";
import HomeMainProductSlider from "./HomeMainProductSlider.vue";

import product from "../../product.js";
import productGallery from "../../productGallery.js";

import { onMounted, ref, watch } from "vue";
import router from "../../router";
import { useDisplay } from "vuetify/lib/framework.mjs";
const { xs } = useDisplay();
onMounted( () => {
  const productName = router.currentRoute.value.params.productNameName;
});


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

const anotherAccessories = ref([
	{
		id: 1,
		image:
			"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_i_xu_ng_23__4_4.png",
		name: "Tai nghe không dây Redmi Buds 4",
		rating: 4.5,
		price: 890000,
		originPrice: 490000
	},
	{
		id: 2,
		image:
			"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/o/golf_candy_10.000mah_g80_1.png",
		name: "Pin sạc dự phòng Golf Candy 10.000mAh G80.",
		rating: 5,
		price: 175000,
		originPrice: 350000,
	},
	{
		id: 3,
		image:
			"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/r/group_135_1.png",
		name: "Củ sạc Baseus 25W, kèm cáp Type-C 1M",
		rating: 4,
		price: 300000,
		originPrice: 490000,
	},
	{
		id: 4,
		image:
			"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/f/r/frame_9_1_.png",
		name: "Củ sạc Xiaomi 20W cổng USB-C",
		rating: 5,
		price: 220000,
		originPrice: 300000,
	},
	{
		id: 5,
		image:
			"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/f/r/frame_2_1_2.png",
		name: "Dán cường lực Xiaomi Redmi Note 12",
		rating: 4,
		price: 150000,
		originPrice: 170000,
	},
	{
		id: 6,
		name: "Dán cường lực Xiaomi Redmi Note 12 LikGlass",
		image: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/g/r/group_249_5_.png",
		rating: 4,
		price: 120000,
		originPrice: 150000
	}
]);

const handleGroupButtonClick = index => {
	model.value = index;
};

watch(model, (cur, pre) => {
	if ((cur > pre && cur > maxModel.value) || maxModel.value - 4 > cur) {
		maxModel.value = cur;
	}
});

onMounted(() => { });
</script>

<template>
	<v-container class="">
		<v-sheet class="d-none d-sm-block d-md-block d-lg-block">
			<div class="d-flex align-center my-3">
				<b class="text-h6">{{ product.name }}</b>
				<v-rating :model-value="product.rating" color="yellow-darken-3" readonly density="compact" size="small"
					class="mx-2"></v-rating>
				<p class="text-body-1">{{ product.review }}</p>
			</div>
		</v-sheet>


		<!-- Product Photos Silder, Product Info, Another Accessories, Product Specifications  -->
		<v-row>
			<v-col :cols="12" lg="8" md="8">
				<!-- Product Photos Silder -->
				<v-sheet max-height="30rem" width="100%" class="d-flex flex-column"
					:style="xs ? { aspectRatio: 16 / 9 } : { aspectRatio: 3 / 2 }">
					<v-sheet class="ma-0" height="80%">
						<ProductSlider height="100%" :images="images" v-model="model" />
					</v-sheet>
					<v-sheet class="ma-0" height="20%">
						<ProductThumbnailGroup class="d-flex overflow-hidden ma-1" height="100%" :images="images" :model="model"
							:maxModel="maxModel" @handleGroupButtonClick="handleGroupButtonClick" />
					</v-sheet>
				</v-sheet>

				<!-- Product Info -->
				<ProductInfomation />

				<!-- Another Accessories -->
				<div class="d-none d-md-block d-lg-block">
					<h4 class="text-uppercase text-danger py-2">Phụ kiện mua cùng</h4>
					<HomeMainProductSlider :products="anotherAccessories" :products-show="3">
						<template #default="{ props }">
							<v-card color="" class="me-2 flex-1-0" width="calc((100% - 24px)/3)"
								:style="{ translate: `calc(${-props.percent}% - ${props.px}px)` }">
								<v-sheet>
									<v-img :src="props.product.image" class="w-100" />
									<div class="px-1 text-center">
										<p class="text-medium">{{ props.product.name }}</p>
										<v-rating half-increments :model-value="props.product.rating" color="yellow-darken-3" readonly density="compact"
											size="small" class="mx-2">
										</v-rating>
										<v-sheet class="pa-2 text-center text-danger d-flex align-center justify-space-between">
											<p class="text-danger font-bold">{{ formatPrice(props.product.price) }}</p>
											<p class="text-muted text-decoration-line-through text-medium">
												{{ formatPrice(props.product.originPrice) }}
											</p>
										</v-sheet>
									</div>
								</v-sheet>
							</v-card>
						</template>
					</HomeMainProductSlider>
				</div>

				<ProductSpecifications class="d-block d-md-none d-sm-none d-lg-none" />
			</v-col>

			<!-- Product Specifications -->
			<v-col :cols="12" md="4" lg="4">
				<v-sheet class="d-none d-md-flex d-md-none d-lg-block">
					<ProductSpecifications />
				</v-sheet>
			</v-col>
		</v-row>

		<!-- Product Gallery -->
		<v-row>
			<v-col :cols="12">
				<v-sheet class="d-none d-md-block d-lg-block">
					<h4 class="text-uppercase">Sản phẩm tương tự</h4>
					<HomeMainProductSlider :products="productGallery" :products-show="5">
						<template #default="{ props }">
							<v-card color="" class="me-2 flex-1-0" width="calc((100% - 40px)/5)"
								:style="{ translate: `calc(${-props.percent}% - ${props.px}px)` }">
								<v-sheet>
									<v-img :src="props.product.image" class="w-100" />
									<div class="px-1 text-center">
										<p class="text-medium font-bold">{{ props.product.name }}</p>
										<v-rating half-increments :model-value="props.product.rating" color="yellow-darken-3" readonly density="compact"
											size="small" class="mx-2">
										</v-rating>
										<v-sheet class="pa-2 text-center d-flex align-center justify-space-between">
											<p class="text-danger font-bold">{{ formatPrice(props.product.price) }}</p>
											<p class="text-muted text-decoration-line-through text-medium">
												{{ formatPrice(props.product.originPrice) }}
											</p>
										</v-sheet>
									</div>
								</v-sheet>
							</v-card>
						</template>
					</HomeMainProductSlider>
				</v-sheet>
			</v-col>
		</v-row>

		<!-- FAQ, Product Reviews, Q&A, News -->
		<v-row>
			<v-col :cols="12" lg="8" md="8">
				<!-- FAQ -->
				<ProductFAQ />

				<!-- Product REviews -->
				<ProductReviews />

				<!-- Q&A -->
				<ProductQA />
			</v-col>

			<!-- News -->
			<v-col :cols="12" md="4" lg="4">
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

.new>img:hover {
	transform: scale(1.05);
}

/* Begin : Design Modal */
.modal.open,
.productModal.open,
.commentModal.open,
.reviewModal.open {
	display: flex;
}

.modal,
.productModal,
.commentModal,
.reviewModal {
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

.productModal-container,
.reviewModal-container {
	width: 600px;
	max-width: 600px;
	height: 600px;
	z-index: 3;
	border-radius: 10px !important;
}



.modal-close-btn:hover,
.productModal-close-btn:hover,
.commentModal-close-btn:hover {
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

@keyframes fadeIn {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}
</style>
