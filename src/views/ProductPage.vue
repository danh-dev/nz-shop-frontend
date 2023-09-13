<script setup>
import { useRoute } from "vue-router";
import axios from "@/axiosComfig";
import { onMounted, ref, watch, computed } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { camelCase, mapKeys } from "lodash";
import ProductReviews from "@/components/product/ProductReviews.vue";
import ProductNews from "@/components/product/ProductNews.vue";
import ProductSlider from "@/components/product/ProductSlider.vue";
import ProductSlider1 from "@/components/globals/ProductSlider.vue";
import ProductThumbnailGroup from "@/components/product/ProductThumbnailGroup.vue";
import ProductCard from "@/components/globals/ProductCard.vue";
import { siteData } from "@/stores/globals";

const { name, xs } = useDisplay();

const productsShow = computed(() => {
	switch (name.value) {
		case "xs":
			return 2;
		case "sm":
			return 3;
		case "md":
			return 4;
		case "xl":
			return 6;
		case "xxl":
			return 7;
		default:
			return 5;
	}
});

//Danh
const siteStore = siteData();
const variantSelected = ref(null);
const readMore = ref(false);

const route = useRoute();

const moreDiscount = ref([
	{ id: 1, icon: "mdi-check-circle", name: "Giảm thêm tới 1% cho thành viên Smember (áp dụng tùy sản phẩm)" },
	{ id: 2, icon: "mdi-check-circle", name: "Ưu đãi đến 500k khi mở thẻ VP Bank" },
	{ id: 3, icon: "mdi-check-circle", name: "Mở thẻ tín dụng VIB - Nhận voucher 200.000đ mua hàng tại NZShop" },
	{ id: 4, icon: "mdi-check-circle", name: "Giảm 500k đơn hàng từ 10 triệu (trừ các sản phẩm Apple)" },
]);

const product = ref({});
const posts = ref([]);
const products = ref([]);



const reviewModal = ref(false);

const finalSKU = computed(() => variantSelected.value === null || typeof variantSelected.value === undefined ? product.value.sku : product.value.sku + "-" + (variantSelected.value + 1));
// Create & fetch product reviews
const review = ref("");
const reviews = ref([]);
const rating = ref(null);
const showMoreReviews = ref(false);

const createReview = async () => {
	try {
		siteStore.isLogin = true;
		await axios.post("reviews", {
			user_id: siteStore.userInfo.user_id,
			product_id: product.value.id,
			comment: review.value,
			rating: rating.value,
		});
		fetchReviews(product.value.id);
		siteStore.hasRes({ data: { status: "ok", message: "Bình luận thành công." } });
		reviewModal.value = false;
	}
	catch (e) {
		siteStore.hasRes({ data: { status: "error", message: "Xảy ra lỗi. Vui lòng đăng nhập để thực hiện thao tác." } });
		console.log(e);
	}
};

const fetchReviews = async id => {
	try {
		const res = await axios.get(`products/${id}/reviews`);
		if (res.status === 200) {
			reviews.value = res.data.data.reverse();
		}
	}
	catch (e) {
		console.log(e);
	}
};

//------------- Create & fetch product comments -----------//
const comments = ref([]);
const comment = ref("");
const showMoreComments = ref(false);
const validate = ref([
	comment => {
		if (comment.length > 2) { return true; }
		return "Bình luận tối thiểu 3 ký tự.";
	},
]);

