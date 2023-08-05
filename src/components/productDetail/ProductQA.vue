<script setup>
// import { ref } from "vue";
import informations from "../../../public/informations.js";
</script>

<template>
	<v-sheet
		elevation="3"
		rounded="2"
		class="my-3 order-last flex-md-fill"
		v-for="information in informations"
		:key="information.id"
	>
		<h4 class="p-3">Hỏi và đáp</h4>
		<v-container class="d-flex flex-column px-3">
			<div>
				<v-textarea
					name=""
					class=""
					variant="filled"
					auto-grow
					background="white"
					model-value="Bình luận..."
				></v-textarea>
				<v-btn
					prepend-icon="mdi-send-circle"
					color="danger"
					class="text-white"
					href="#"
					onclick=""
					>Gửi</v-btn
				>
			</div>
			<div>
				<div
					class=""
					v-for="question in information.questions"
					:key="question.id"
				>
					<h3>{{ question.name }}</h3>
					<p>{{ question.rating }}</p>
					<p>{{ question.comment }}</p>
				</div>
			</div>
		</v-container>
	</v-sheet>
</template>

<style></style>
