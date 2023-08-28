<script setup>
import { useRoute } from "vue-router";
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { camelCase, mapKeys } from "lodash";
// import ProductSpecifications from "../components/product/ProductSpecifications.vue";
import ProductReviews from "../components/product/ProductReviews.vue";
import ProductQA from "../components/product/ProductQA.vue";
import ProductNews from "../components/product/ProductNews.vue";

import ProductSlider from "../components/product/ProductSlider.vue";
import ProductThumbnailGroup from "../components/product/ProductThumbnailGroup.vue";
// import HomeMainProductSlider from "../components/product/HomeMainProductSlider.vue";
import useLoadingStore from "@/stores/loading";

const loadingStore = useLoadingStore();
const more = ref(false);

const url = "http://127.0.0.1:8000/";
const route = useRoute();
const { xs } = useDisplay();

const product = ref({});
const variants = ref([]);
const comments = ref([]);
const ratings = ref([]);
const posts = ref([]);

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

const fetchProduct = async () => {
	try {
		const res = await axios.get(`${url}api/products/${route.params.name}`);
		if (res.status === 200) {
			product.value = mapKeys(res.data.data, (value, key) => camelCase(key));
		}
	}
	catch (e) {
		console.log(e);
	}
};

const fetchVariants = async id => {
	try {
		const res = await axios.get(`${url}api/products/${id}/variants`);
		if (res.status === 200) {
			variants.value = res.data.data.map(variant => mapKeys(variant, (value, key) => camelCase(key)));

		}
	}
	catch (e) {
		console.log(e);
	}
};

const fetchComments = async id => {
	try {
		const res = await axios.get(`${url}api/products/${id}/comments`);
		if (res.status === 200) {
			comments.value = res.data.data;
		}
	}
	catch (e) {
		console.log(e);
	}
};

const fetchRatings = async id => {
	try {
		const res = await axios.get(`${url}api/products/${id}/comments`);
		if (res.status === 200) {
			ratings.value = res.data.data;
		}
	}
	catch (e) {
		console.log(e);
	}
};

const fetchRandomPosts = async () => {
	try {
		const response = await axios.get(`${url}api/randomPosts`);
		if (response.data.status === 200) {
			posts.value = response.data.data.filter(item => {
				return !item.isDeleted;
			});
		}
	} catch (error) {
		console.log("Error: ", error);
	}
};

onMounted(async () => {
	loadingStore.loading = true;
	fetchRandomPosts();
	await fetchProduct();
	await fetchVariants(product.value.id);
	loadingStore.loading = false;

	// await fetchComments(product.value.id);
	// await fetchRatings(product.value.id);
});
</script>

