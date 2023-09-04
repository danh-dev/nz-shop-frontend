<script setup>
import { ref, computed } from "vue";
import LoginModal from "../modals/LoginModal.vue";
import ReviewModal from "../modals/ReviewModal.vue";

const props = defineProps({
	reviews: {
		type: Array,
		default() {
			return [];
		},
	},
	productId: Number,
});

// const review = ref({
// 	return 
// });

const more = ref(false);

const averageRating = computed(() => {
	let totalRating = 0;
	for (const { rating } of props.reviews) {
		totalRating += rating;
	}
	return totalRating / props.reviews.length || 0;
});

const percentReviews = rating => {
	return props.reviews.filter(review => review.rating === rating).length;
};
</script>

<template>
	<v-sheet>
		<v-sheet
			class="my-4 d-flex flex-column py-3 v-rating"
			elevation="3"
			width="100%"
			rounded="lg"
		>

			<div class="d-flex align-center flex-column">
				<h4 class="d-flex justify-center">Đánh giá & nhận xét</h4>
				<div class="text-h2 mt-3">
					{{ averageRating }}
					<span class="text-h6 ml-n3">/5</span>
				</div>

				<v-rating
					:model-value="averageRating"
					color="yellow-darken-3"
					size="large"
					readonly
					density="compact"
				></v-rating>
				<div class="px-3">{{ reviews.length }} đánh giá</div>
			</div>

			<v-list
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
							<span class="d-flex justify-end text-body-2"> {{ reviews.length }} đánh giá </span>
						</div>
					</template>
				</v-list-item>
			</v-list>

			<v-sheet align="center">
				<p class="text-subtitle-1">Bạn đánh giá sao sản phẩm này ?</p>
				<LoginModal></LoginModal>

				<v-btn id="reviewModalButton">
					Đánh giá
				</v-btn>

				<ReviewModal :productId="productId" />
			</v-sheet>

			<!--Begin: Reviews sản phẩm -->
			<v-container
				v-for="(review, index) in reviews"
				:key="index"
			>
				<v-sheet class="d-flex justify-space-between py-2">
					<v-sheet class="d-flex align-center">
						<p class="bg-secondary rounded pa-2">{{ review.full_name.slice(0, 1) }}</p>
						<h5 class="px-2">{{ review.full_name }}</h5>
					</v-sheet>
					<p class="text-caption">{{ review.created_at.slice(0, 10) }}</p>
				</v-sheet>

				<v-sheet
					class="pa-2 text-caption d-flex justify-center flex-column rounded"
					style="background-color: rgb(247, 243, 243); margin-left: 5%"
				>
					<p class="d-flex align-center">
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
					</p>
					<p class="more"><b>Nhận xét:</b> {{ review.comment }}</p>
				</v-sheet>
			</v-container>
			<!--End: Reviews sản phẩm -->

			<v-sheet
				class="mt-4"
				v-if="!more"
			>
				<v-btn
					@click="more = true"
					href=""
					location="center"
					color="red-accent-4"
					class="text-white"
					append-icon="mdi-chevron-down"
				>
					Xem tất cả đánh giá
				</v-btn>
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
