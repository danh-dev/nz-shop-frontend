<script setup>
// import { ref } from "vue";
import informations from "../../../public/informations.js";
</script>

<template>
	<v-sheet  elevation="3" rounded="2" v-for="information in informations" :key="information.id">
		<v-table class="news text-medium my-3 py-2 d-md-none d-lg-flex d-none d-sm-flex">
			<thead>
				<tr>
					<th colspan="2">
						<div class="d-flex align-center">
							<v-icon color="danger">mdi-newspaper-variant-multiple</v-icon>
							<h3 class="px-1 text-uppercase">Tin tức về sản phẩm</h3>
						</div>
					</th>
				</tr>
			</thead>
			<tbody
				v-for="article in information.articles"
				:key="article.id"
			>
				<tr>
					<th style="width: 40%">
						<v-img
							class="w-100 d-flex align-center py-2"
							:src="article.image"
							alt=""
						/>
					</th>
					<td class="py-1">
						<a
							class="text-decoration-none text-dark"
							href="#"
							>{{ article.title }}</a
						>
					</td>
				</tr>
			</tbody>
		</v-table>
		<v-btn
			href="/home/news"
			color="danger"
			class="text-white"
			append-icon="mdi-chevron-down"
			location="center"
			>Xem tất cả bài viết
		</v-btn>
	</v-sheet>
</template>

<style></style>
