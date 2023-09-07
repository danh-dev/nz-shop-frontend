<script setup>
import { useRoute } from "vue-router";
import axios from "@/axiosComfig";
import {computed, onMounted, ref, watch} from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { camelCase, mapKeys } from "lodash";
import ProductReviews from "../components/product/ProductReviews.vue";
import ProductNews from "../components/product/ProductNews.vue";
import ProductSlider from "../components/product/ProductSlider.vue";
import ProductThumbnailGroup from "../components/product/ProductThumbnailGroup.vue";
import {siteData} from "@/stores/globals";

//Danh
const siteStore = siteData();
const variantSelected = ref(null);
const more = ref(false);
const route = useRoute();
const { xs } = useDisplay();
const product = ref({});
const posts = ref([]);
const products = ref([]);
const reviewModal = ref(false);

const finalSKU = computed(()=> variantSelected.value === null || typeof variantSelected.value === undefined ? product.value.sku:product.value.sku+"-"+(variantSelected.value+1))
// Create & fetch product reviews
const review = ref("");
const reviews = ref([]);
const rating = ref(null);
const createReview = async () => {
	try {
		await axios.post("reviews", {
			// user_id: userData.id,
			user_id: 2,
			product_id: product.value.id,
			comment: review.value,
			rating: rating.value,
		});
		// fetchReviews();
	}
	catch (e) {
		console.log(e);
	}
};

const fetchReviews = async id => {
	try {
		const res = await axios.get(`products/${id}/reviews`);
		if (res.status === 200) {
			comments.value = res.data.data.reverse();
		}
	}
	catch (e) {
		console.log(e);
	}
};

// Create & fetch product comments
const comments = ref([]);
const comment = ref("");
const createProductComment = async () => {
	try {
		await axios.post("product-comments", {
			// user_id: userData.id,
			user_id: 2,
			product_id: product.value.id,
			comment: comment.value,
		});
		// fetchComments();
	}
	catch (e) {
		console.log(e);
	}
};

const fetchComments = async id => {
	try {
		const res = await axios.get(`products/${id}/comments`);
		if (res.status === 200) {
			comments.value = res.data.data.reverse();
		}
	}
	catch (e) {
		console.log(e);
	}
};
const done = () => {
	// nhiu tac vu khac
	reviewModal.value = false;
};

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
// fetch Product
const fetchProduct = async () => {
	try {
		const res = await axios.get(`products/${route.params.name}`);
		if (res.status === 200) {
			product.value = mapKeys(res.data.data, (value, key) => camelCase(key));
		}
	}
	catch (e) {
		console.log(e);
	}
};

// fetch random posts
const fetchRandomPosts = async () => {
	try {
		const response = await axios.get("randomPosts");
		if (response.data.status === 200) {
			posts.value = response.data.data.filter(item => {
				return !item.isDeleted;
			});
		}
	} catch (error) {
		console.log("Error: ", error);
	}
};

// fetch random products
const fetchRandomProducts = async () => {
	try {
		const response = await axios.get("randomProducts");
		if (response.data.status === 200) {
			products.value = response.data.data.filter(item => {
				return !item.isDisabled;
			});
		}
	} catch (error) {
		console.log("Error: ", error);
	}
};

watch(product, () => {
	fetchReviews(product.value.id);
	fetchComments(product.value.id);
});

onMounted(async () => {
	await fetchProduct();
	await fetchRandomProducts();
	await fetchRandomPosts();
});
</script>