const createComment = async () => {
	try {
		siteStore.isLogin = true;
		await axios.post("product-comments", {
			user_id: siteStore.userInfo.user_id,
			product_id: product.value.id,
			comment: comment.value,
		});
		fetchComments(product.value.id);
		siteStore.hasRes({ data: { status: "ok", message: "Bình luận thành công." } });
	}
	catch (e) {
		siteStore.hasRes({ data: { status: "error", message: "Xảy ra lỗi. Vui lòng đăng nhập để thực hiện thao tác." } });
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
const visibleComments = () => {
	if (showMoreComments.value) {
		return reviews.value;// Hiển thị tất cả đánh giá nếu showMoreReview = true
	}
	return reviews.value.slice(0, 3);// Hiển thị tối đa 3 đánh giá nếu showMoreReview = false
};

function formatTimePassed(created_at) {
	const reviewDate = new Date(created_at);
	const currentDate = new Date();

	const timeDiff = currentDate.getTime() - reviewDate.getTime();
	const minutes = Math.floor(timeDiff / (1000 * 60));
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (days > 0) {
		return `${days} ngày trước`;
	} else if (hours > 0) {
		return `${hours} giờ trước`;
	} else if (minutes > 0) {
		return `${minutes} phút trước`;
	}
	return "Vừa mới đăng";
};

//------------- Product photos carousel -----------//
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
//------------- Fetch each Product -----------//
const fetchProduct = async () => {
	try {
		siteStore.isLoading = true;
		const res = await axios.get(`products/${route.params.name}`);
		if (res.status === 200) {
			product.value = mapKeys(res.data.data, (value, key) => camelCase(key));
		}
		siteStore.isLoading = false;
	}
	catch (e) {
		console.log(e);
	}
};

//------------- Fetch random posts -----------//
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

//------------- Fetch random products -----------//
const fetchRandomProducts = async () => {
	try {
		const response = await axios.get("randomProducts");
		if (response.data.status === 200) {
			products.value = response.data.data.map(item => mapKeys(item, (value, key) => camelCase(key)));
		}
	} catch (error) {
		console.log("Error: ", error);
	}
};

watch(product, () => {
	fetchReviews(product.value.id);
	fetchComments(product.value.id);
});

onMounted(() => {
	fetchProduct();
	fetchRandomProducts();
	fetchRandomPosts();
});
</script>

<template>
	<v-container class="">
		<v-sheet>
			<h3 class=" my-3">{{ product.name }}</h3>
		</v-sheet>

		<!-- Product Photos Carousel -->
		<v-row>
			<v-col
				:cols="12"
				lg="8"
				md="12"
			>
				<!-- Product Photos Carousel -->
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
								class="pa-1 me-2 rounded-lg text-caption"
							>
								<b>{{ String(item.name) }}</b>
								<p
									class="text-red-accent-4"
									@click="cartStore.add(product.id)"
								>{{ formatPrice(item.sellPrice) }}</p>
							</v-card>
						</div>
					</v-sheet>

					<!-- Buy now, Add to cart -->
					<v-sheet
						class="d-flex mt-5"
						@click="siteStore.addProduct(finalSKU)"
					>
						<v-btn
							rounded="0"
							elevation="1"
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

					<!-- More discount -->
					<v-sheet class="my-4 border-success rounded-lg">
						<h3 class="text-uppercase text-white text-center bg-red-accent-4 pa-2 rounded-t-lg">ưu đãi thêm</h3>
						<div
							v-for="item in moreDiscount"
							:key="item.id"
							class="d-flex my-2"
						>
							<v-icon
								size="x-small"
								color="success"
								class="ma-1"
							>{{ item.icon }}</v-icon>
							<p class="ps-1">{{ item.name }}</p>
						</div>
					</v-sheet>
				</v-sheet>
			</v-col>
		</v-row>

		<!-- Special Product Information -->
		<v-row>
			<v-col cols="12">
				<v-sheet
					elevation="3"
					rounded="lg"
					class="text-body-2 text-justify"
				>
					<h2 class="rounded-t-lg text-uppercase text-center text-white pa-5 bg-red-accent-4">đặc điểm nổi bật</h2>
					<v-sheet class="d-flex align-center pa-5">
						<div :style="!readMore && [{ height: '500px', overflow: 'hidden' }]">
							<p v-html="product.description"></p>
						</div>
					</v-sheet>

					<div
						class="d-flex align-center mt-4"
						v-if="!readMore"
					>
						<v-btn
							@click="readMore = true"
							color="red-accent-4"
							variant="elevated"
							class="text-white mx-auto mb-5"
							append-icon="mdi-chevron-down"
						>
							Xem thêm
						</v-btn>
					</div>
					<div
						class="d-flex align-center mt-4"
						v-if="readMore"
					>
						<v-btn
							@click="readMore = false"
							color="red-accent-4"
							variant="elevated"
							class="text-white mx-auto mb-5"
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
				<!-- Create and display reviews -->
				<ProductReviews :reviews="reviews" />

				<!-- Create and display comments -->
				<v-sheet
					elevation="3"
					rounded="lg"
					class="my-5 flex-md-fill"
				>
					<h4 class="px-4 py-2">Bình luận:</h4>
					<v-container class="d-flex flex-column">
						<!-- Create a comment -->
						<v-textarea
							v-model="comment"
							variant="outlined"
							auto-grow
							label="Bình luận"
							background="white"
							:rules="validate"
						></v-textarea>
						<div align="right">
							<v-btn
								prepend-icon="mdi-send-circle"
								color="red-accent-4"
								class="text-white"
								@click="createComment"
							>Gửi</v-btn>

						</div>
						<!-- Dislay comments -->
						<div>
							<v-sheet
								class="my-4"
								v-for=" item in comments "
								:key="item.id"
							>
								<v-sheet>
									<div class="pa-4 text-body-2 rounded-lg more border-left bg-grey-lighten-4">
										<div class="d-flex justify-space-between pb-2">
											<p class="text-uppercase font-weight-bold">
												<b class="text-h6 rounded-b-pill bg-amber pa-2"> {{ item.full_name.slice(0, 1) || "v" }} </b> {{
													item.full_name || "visitor" }}
											</p>
											<p class="">{{ formatTimePassed(item.created_at) }}</p>
										</div>

										<div class="d-flex justify-space-between">
											<p><b>Bình luận: </b>{{ item.comment }}</p>
										</div>
									</div>
								</v-sheet>
							</v-sheet>
						</div>

						<v-sheet class="d-flex justify-center">
							<v-btn
								v-if="comments.length > visibleComments.length && !showMoreComments"
								@click="showMoreComments = true"
								color="#d50000"
							>
								Xem thêm bình luận
							</v-btn>

							<v-btn
								v-if="showMoreComments"
								@click="showMoreComments = false"
								color="#d50000"
							>
								Thu gọn
							</v-btn>
						</v-sheet>
					</v-container>
				</v-sheet>
			</v-col>

			<!-- Display random news -->
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

		<!--  Recommended Product -->
		<v-row>
			<v-col>
				<v-sheet>
					<h3 class="text-uppercase">sản phẩm gợi ý</h3>
					<ProductSlider1
						:products="products"
						:floors="1"
						:productsPerFloor="8"
						:productsShow="productsShow"
					>
						<template #default="{ props }">
							<ProductCard
								class="flex-1-0 me-2"
								:width="`calc((100% - ${8 * (productsShow - 1)}px) / ${productsShow})`"
								:style="{ translate: `calc(${-props.percent}% - ${props.px}px)` }"
								:product="props.product"
								:to="`/san-pham/${props.product.slug}`"
							/>
						</template>
					</ProductSlider1>
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
				variant="outlined"
				:rules="validate"
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
					@click="reviewModal = false"
				>
					Đóng
				</v-btn>
			</v-card-actions>

		</v-card>
	</v-dialog>
	<!-- End : Review Modal  -->
</template>

<style>
.border-success {
	border: 1px solid forestgreen;
}

.selected {
	color: #d50000 !important;
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