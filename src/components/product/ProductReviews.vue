<script setup>
import { ref } from "vue";
import LoginModal from "../modals/LoginModal.vue";
import product from "../../product.js";
import reviews from "../../review.js";

const more = ref(false);
</script>

<template>
	<v-sheet>
		<v-sheet class="my-4 d-flex flex-column py-3 v-rating" elevation="3" width="100%" rounded="lg">

			<div class="d-flex align-center flex-column">
				<h4 class="d-flex justify-center">Đánh giá & nhận xét</h4>
				<div class="text-h2 mt-3">
					{{ product.rating }}
					<span class="text-h6 ml-n3">/5</span>
				</div>

				<v-rating :model-value="product.rating" color="yellow-darken-3" size="large" readonly
					density="compact"></v-rating>
				<div class="px-3">{{ product.review }}</div>
			</div>

			<v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
				<v-list-item v-for="(rating, i) in 5" :key="i">
					<v-progress-linear :model-value="rating * 15" class="mx-n5" color="red-accent-4" height="8"
						rounded></v-progress-linear>
					<template v-slot:prepend>
						<span>{{ rating }}</span>
						<v-icon icon="mdi-star" color="yellow-darken-3" class="mx-2"></v-icon>
					</template>

					<template v-slot:append>
						<div class="rating-values">
							<span class="d-flex justify-end text-body-2"> {{ rating * product.value }} đánh giá </span>
						</div>
					</template>
				</v-list-item>
			</v-list>

			<v-sheet align="center">
				<p class="text-subtitle-1">Bạn đánh giá sao sản phẩm này ?</p>
				<LoginModal />
			</v-sheet>

			<v-container v-for="review in (more ? reviews : reviews.slice(0, 3))" :key="review.id">
				<v-sheet class="d-flex justify-space-between py-2">
					<v-sheet class="d-flex align-center">
						<p class="bg-secondary rounded pa-2">{{ review.avatar }}</p>
						<h5 class="px-2">{{ review.username }}</h5>
					</v-sheet>
					<p class="text-caption">{{ review.createAt }}</p>
				</v-sheet>

				<v-sheet class="pa-2 text-caption d-flex justify-center flex-column rounded"
					style="background-color: rgb(247, 243, 243); margin-left: 5%">
					<p class="d-flex align-center">
						<b>Đánh giá:</b>
						<v-rating half-increments :model-value="review.point" color="yellow-darken-3" readonly density="compact"
							size="small" class="mx-2">
						</v-rating>
					</p>
					<p class="more"><b>Nhận xét:</b> {{ review.reviewContent }}</p>
				</v-sheet>
			</v-container>

			<v-sheet class="mt-4" v-if="!more">
				<v-btn @click="more = true" href="" location="center" color="red-accent-4" class="text-white"
					append-icon="mdi-chevron-down">
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
