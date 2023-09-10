<script setup>
import { ref, computed } from "vue";
const props = defineProps({
	reviews: {
		type: Array,
		default() {
			return [];
		},
	},
});

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

const moreReview = ref(false);
const averageRating = computed(() => {
	let totalRating = 0;
	for (const { rating } of props.reviews) {
		totalRating += rating;
	}
	return totalRating / props.reviews.length.toFixed(1) || 0;
});

// const percentReviews = rating => {
// 	return props.reviews.filter(review => review.rating === rating).length;
// };

// import { siteData } from "@/stores/globals";
// const siteStore = siteData();
// const alert = async () => {
// 	siteStore.hasRes({ data: { status: "error", message: "Xảy ra lỗi. Vui lòng đăng nhập để thực hiện thao tác." } });
// };
</script>

<template>
	<v-sheet>
		<v-sheet
			class="my-2 d-flex flex-column v-rating"
			elevation="3"
			width="100%"
			rounded="lg"
		>

			<div class="d-flex align-center flex-column">
				<h3 class="pt-5 d-flex justify-center text-uppercase">Đánh giá & nhận xét</h3>
				<div class="text-h2 mt-3">
					 {{ averageRating.toFixed(1) || 0 }}
					<span class="text-h6 ml-n3">/5</span>
				</div>

				<v-rating
					:model-value="averageRating"
					color="yellow-darken-3"
					size="large"
					readonly
					:half-increments="true"
					density="compact"
				></v-rating>
				<div class="px-3">{{ reviews.length }} đánh giá</div>
			</div>

			<!-- <v-list
				bg-color="transparent"
				class="d-flex flex-column-reverse"
				density="compact"
			>
				<v-list-item
					v-for="(rating, index) in 5"
					:key="index"
				>
					<v-progress-linear
						:model-value="percentReviews(rating) / reviews.length * 100"
						class="mx-n5"
						color="red-accent-4"
						height="8"
						rounded
					></v-progress-linear>

					<template v-slot:prepend>
						<span>{{ rating }}</span>
						<v-icon
							icon="mdi-star"
							color="yellow-darken-3"
							class="mx-2"
						></v-icon>
					</template>

					<template v-slot:append>
						<div class="rating-values">
							<span class="d-flex justify-end text-body-2"> {{ review.rating }} đánh giá </span>
						</div>
					</template>
				</v-list-item>
			</v-list> -->

			<v-sheet class="d-flex flex-column align-center mt-2">
				<p class="text-subtitle-1">Bạn đánh giá sao sản phẩm này ?</p>
				<!-- <LoginModal /> -->

				<v-btn
					id="reviewModalButton"
					color="#d50000"
					class="mt-2"
				>
					Đánh giá ngay
				</v-btn>
			</v-sheet>

			<!-- Display reviews -->
			<v-container>
				<v-sheet
					v-for="review in reviews"
					:key="review.id"
				>
					<div class="border-left bg-grey-lighten-4 text-body-2 rounded-lg my-4">
						<div class="d-flex justify-space-between pa-2">
							<p class="text-uppercase font-weight-bold">
								<b class="text-h6 rounded-b-pill bg-amber pa-2"> {{ review.full_name.slice(0, 1) }}</b> {{
									review.full_name }}
							</p>
							<p>{{ formatTimePassed(review.created_at) }}</p>
						</div>
						<div class="pa-2">
							<div class="d-flex align-center">
								<b>Đánh giá:</b>
								<v-rating
									:model-value="review.rating"
									color="yellow-darken-3"
									readonly
									density="compact"
									size="small"
									class="mx-2"
								>
								</v-rating>
							</div>
							<p class="more"><b>Nhận xét:</b> {{ review.comment }}</p>
						</div>
					</div>
				</v-sheet>
			</v-container>

			<v-sheet>
				<div
					class="mt-4"
					v-if="reviews.length > 3 && !moreReview"
				>
					<v-btn
						@click="moreReview = true"
						location="center"
						color="red-accent-4"
						class="text-white"
						append-icon="mdi-chevron-down"
					>
						Xem thêm đánh giá
					</v-btn>
				</div>

				<div
					class="mt-4"
					v-if="moreReview"
				>
					<v-btn
						@click="moreReview = false"
						location="center"
						color="red-accent-4"
						class="text-white"
						append-icon="mdi-chevron-down"
					>
						Thu gọn
					</v-btn>
				</div>
			</v-sheet>

		</v-sheet>
	</v-sheet>
</template>

<style>
.more {
	white-space: wrap;
	/* overflow: hidden; */
	/* text-overflow: ellipsis; */
}
</style>
