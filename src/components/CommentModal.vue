<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from "vue";
const commentModal = ref(null);

function showCommentModal() {
	commentModal.value.classList.add("open");
}

function hideCommentModal() {
	commentModal.value.classList.remove("open");
}

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
		avatar: "H",
		name: "Trần Minh Hải",
		time: "10/4/2023 14:09",
		comment: "nhân viên hỗ trợ nhiệt tình.",
	},
	{
		avatar: "D",
		name: "John Dang",
		time: "22/3/2023 18:41",
		comment: "Máy mượt mà đẹp pin xài được 1 ngày trọn vẹn.",
	},
	{
		avatar: "S",
		name: "Sunny",
		time: "20/3/2023 13:11",
		comment: "nhân viên hỗ trợ nhiệt tình, máy xài ổn.",
	},
	{
		avatar: "H",
		name: "Henry Tran",
		time: "15/3/2023 15:35",
		comment: "nhân viên tư vấn tốt, máy hiện tại đang xài ổn.",
	},
	{
		avatar: "B",
		name: "Brian Nguyen",
		time: "10/3/2023 13:35",
		comment: "nhân viên tư vấn tốt, camera khá ổn.",
	},
	{
		avatar: "Linh Dang",
		name: "L",
		time: "09/3/2023 09:42",
		comment: "Máy thiết kế đẹp, camera ổn, cảm ứng mượt.",
	},
	{
		avatar: "A",
		name: "Andy Linh",
		time: "15/3/2023 15:35",
		comment: "nhân viên tư vấn tốt, máy hiện tại đang xài ổn.",
	},
]);
</script>

<template>
	<v-btn
		location="center"
		color="danger"
		class="text-white"
		append-icon="mdi-chevron-down"
		@click="showCommentModal()"
	>
		Xem thêm</v-btn
	>
	<div
		class="comment-modal"
		ref="commentModal"
		@click="hideCommentModal()"
		style="z-index: 2"
	>
		<v-sheet
			rounded="3"
			position="relative"
			class="comment-modal-container"
			@click.stop
		>
			<v-btn
				location="right top"
				position="absolute"
				variant="text"
				color="white"
				icon="mdi-close-circle"
				@click="hideCommentModal()"
			></v-btn>
			<v-sheet color="danger" rounded="3" class="modal-header d-flex align-center justify-center">
				<h5 class="text-uppercase">Đánh giá & nhận xét</h5>
			</v-sheet>

			<v-sheet
				class="m-3" rounded="3"
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
			</v-sheet>
			<br />

			<v-sheet class="modal-footer d-flex justify-center align-center mb-3">
				<v-btn
					id="comment-modal-close-btn"
					class="text-white"
					color="danger"
					type="submit"
					@click="hideCommentModal()">Đóng
				</v-btn>
			</v-sheet>
		</v-sheet>
	</div>
</template>

<style>
.comment-modal.open{
	display: flex;
}
.comment-modal {
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
.comment-modal-container {
	width: 800px;
	max-width: 800px;
	min-width: 320px;
	height: 650px;
	overflow-y: auto;
	z-index: 3;
}
.comment-modal-close-btn {
	opacity: 0.9;
}

.comment-modal-close-btn:hover{
	opacity: 0.7;
}
</style>