<template>
	<v-container class="">
		<v-sheet>
			<h3 class=" my-3">{{ product.name }}</h3>
		</v-sheet>

		<!-- Product Photos Silder -->
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
			</v-col>

			<v-col
				cols="12"
				md="12"
				lg="4"
			>
				<v-sheet>
					<!-- Product variants -->
					<v-sheet>
						<h3 class="text-center pb-4">Lựa chọn màu yêu thích</h3>
						<div class="d-flex text-center">
							<v-card
								v-for="(item, index) in JSON.parse(product.variants || '[]')"
								:key="item.sku"
								:value="item.name"
								@click="() => { variantSelected = index }"
								:class="variantSelected === index ? 'selected' : null"
								class="mx-2 pa-2 w-100"
							>
								{{ String(item.name) }}
								<p
									class="text-danger text-caption"
									@click="cartStore.add(product.id)"
								>{{ formatPrice(item.sellPrice) }}</p>
							</v-card>
						</div>
					</v-sheet>
					<!-- Buy now, Add to cart -->
					<v-sheet class="d-flex mt-5"
                   @click="siteStore.addProduct(finalSKU)">
						<v-btn
							rounded="0"
							elevation="1"
							href=""
							stacked
              color="red-accent-4"
							class="text-white text-none text-caption w-25 rounded-s-lg"
						><v-icon size="35">mdi-cart-plus</v-icon>
						</v-btn>
						<v-btn
							rounded="0"
							elevation="1"
							variant="outlined"
              color="red-accent-4"
							stacked
							class="text-none w-75 rounded-e-lg"
						>
              <h3 class="text-uppercase">Mua ngay</h3>
              <p class="text-caption text-center px-1">Giao nhanh trong 2 giờ hoặc nhận tại cửa hàng</p>
						</v-btn>
					</v-sheet>
				</v-sheet>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="12">
				<!-- Special Product Information -->
				<v-sheet
					elevation="3"
					rounded="lg"
					class="text-body-2 text-justify pa-5"
				>
					<h2 class="text-uppercase text-center text-danger pa-3">đặc điểm nổi bật</h2>
					<v-sheet class="d-flex align-center py-2">
						<div :style="!more && [{ height: '500px', overflow: 'hidden' }]">
							<p v-html="product.description"></p>
						</div>

					</v-sheet>

					<div
						class="d-flex align-center mt-4"
						v-if="!more"
					>
						<v-btn
							@click="more = true"
							color="red-accent-4"
							variant="elevated"
							class="text-white mx-auto"
							append-icon="mdi-chevron-down"
						>
							Xem thêm
						</v-btn>
					</div>
					<div
						class="d-flex align-center mt-4"
						v-if="more"
					>
						<v-btn
							@click="more = false"
							color="red-accent-4"
							variant="elevated"
							class="text-white mx-auto"
							append-icon="mdi-chevron-down"
						>
							Thu gọn nội dung
						</v-btn>
					</div>
				</v-sheet>
			</v-col>
		</v-row>

		<v-row>
			<v-col
				:cols="12"
				lg="8"
				md="12"
			>
				<!-- Product Reviews -->
				<ProductReviews :reviews="reviews" />

				<!-- Comments -->
				<v-sheet
					elevation="3"
					rounded="lg"
					class="my-5 flex-md-fill"
				>
					<h4 class="px-4 py-2">Bình luận:</h4>
					<v-container class="d-flex flex-column px-3">
						<div>
							<v-textarea
								v-model="comment"
								variant="filled"
								auto-grow
								background="white"
								placeholder="Bình luận:"
							></v-textarea>
							<v-btn
								prepend-icon="mdi-send-circle"
								color="red-accent-4"
								class="text-white"
								@click="createProductComment"
							>Gửi</v-btn>
						</div>

						<v-sheet
							class="my-2"
							v-for="item in comments"
							:key="item.id"
						>
							<v-sheet class="d-flex justify-space-between py-2">
								<v-sheet class="d-flex align-center">
									<p class="bg-secondary rounded pa-2">{{ item.full_name.slice(0, 1) }}</p>
									<h5 class="px-2">{{ item.full_name }}</h5>
								</v-sheet>
								<p class="text-caption">{{ item.created_at.slice(0, 19) }}</p>
							</v-sheet>

							<div
								class="pa-2 text-caption d-flex justify-center flex-column rounded more"
								style="background-color: rgb(247, 243, 243); margin-left: 5%;"
							>
								<p><b>Bình luận: </b>{{ item.comment }}</p>
							</div>
						</v-sheet>
					</v-container>
				</v-sheet>
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

	<!-- Begin : Review Modal  -->
	<v-dialog
		v-model="reviewModal"
		activator="#reviewModalButton"
		width="auto"
	>
		<v-card
			width="500"
			class="mx-auto"
		>
			<v-sheet class="py-1 d-flex flex-column align-center justify-center text-body-2">
				<img
					src="https://cdn2.cellphones.com.vn/213x213,webp,q100/media/wysiwyg/Shipper_CPS.jpg"
					class="w-25 h-25"
				>
				<p>Bạn thấy sản phẩm này như thế nào ?</p>
			</v-sheet>

			<v-textarea
				v-model="review"
				class="ma-2"
				rounded="lg"
				cols="30"
				rows="5"
				placeholder="Xin mời chia sẻ cảm nhận về sản phẩm"
			>
			</v-textarea>

			<v-rating
				v-model="rating"
				class="text-caption mx-auto"
				:item-labels="['Bad', 'So so', 'Ok', 'Good', 'Great']"
				item-label-position="top"
				color="yellow-darken-3"
				denity="comfortable"
			>
			</v-rating>
			<v-card-actions>
				<v-btn
					append-icon="mdi-check-outline"
					color="success"
					variant="elevated"
					class="w-50 text-white rounded-xl"
					@click="createReview"
				>
					Gửi đánh giá
				</v-btn>
				<v-btn
					append-icon="mdi-close-outline"
					color="red-accent-4"
					variant="elevated"
					class="ms-1 w-50 text-white rounded-xl"
					@click="done"
				>
					Đóng
				</v-btn>
			</v-card-actions>

		</v-card>
	</v-dialog>
	<!-- End : Review Modal  -->
</template>

<style>
.selected {
	border: 2px solid #d50000 !important;
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