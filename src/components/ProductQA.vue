<script setup>
import {ref} from "vue";
const questions = ref([
	{
		name: "",
		question: "",
	},
]);
</script>

<template>
	<v-sheet class="my-3 border-light order-last flex-md-fill">
		<h4 class="p-2 fw-medium">Hỏi và đáp</h4>
		<v-container class="d-flex flex-column px-3">
			<div>
				<v-textarea name="" class="" variant="filled" auto-grow background="white" model-value="Bình luận..."></v-textarea>
				<v-btn prepend-icon="mdi-send-circle" color="danger" class="text-white" href="#" onclick="" >Gửi</v-btn>
			</div>
			<div>
				<div
					class=""
					v-for="(question, index) in questions"
					:key="index"
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
