<script setup>
// import { ref } from "vue";

defineProps({
	comments: Array,
});

</script>

<template>
	<v-sheet
		elevation="3"
		rounded="lg"
		class="my-3 order-last flex-md-fill"
	>
		<h4 class="px-4 py-2">Hỏi và đáp</h4>
		<v-container class="d-flex flex-column px-3">
			<div>
				<v-textarea
					variant="filled"
					auto-grow
					background="white"
					model-value="Bình luận..."
				></v-textarea>
				<v-btn
					prepend-icon="mdi-send-circle"
					color="red-accent-4"
					class="text-white"
					onclick=""
				>Gửi</v-btn>
			</div>
			<div>
				<div
					class=""
					v-for="comment in comments"
					:key="comment.id"
				>
					<h3>{{ comment.user }}</h3>
					<p>{{ comment.comment }}</p>
				</div>
			</div>
		</v-container>
	</v-sheet>
</template>

<style></style>
