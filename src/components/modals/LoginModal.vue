<script setup>
import { ref } from "vue";
const loginModal = ref(null);

function showLoginModal() {
	loginModal.value.classList.add("open");
}

function hideLoginModal() {
	loginModal.value.classList.remove("open");
}


</script>

<template>
	<!-- Begin : Login Modal  -->
	<v-btn
		color="red-accent-4"
		class="text-white mt-2"
		@click="showLoginModal"
	>Đánh giá ngay</v-btn>

	<div
		class="modal"
		ref="loginModal"
		@click="hideLoginModal"
		style="z-index: 2"
	>
		<v-sheet
			position="relative"
			rounded="lg"
			class="modal-container"
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
			>
			</v-btn>

			<v-sheet
				color="red-accent-4"
				rounded="lg"
				class="modal-header py-1 d-flex align-center justify-center"
			>
				<v-icon
					size="small"
					color="white"
				>mdi-account-circle</v-icon>
				<p class="px-2 text-white">Smember ?</p>
			</v-sheet>

			<v-sheet
				class="modal-body"
				rounded="lg"
			>
				<p class="py-4 text-center">Vui lòng đăng nhập tài khoản để đánh giá.</p>
				<v-btn
					class="mx-1 text-white"
					color="red-accent-4"
					prepend-icon="mdi mdi-login"
					:to="{ name: 'login-page' }"
				>
					Đăng nhập</v-btn>
				<v-btn
					:to="{ name: 'register-page' }"
					class="mx-1"
					prepend-icon="mdi-registered-trademark"
				>Đăng ký</v-btn>
			</v-sheet>
		</v-sheet>
	</div>
	<!-- End : Login Modal  -->
</template>

<style></style>
