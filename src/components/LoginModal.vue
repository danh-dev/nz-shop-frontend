<template>
	<!-- Begin : Login Modal  -->
	<v-btn
		color="danger"
		class="text-white mt-2"
		@click="showLoginModal"
		>Đánh giá ngay</v-btn
	>
	<div
		class="modal"
		ref="modal"
		@click="hideLoginModal"
	>
		<v-sheet
			position="relative"
			class="modal-container rounded-lg"
			@click.stop
		>
			<v-btn
				class="modal-close-btn"
				@click="hideLoginModal"
				size="small"
				position="absolute"
				icon="mdi-close-circle"
				location="right top"
				variant="text"
				color="white"
			></v-btn>

			<v-sheet class="modal-header py-1 bg-danger d-flex align-center justify-center rounded-2">
				<v-icon
					size="small"
					color="white"
					>mdi-account-circle</v-icon
				>
				<p class="px-2 text-white">Smember ?</p>
			</v-sheet>

			<v-sheet class="modal-body">
				<p class="py-4 text-center">Vui lòng đăng nhập tài khoản để đánh giá.</p>
				<v-btn
					href="#"
					class="mx-1 text-white"
					color="danger"
					prepend-icon="mdi mdi-login"
					>Đăng nhập</v-btn
				>
				<v-btn
					href="#"
					class="mx-1"
					prepend-icon="mdi-registered-trademark"
					>Đăng ký</v-btn
				>
			</v-sheet>
		</v-sheet>
	</div>
</template>
<script setup>
import { ref } from "vue";
const modal = ref(null);
function showLoginModal() {
	modal.value.classList.add("open");
}
function hideLoginModal() {
	modal.value.classList.remove("open");
}
</script>
