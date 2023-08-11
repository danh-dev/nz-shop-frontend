<script setup>
import { ref } from "vue";
import product from "../../product.js";
const reviewModal = ref(null);

function showReviewModal() {
	reviewModal.value.classList.add("open");
}
function hideReviewModal() {
	reviewModal.value.classList.remove("open");
}

</script>

<template>
	<!-- Begin : Review Modal  -->
	<!-- <v-btn @click="showReviewModal()" color="#cd3545" class="text-white" append-icon="mdi-chevron-down" location="center">
		Xem tất cả bài viết
	</v-btn> -->
	<div class="reviewModal" ref="reviewModal" @click="hideReviewModal" style="z-index: 2">
		<v-sheet position="relative" class="reviewModal-container" @click.stop>

			<v-sheet rounded="lg" class="py-1 d-flex flex-column align-center justify-center">
				<img src="https://cdn2.cellphones.com.vn/213x213,webp,q100/media/wysiwyg/Shipper_CPS.jpg" alt="">
				<p class="px-2 text-h6">Đánh giá và nhận xét {{ product.name }}</p>
				<p>Bạn thấy sản phẩm này như thế nào ?</p>
			</v-sheet>

			<v-textarea class="ma-2" name="" id="" cols="30" rows="5"
				placeholder="Xin mời chia sẻ cảm nhận về sản phẩm"></v-textarea>

			<v-sheet class="d-flex justify-center align-center">
				<v-btn rounded="lg" color="#cd3545" variant="elevated" icon="" class="w-50 text-white">Gửi đánh giá</v-btn>
			</v-sheet>

		</v-sheet>
	</div>
</template>

<style></style>
