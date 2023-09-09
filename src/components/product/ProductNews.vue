<script setup>
import getSlugByName from "../../utils/getSlugByName.js";

defineProps({
	posts: Array,
});
const url = "http://127.0.0.1:8000/";
</script>

<template>
	<v-sheet
		elevation="3"
		rounded="lg"
		class="d-none d-md-none d-lg-block"
	>
		<v-table class="news text-medium my-2 py-2">
			<thead>
				<tr>
					<th colspan="2">
						<v-sheet class="d-flex align-center">
							<v-icon color="red-accent-4">mdi-newspaper-variant-multiple</v-icon>
							<h3 class="px-1 text-uppercase">Tin tức về sản phẩm</h3>
						</v-sheet>
					</th>
				</tr>
			</thead>

			<tbody
				v-for="item in posts"
				:key="item.id"
			>
				<tr>
					<th style="width: 40%;">
						<img
							class="w-100 d-flex align-center rounded-lg my-1"
							:src="`${url}${item.image}`"
							:alt="item.title"
						/>
					</th>
					<td>
						<a
							:href="`/news/${getSlugByName(item.title)}`"
							class="text-decoration-none text-caption more"
						>
							{{ item.title }}
						</a>
					</td>
				</tr>
			</tbody>
		</v-table><br>

		<v-btn
			:to="`/news`"
			color="red-accent-4"
			class="text-white"
			append-icon="mdi-chevron-down"
			location="center"
		>
			Xem tất cả bài viết
		</v-btn>

	</v-sheet>
</template>

<style scoped></style>
