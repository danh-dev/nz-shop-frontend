<script setup>
import { ref } from "vue";
import LoginModal from "../components/LoginModal.vue";
import CommentModal from "../components/CommentModal.vue";
const comments = ref([
	{
		avatar: "T",
		name: "Trinh",
		time: "27/5/2023 09:09",
		comment: "Điện thoại rất tốt.",
	},
	{
		avatar: "J",
		name: "Jonathan",
		time: "20/5/2023 10:50",
		comment: "sản phẩm dùng ổn.",
	},
	{
		avatar: "S",
		name: "Sơn Hải",
		time: "28/5/2023 14:08",
		comment: "Sản phẩm rất tốt.",
	},
	{
		avatar: "N",
		name: "Vũ Xuân Nam",
		time: "20/4/2023 17:50",
		comment: "sản phẩm tốt nhân viên nhiệt tình",
	},
	{
		avatar: "T",
		name: "Trần Thanh Tiền",
		time: "14/4/2023 18:01",
		comment: "Máy mượt mà đẹp pin Sài được 1 ngày trọn vẹn, nhân viên hỗ trợ nhiệt tình.",
	},
]);
</script>

<template>
	<v-sheet
		class="my-3 d-flex flex-column py-3 rounded-lg v-rating"
		elevation="10"
		width="100%"
	>
		<h4 class="d-flex justify-center more">Đánh giá & nhận xét</h4>

		<div class="d-flex align-center flex-column">
			<div class="text-h2 mt-3">
				4
				<span class="text-h6 ml-n3">/5</span>
			</div>

			<v-rating
				:model-value="4"
				color="yellow-darken-3"
				size="30"
				readonly
				density="compact"
			></v-rating>
			<div class="px-3">3,360 đánh giá</div>
		</div>

		<v-list
			bg-color="transparent"
			class="d-flex flex-column-reverse"
			density="compact"
		>
			<v-list-item
				v-for="(rating, i) in 5"
				:key="i"
			>
				<v-progress-linear
					:model-value="rating * 15"
					class="mx-n5"
					color="danger"
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
						<span class="d-flex justify-end"> {{ rating * 224 }} </span>
					</div>
				</template>
			</v-list-item>
		</v-list>

		<v-sheet align="center">
			<p class="text-subtitle-1">Bạn đánh giá sao sản phẩm này ?</p>
			<LoginModal />
		</v-sheet>

		<v-container
			class="my-2"
			v-for="(comment, index) in comments"
			:key="index"
		>
			<v-sheet class="d-flex justify-content-between py-2">
				<v-sheet class="d-flex align-center">
					<p class="bg-secondary rounded p-2">{{ comment.avatar }}</p>
					<h5 class="px-2">{{ comment.name }}</h5>
				</v-sheet>
				<p class="text-small">{{ comment.time }}</p>
			</v-sheet>

			<v-sheet
				class="p-2 text-small d-flex justify-center flex-column rounded"
				style="background-color: rgb(247, 243, 243); margin-left: 5%"
			>
				<p class="d-flex align-center">
					<b>Đánh giá:</b>
					<span class="mdi mdi-star"></span>
					<span class="mdi mdi-star"></span>
					<span class="mdi mdi-star"></span>
					<span class="mdi mdi-star"></span>
					<span class="mdi mdi-star"></span>
				</p>
				<p class="more"><b>Nhận xét:</b> {{ comment.comment }}</p>
			</v-sheet>
		</v-container>
		<v-sheet class="mt-4">
			<CommentModal />
		</v-sheet>
	</v-sheet>
</template>

<style>
.more {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