<template>
	<v-container class="">
		<v-sheet class="d-none d-sm-block d-md-block d-lg-block">
			<div class="d-flex align-center my-3">
				<h2>{{ product.name }}</h2>
				<!-- <v-rating
					:model-value="product?.rating"
					color="yellow-darken-3"
					readonly
					density="compact"
					size="small"
					class="mx-2"
				></v-rating> -->
				<!-- <p class="text-body-1">{{ product?.review }}</p> -->
			</div>
		</v-sheet>

		<!-- Product Photos Silder, Product Info, Another Accessories, Product Specifications  -->
		<v-row>
			<v-col
				:cols="12"
				lg="8"
				md="12"
			>

				<!-- Product Photos Silder -->
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
							:gallery="product.gallery || ''"
							v-model="model"
							class="rounded-xl"
						/>
					</v-sheet>
					<v-sheet
						class="ma-0"
						height="20%"
					>
						<ProductThumbnailGroup
							class="d-flex overflow-hidden ma-1"
							height="100%"
							:gallery="product.gallery || ''"
							:model="model"
							:maxModel="maxModel"
							@handleGroupButtonClick="handleGroupButtonClick"
						/>
					</v-sheet>
				</v-sheet>

				<!-- Product Info -->
				<v-sheet>
					<!-- Begin : Thông tin sản phẩm -->
					<!-- <v-sheet class="my-2">
						<h4 class="py-2">Thông tin sản phẩm</h4>
						<v-sheet class="text-medium d-flex py-1">
							<v-icon>mdi-cellphone</v-icon>
							<p class="px-2">{{ item.status }}</p>
						</v-sheet>

						<v-sheet class="text-medium d-flex py-1">
							<v-icon>mdi-gift-open</v-icon>
							<summary class="px-2">
								<p v-for="item in product.productAccessories" :key="item.id">
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
					</v-sheet> -->
				</v-sheet>


				<!-- Another Accessories -->
				<!-- <div class="d-none d-sm-block d-md-block d-lg-block">
					<h4 class="text-uppercase text-danger py-2">Phụ kiện mua cùng</h4>
					<HomeMainProductSlider :products="product?.anotherAccessories || []" :products-show="3">
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
				</div> -->

				<!-- <ProductSpecifications class="d-block d-md-none d-sm-block d-lg-none" /> Mobile -->
			</v-col>

			<v-col
				cols="12"
				md="12"
				lg="4"
			>
				<!-- Product Specifications -->
				<v-sheet>
					<!-- Choosing product: type, color -->
					<v-sheet>
						<v-sheet>
							<v-btn
								v-for="variant in variants"
								:key="variant.sku"
								@click="cartStore.add(product.id)"
								color="red-accent-4"
								variant="tonal"
								rounded="lg"
								class="w-100 h-100 mb-3 py-3 text-none text-center"
								style="font-size: 1rem;"
							>
							{{ variant.value }} <br/>
							{{ formatPrice(variant.discountPrice || variant.sellPrice) }}
							</v-btn>
						</v-sheet>

						<v-sheet class="d-flex flex-column justify-center align-center text-none">
							<!-- <h5 class="text-uppercase pt-3">Lựa chọn màu yêu thích</h5> -->
							<!-- <v-radio-group inline>
							<v-radio
								v-for="color in product.productColors"
								:key="color.id"
								:label="color.name"
								:value="color.value"
								color="red-accent-4"
							>
							</v-radio>
						</v-radio-group> -->
						</v-sheet>

						<!-- <v-btn
						color="red-accent-4"
						variant="text"
						size="large"
						class="w-100 text-h4"
					>
						{{ formatPrice(variant.discountPrice || variant.sellPrice) }}
					</v-btn> -->
					</v-sheet>

					<!-- Promotions -->
					<!-- <v-sheet
					rounded="lg"
					elevation="0"
					class="my-3 pa-2 border-success"
				>
					<v-sheet class="d-flex">
						<v-icon
							size="20"
							color="red-accent-4"
						>mdi-gift</v-icon>
						<h5 class="text-uppercase text-danger px-1">Khuyến mãi</h5>
					</v-sheet>
					<p
						v-for="item in product.productPromotions"
						:key="item.id"
						class="text-medium pa-1"
					>
						<v-icon
							size="18"
							color="green"
							class="px-2 text-justify"
						>mdi-check-circle</v-icon>
						{{ item.name }}
					</p>
				</v-sheet> -->

					<!-- Buy now, Add to cart -->
					<v-sheet class="d-flex mt-2">
						<v-btn
							rounded="0"
							elevation="1"
							@click="cartStore.add(product.id)"
							href=""
							stacked
							color="red-accent-4"
							class="text-white text-none text-caption w-75 rounded-s-lg"
						>
							<h3 class="text-uppercase">Mua ngay</h3>
							<p class="text-caption text-center px-1">Giao nhanh trong 2 giờ hoặc nhận tại cửa hàng</p>
						</v-btn>
						<v-btn
							rounded="0"
							elevation="1"
							color="red-accent-4"
							variant="outlined"
							stacked
							class="text-none w-25 rounded-e-lg"
							@click="cartStore.add(product.id)"
						>
							<v-icon size="small">mdi-cart-plus</v-icon>
							<p
								class="text-center"
								style="font-size: 0.6rem;"
							>Thêm giỏ hàng</p>
						</v-btn>
					</v-sheet>

					<!-- More discounts -->
					<!-- <v-sheet
					rounded="lg"
					elevation="0"
					class="my-3 pa-2 text-medium text-justify border-success"
				>
					<h5 class="text-uppercase text-medium text-danger py-1">Ưu đãi thêm</h5>
					<v-sheet
						v-for="item in product.moreDiscounts"
						:key="item.id"
					>
						<p class="py-1">
							<v-icon
								size="18"
								color="green"
								class="px-2"
							>mdi-check-circle</v-icon>
							{{ item.name }}
						</p>
					</v-sheet>
				</v-sheet> -->

					<!-- Specifications -->
					<!-- <v-sheet
					elevation="3"
					rounded="lg"
				>
					<v-table class="my-3 py-2 text-medium my-2">
						<thead>
							<tr>
								<th colspan="2">
									<div class="d-flex align-center">
										<v-icon color="red-accent-4">mdi-information-variant-circle</v-icon>
										<h3 class="px-1 text-uppercase">Thông số kỹ thuật</h3>
									</div>
								</th>
							</tr>
						</thead>
						<tbody>
							<tr
								v-for="item in product.productSpecifications"
								:key="item.id"
							>
								<td style="width: 40%; font-weight: 600">{{ item.title }}</td>
								<td>{{ item.name }}</td>
							</tr>
						</tbody>
					</v-table>
					<SpecificationsModal />
				</v-sheet> -->

				</v-sheet>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<!-- Begin : Đặc điểm nổi bật -->
				<v-sheet
					elevation="3"
					rounded="lg"
					class="text-medium text-justify my-3 pa-5"
				>
					<h2 class="text-uppercase text-center text-danger pa-3">đặc điểm nổi bật</h2>
					<v-sheet class="d-flex align-center py-2">
						<!-- <v-icon
								size="20"
								color="green"
							>mdi-check-circle</v-icon> -->
						<div
							href="#"
							class="px-1 text-decoration-none text-dark"
							:style="!more && [{ height: '200px', overflow: 'hidden' }]"
						>
							<strong class="text-danger text-body">{{ product.name }}</strong>{{ product.shortDescription }}
							<p class="py-3">{{ product.longDescription }}</p>
						</div>

					</v-sheet>

					<div
						class="d-flex align-center mt-4"
						v-if="!more"
					>
						<v-btn
							@click="more = true"
							color="red-accent-4"
							variant="text"
							class="text-white text-none mx-auto"
							append-icon="mdi-chevron-down"
						>
							Xem thêm
						</v-btn>
					</div>
				</v-sheet>
			</v-col>
		</v-row>

		<!-- Product Gallery -->
		<!-- <v-row>
			<v-col :cols="12">
				<v-sheet class="d-none d-sm-none d-md-none d-lg-block">
					<h4 class="text-uppercase text-danger">Sản phẩm tương tự</h4>
					<HomeMainProductSlider :products="product?.gallery1" :products-show="5">
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
		</v-row> -->

		<!-- FAQ, Product Reviews, Q&A, News -->
		<v-row>
			<v-col
				:cols="12"
				lg="8"
				md="12"
			>
				<!-- Product Reviews -->
				<ProductReviews />

				<!-- Q&A -->
				<ProductQA />
			</v-col>

			<!-- News -->
			<v-col
				:cols="12"
				md="4"
				lg="4"
			>
				<v-sheet class="d-none d-md-flex d-md-none d-lg-block">
					<ProductNews :posts="posts" />
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
