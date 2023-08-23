<script setup>
import ProductInfomation from "../components/product/ProductInfomation.vue";
import ProductSpecifications from "../components/product/ProductSpecifications.vue";
import ProductReviews from "../components/product/ProductReviews.vue";
import ProductFAQ from "../components/product/ProductFAQ.vue";
import ProductQA from "../components/product/ProductQA.vue";
import ProductNews from "../components/product/ProductNews.vue";

import ProductSlider from "../components/product/ProductSlider.vue";
import ProductThumbnailGroup from "../components/product/ProductThumbnailGroup.vue";
import HomeMainProductSlider from "../components/product/HomeMainProductSlider.vue";

import product from "../product";

import { onMounted, ref, watch } from "vue";
import router from "../router";
// import useProductStore from "../stores/useProductStore";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { xs } = useDisplay();

// const { findProductBySlug } = useProductStore();
onMounted(() => {
	const productName = router.currentRoute.value.params.productNameName;
	// product.value = findProductBySlug(productName);
});

// Product photos Slider
const model = ref(0);
const maxModel = ref(0);


const handleGroupButtonClick = index => {
	model.value = index;
};

watch(model, (cur, pre) => {
	if ((cur > pre && cur > maxModel.value) || maxModel.value - 4 > cur) {
		maxModel.value = cur;
	}
});

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
			<v-col :cols="12" lg="8" md="12">

				<!-- Product Photos Silder -->
				<v-sheet max-height="30rem" width="100%" class="d-flex flex-column"
					:style="xs ? { aspectRatio: 16 / 9 } : { aspectRatio: 3 / 2 }">
					<v-sheet class="ma-0" height="80%">
						<ProductSlider height="100%" :images="product.thumbImg" v-model="model" />
					</v-sheet>
					<v-sheet class="ma-0" height="20%">
						<ProductThumbnailGroup class="d-flex overflow-hidden ma-1" height="100%" :images="product.thumbImg"
							:model="model" :maxModel="maxModel" @handleGroupButtonClick="handleGroupButtonClick" />
					</v-sheet>
				</v-sheet>

				<!-- Product Info -->
				<ProductInfomation />

				<!-- Another Accessories -->
				<div class="d-none d-sm-block d-md-block d-lg-block">
					<h4 class="text-uppercase text-danger py-2">Phụ kiện mua cùng</h4>
					<HomeMainProductSlider :products="product.anotherAccessories" :products-show="3">
						<template #default="{ props }">
							<v-card rounded="lg" class="me-2 flex-1-0" width="calc((100% - 24px)/3)"
								:style="{ translate: `calc(${-props.percent}% - ${props.px}px)` }">
								<v-sheet>
									<a href="#"><v-img :src="props.product.image" class="w-100" /></a>
									<div class="pa-1 text-center">
										<p class="text-body-2 font-bold"><a href="#">{{ props.product.name }}</a></p>
										<v-rating half-increments :model-value="props.product.rating" color="yellow-darken-3" readonly
											density="compact" size="small" class="mx-2">
										</v-rating>
										<v-sheet class="pa-2 text-center text-danger d-flex align-center justify-space-between">
											<p class="text-danger font-bold">{{ formatPrice(props.product.priceSale) }}</p>
											<p class="text-muted text-decoration-line-through text-medium">
												{{ formatPrice(props.product.price) }}
											</p>
										</v-sheet>
									</div>
								</v-sheet>
							</v-card>
						</template>
					</HomeMainProductSlider>
				</div>

				<ProductSpecifications class="d-block d-md-none d-sm-block d-lg-none" />
			</v-col>

			<!-- Product Specifications -->
			<v-col :cols="12" md="4" lg="4">
				<v-sheet class="d-none d-md-none d-md-none d-lg-block">
					<ProductSpecifications />
				</v-sheet>
			</v-col>
		</v-row>

		<!-- Product Gallery -->
		<v-row>
			<v-col :cols="12">
				<v-sheet class="d-none d-sm-none d-md-none d-lg-block" >
					<h4 class="text-uppercase text-danger">Sản phẩm tương tự</h4>
					<HomeMainProductSlider :products="product.productGallery" :products-show="5">
						<template #default="{ props }">
							<v-card rounded="lg" class="me-2 flex-1-0" width="calc((100% - 40px)/5)"
								:style="{ translate: `calc(${-props.percent}% - ${props.px}px)` }">
								<v-sheet>
									<a href="#"><v-img :src="props.product.image" class="w-100" /></a>
									<div class="pa-1 text-center">
										<p href="#" class="text-body-2 font-bold"><a href="#">{{ props.product.name }}</a></p>
										<v-rating half-increments :model-value="props.product.rating" color="yellow-darken-3" readonly
											density="compact" size="small" class="mx-2">
										</v-rating>
										<v-sheet class="pa-2 text-center d-flex align-center justify-space-between">
											<p class="text-danger font-bold">{{ formatPrice(props.product.priceSale) }}</p>
											<p class="text-muted text-decoration-line-through text-medium">
												{{ formatPrice(props.product.price) }}
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
			<v-col :cols="12" lg="8" md="12">
				<!-- FAQ -->
				<ProductFAQ />

				<!-- Product Reviews -->
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

.reviewModal-container {
	width: 500px;
	max-width: 500px;
	min-width: auto;
	height: 500px;
	z-index: 3;
	border-radius: 10px !important;
}

.productModal-container {
	width: 500px;
	max-width: 500px;
	min-width: auto;
	height: 600px;
	min-height: 300px;
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
