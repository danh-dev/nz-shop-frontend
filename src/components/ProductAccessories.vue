<script setup>
import { ref } from "vue";
const items = ref([
	{
		image:
			"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_i_xu_ng_23__4_4.png",
		name: "Tai nghe không dây Redmi Buds 4",
		price: "890.000đ",
		price1: "490.000đ",
	},
	{
		image:
			"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/o/golf_candy_10.000mah_g80_1.png",
		name: "Pin sạc dự phòng Golf Candy 10.000mAh G80.",
		price: "175.000đ",
		price1: "350.000đ",
	},
	{
		image:
			"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/g/r/group_135_1.png",
		name: "Củ sạc Baseus 25W, kèm cáp Type-C 1M",
		price: "300.000đ",
		price1: "490.000đ",
	},
	{
		image:
			"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/f/r/frame_9_1_.png",
		name: "Củ sạc Xiaomi 20W cổng USB-C",
		price: "220.000đ",
		price1: "300.000đ",
	},
	{
		image:
			"https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/f/r/frame_2_1_2.png",
		name: "Dán cường lực Xiaomi Redmi Note 12",
		price: "150.000đ",
		price1: "170.000đ",
	},
]);
</script>

<template>
	<!-- Begin : Phụ kiện mua cùng -->
	<v-sheet
		class="mx-auto border-light d-lg-block d-none"
		elevation="5"
		max-width="100%"
	>
		<h4 class="text-uppercase text-danger text-center py-3">Phụ kiện mua cùng</h4>
		<v-slide-group
			class="pa-1 my-2"
			selected-class=""
			mandatory
			show-arrows
		>
			<v-slide-group-item
				v-for="(item, index) in items"
				:key="index"
				v-slot="{ toggle, selectedClass }"
			>
				<v-card
					color=""
					:class="['ma-2', selectedClass]"
					width="180"
					@click="toggle"
				>
					<v-sheet>
						<img
							:src="item.image"
							class="w-100"
						/>
						<div class="px-1 text-center">
							<h5 class="">{{ item.name }}</h5>
							<p class="pb-3">
								<span class="mdi mdi-star"></span>
								<span class="mdi mdi-star"></span>
								<span class="mdi mdi-star"></span>
								<span class="mdi mdi-star"></span>
								<span class="mdi mdi-star"></span>
							</p>
							<p class="py-2 text-center">
								<span class="text-danger fw-bold">{{ item.price }}</span
								>&ensp;
								<span class="text-muted text-decoration-line-through text-medium">
									{{ item.price }}
								</span>
							</p>
						</div>
					</v-sheet>
				</v-card>
			</v-slide-group-item>
		</v-slide-group>
	</v-sheet>
	<!-- End : Phụ kiện mua cùng -->
</template>

<style></style>
