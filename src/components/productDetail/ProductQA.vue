<script setup>
// import { ref } from "vue";
import product from "../../product.js";
</script>

<template>
	<v-sheet elevation="3" rounded="lg" class="my-3 order-last flex-md-fill">
		<h4 class="px-4 py-2">Hỏi và đáp</h4>
		<v-container class="d-flex flex-column px-3">
			<div>
				<v-textarea name="" class="" variant="filled" auto-grow background="white"
					model-value="Bình luận..."></v-textarea>
				<v-btn prepend-icon="mdi-send-circle" color="#cd3545" class="text-white" href="#" onclick="">Gửi</v-btn>
			</div>
			<div>
				<div class="" v-for="question in product.questions" :key="question.id">
					<h3>{{ question.name }}</h3>
					<p>{{ question.rating }}</p>
					<p>{{ question.comment }}</p>
				</div>
			</div>
		</v-container>
	</v-sheet>
</template>

<style></style>
