<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from "vue";
import product from "../../product.js";
const commentModal = ref(null);

const comments = ref([
	{
		id: 1,
		avatar: "T",
		name: "Trinh",
		time: "27/5/2023 09:09",
		rating: 5,
		comment: "Điện thoại rất tốt.",
	},
	{
		id: 2,
		avatar: "J",
		name: "Jonathan",
		time: "20/5/2023 10:50",
		rating: 4,
		comment: "sản phẩm dùng ổn.",
	},
	{
		id: 3,
		avatar: "S",
		name: "Sơn Hải",
		time: "28/5/2023 14:08",
		rating: 4,
		comment: "Sản phẩm rất tốt.",
	},
	{
		id: 4,
		avatar: "N",
		name: "Vũ Xuân Nam",
		time: "20/4/2023 17:50",
		rating: 5,
		comment: "sản phẩm tốt nhân viên nhiệt tình",
	},
	{
		id: 5,
		avatar: "T",
		name: "Trần Thanh Tiền",
		time: "14/4/2023 18:01",
		rating: 5,
		comment: "Máy mượt mà đẹp pin Sài được 1 ngày trọn vẹn, nhân viên hỗ trợ nhiệt tình.",
	},
	{
		id: 6,
		avatar: "D",
		name: "John Dang",
		time: "22/3/2023 18:41",
		rating: 5,
		comment: "Máy mượt mà đẹp pin xài được 1 ngày trọn vẹn.",
	},
	{
		id: 7,
		avatar: "S",
		name: "Sunny",
		time: "20/3/2023 13:11",
		rating: 5,
		comment: "nhân viên hỗ trợ nhiệt tình, máy xài ổn.",
	},
	{
		id: 8,
		avatar: "H",
		name: "Henry Tran",
		time: "15/3/2023 15:35",
		rating: 5,
		comment: "nhân viên tư vấn tốt, máy hiện tại đang xài ổn.",
	},
	{
		id: 9,
		avatar: "B",
		name: "Brian Nguyen",
		time: "10/3/2023 13:35",
		rating: 5,
		comment: "nhân viên tư vấn tốt, camera khá ổn.",
	},
	{
		id: 10,
		avatar: "L",
		name: "Linh Dang",
		time: "09/3/2023 09:42",
		rating: 5,
		comment: "Máy thiết kế đẹp, camera ổn, cảm ứng mượt.",
	},
	{
		id: 11,
		avatar: "A",
		name: "Andy Linh",
		time: "15/3/2023 15:35",
		rating: 5,
		comment: "nhân viên tư vấn tốt, máy hiện tại đang xài ổn.",
	},
]);

function showCommentModal() {
	commentModal.value.classList.add("open");
}

function hideCommentModal() {
	commentModal.value.classList.remove("open");
}
</script>

<template>
	<v-btn location="center" color="red-accent-4" class="text-white" append-icon="mdi-chevron-down" 
		@click="showCommentModal()">
		Xem thêm
	</v-btn>
	<div class="commentModal" ref="commentModal" @click="hideCommentModal()" style="z-index: 2;">
		<v-sheet position="relative" class="commentModal-container" @click.stop>

			<v-btn location="right top" position="absolute" variant="text" color="white" icon="mdi-close-circle"
				@click="hideCommentModal()">
			</v-btn>

			<v-sheet color="red-accent-4" rounded="lg" class="modal-header d-flex align-center justify-center">
				<b class="text-uppercase">Đánh giá & nhận xét {{ product.name }}</b>
			</v-sheet>

			<div class="ma-3" rounded="lg" v-for="comment in comments" :key="comment.id">
				<v-sheet class="d-flex justify-space-between py-2">
					<v-sheet class="d-flex align-center">
						<p class="bg-secondary rounded pa-2">{{ comment.avatar }}</p>
						<h5 class="px-2">{{ comment.name }}</h5>
					</v-sheet>
					<p class="text-caption">{{ comment.time }}</p>
				</v-sheet>

				<v-sheet class="pa-2 text-caption d-flex justify-center flex-column rounded"
					style="background-color: rgb(247, 243, 243); margin-left: 5%">
					<p class="d-flex align-center">
						<b>Đánh giá:</b>
						<v-rating :model-value="comment.rating" color="yellow-darken-3" size="small" readonly density="compact">
						</v-rating>
					</p>
					<p class="more"><b>Nhận xét:</b> {{ comment.comment }}</p>
				</v-sheet>
			</div>
			<v-btn id="commentModal-close-btn" rounded="lg" class="text-white w-100 mt-2" color="red-accent-4" type="submit"
				variant="elevated" @click="hideCommentModal()">Đóng
			</v-btn>
		</v-sheet>
	</div>
</template>

<style>
.commentModal-container {
	width: 800px;
	max-width: 800px;
	min-width: 320px;
	height: 600px;
	z-index: 3;
	overflow: auto;
	border-radius: 10px !important;
}
</style>
