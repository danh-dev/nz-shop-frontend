<script setup>
import { ref } from "vue";
// import axios from "axios";
import product from "../../product";
const modal = ref(null);
const review = ref(null);
const isLogin = ref(true);

function showLoginModal() {
	modal.value.classList.add("open");
}
function hideLoginModal() {
	modal.value.classList.remove("open");
}

function showReviewModal() {
	review.value.classList.add("open");
}
function hideReviewModal() {
	review.value.classList.remove("open");
}

const data = ref([
	{
		rating: 4,
		colors: ["red", "orange", "grey", "cyan", "green"],
	}
]);

// export default {
// 	comment() {
// 		return {
// 			newComment: {
// 				commnetContent: "",
// 			}
// 		}
// 	},
// 	method: {
// 		async newComment() {
// 			try {
// 				let response = await axios.post("", this.newComment);
// 				if (response.comment.status == 201) {
// 					this.$router.push("/");
// 				}
// 			} catch (error) {
// 				console.log("Error: ", error);
// 			}
// 		}
// 	};
// }
</script>

<template>
	<!-- Begin : Login Modal  -->
	<v-btn v-if="isLogin" color="red-accent-4" class="text-white mt-2" @click="showLoginModal">Đánh giá ngay</v-btn>
	<v-btn v-if="!isLogin" color="red-accent-4" class="text-white mt-2" @click="showReviewModal">Đánh giá ngay</v-btn>

	<div class="modal" ref="modal" @click="hideLoginModal" style="z-index: 2">
		<v-sheet position="relative" rounded="lg" class="modal-container" @click.stop>
			<v-btn class="modal-close-btn" @click="hideLoginModal" size="small" position="absolute" icon="mdi-close-circle"
				location="right top" variant="text" color="white">
			</v-btn>

			<v-sheet color="red-accent-4" rounded="lg" class="modal-header py-1 d-flex align-center justify-center">
				<v-icon size="small" color="white">mdi-account-circle</v-icon>
				<p class="px-2 text-white">Smember ?</p>
			</v-sheet>

			<v-sheet class="modal-body" rounded="lg">
				<p class="py-4 text-center">Vui lòng đăng nhập tài khoản để đánh giá.</p>
				<v-btn @click="() => { isLogin = !isLogin }" class="mx-1 text-white" color="red-accent-4"
					prepend-icon="mdi mdi-login">
					Đăngnhập</v-btn>
				<v-btn href="#" class="mx-1" prepend-icon="mdi-registered-trademark">Đăng ký</v-btn>
			</v-sheet>
		</v-sheet>
	</div>

	<div class="modal" ref="review" @click="hideLoginModal" style="z-index: 2">
		<v-sheet rounded="lg" position="relative" class="modal-container" @click.stop>
			<v-btn class="modal-close-btn" @click="hideLoginModal" size="small" position="absolute" icon="mdi-close-circle"
				location="right top" variant="text" color="white">
			</v-btn>

			<v-sheet color="red-accent-4" class="modal-header py-1 d-flex align-center justify-center">
				<v-icon size="small" color="white">mdi-account-circle</v-icon>
				<p class="px-2 text-white">log ?</p>
			</v-sheet>

			<v-sheet class="modal-body">
				<p class="py-4 text-center">Vui lòng đăng nhập tài khoản để đánh giá.</p>
				<v-btn href="#" class="mx-1 text-white" color="red-accent-4" prepend-icon="mdi mdi-login">Đăng nhập</v-btn>
				<v-btn href="#" class="mx-1" prepend-icon="mdi-registered-trademark">Đăng ký</v-btn>
			</v-sheet>
		</v-sheet>
	</div>
	<!-- End : Login Modal  -->

	<!-- Begin : Review Modal  -->
	<div class="reviewModal" ref="review" @click="hideReviewModal" style="z-index: 2">
		<v-sheet position="relative" class="reviewModal-container" @click.stop>

			<v-sheet rounded="lg" class="py-1 d-flex flex-column align-center justify-center text-body">
				<img src="https://cdn2.cellphones.com.vn/213x213,webp,q100/media/wysiwyg/Shipper_CPS.jpg"
					class="w-25 h-25" >
				<p class="text-danger">Đánh giá {{ product.name }}</p>
				<p class="text-body-2">Bạn thấy sản phẩm này như thế nào ?</p>
			</v-sheet>

			<v-textarea class="ma-2" rounded="lg" name="" id="" cols="30" rows="5"
				placeholder="Xin mời chia sẻ cảm nhận về sản phẩm">
			</v-textarea>

			<v-rating v-model="data.rating" class="text-caption" half-increments
				:item-labels="['Bad', 'So so', 'Ok', 'Good', 'Great']" item-label-position="top" color="yellow-darken-3"
				denity="comfortable">
			</v-rating>

			<v-btn rounded="xl" color="red-accent-4" variant="elevated"
				class="w-50 text-white d-flex justify-center align-center">
				Gửi đánh giá
			</v-btn>
		</v-sheet>
	</div>
	<!-- End : Review Modal  -->
</template>

<style></style>
