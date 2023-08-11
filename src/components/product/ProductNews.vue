<script setup>
import useNewsStore from "../../stores/useNewsStore.js";
import { storeToRefs } from "pinia";
import getSlugByName from "../../utils/getSlugByName.js";
const { productArticles } = storeToRefs(useNewsStore());
</script>

<template>
	<v-sheet elevation="3" rounded="lg" class="d-none d-md-none d-lg-block">
		<v-table class="news text-medium my-3 py-2">
			<thead>
				<tr>
					<th colspan="2">
						<v-sheet class="d-flex align-center">
							<v-icon color="#cd3545">mdi-newspaper-variant-multiple</v-icon>
							<h3 class="px-1 text-uppercase">Tin tức về sản phẩm</h3>
						</v-sheet>
					</th>
				</tr>
			</thead>
			<tbody v-for="productArticle in productArticles" :key="productArticle.id">
				<tr>
					<th style="width: 40%">
						<img class="w-100 d-flex align-center py-2" :src="productArticle.image" alt="" />
					</th>
					<td class="py-1">
						<a :href="`/news/${getSlugByName(productArticle.title)}`" class="text-decoration-none text-dark">
							{{ productArticle.title }}
						</a>
					</td>
				</tr>
			</tbody>
		</v-table><br>

		<v-btn href="/news" color="#cd3545" class="text-white" append-icon="mdi-chevron-down" location="center">
			Xem tất cả bài viết
		</v-btn>
	</v-sheet>
</template>

<style></style>
