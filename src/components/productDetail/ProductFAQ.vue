<script setup>
// import { ref } from "vue";
import product from "../../product.js";
</script>

<template>
	<v-sheet elevation="3" rounded="lg" class="my-3">
		<h4 class="text-uppercase text-center pt-3">câu hỏi thường gặp</h4>
		<v-sheet class="faq-content" v-for="faq in product.faqs" :key="faq.id">
			<div class="faq-question">
				<input :id="faq.id" type="checkbox" class="panel" />
				<v-icon size="25" class="plus">mdi-chevron-down</v-icon>
				<label :for="faq.id" class="panel-title">{{ faq.question }}
				</label>
				<div class="panel-content" v-for="answer in faq.answer" :key="answer.id">
					<p>{{ answer.answer }}</p>
				</div>
			</div>
		</v-sheet>
	</v-sheet>
</template>

<style>
/* BEGIN : FAQ Design */
.faq-content {
	margin: 0 auto;
}

.faq-question {
	padding: 10px 0;
	border-bottom: 1px dotted #ccc;
	font-size: 1rem;
}

.panel-title {
	font-size: 0.85rem;
	font-weight: 600;
	/* width: 100%; */
	position: relative;
	margin: 0;
	padding: 10px 10px 0 48px;
	display: block;
	cursor: pointer;
}

.panel-title:hover {
	color: #dc3545;
}

.panel-content {
	font-size: 0.8rem;
	margin: 0 4px;
	height: 0;
	overflow: hidden;
	z-index: 1;
	position: relative;
	opacity: 0;
	transition: 0.5s ease;
	background-color: rgb(247, 243, 243);
	border-radius: 5px;
}

.panel:checked~.panel-content {
	height: auto;
	opacity: 1;
	padding: 14px;
	margin: 4px 8px 0 8px;
}

.plus {
	position: absolute;
	margin: 8px 0 0 12px;
}

.panel {
	display: none;
}

/* END : FAQ Design */
</style>
