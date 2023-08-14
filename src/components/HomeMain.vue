<script setup>
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";
import useCategoryStore from "../stores/category";
import { storeToRefs } from "pinia";

import HomeMainTop from "./HomeMainTop.vue";
import ProductSlider from "./chung/ProductSlider.vue";
import ButtonBackground from "./ButtonBackground.vue";
import HomeMainProductLayout from "./HomeMainProductLayout.vue";
import ProductCard from "./chung/ProductCard.vue";
import NewsCard from "./NewsCard.vue";
import LogoButton from "./LogoButton.vue";

const categoryStore = useCategoryStore();
const { parentCategories, categories } = storeToRefs(categoryStore);
const { findBrandsOfParentCategory, findRecursiveCategorySlug } = categoryStore;

const { name } = useDisplay();

const productsShow = computed(() => {
	switch (name.value) {
		case "xs":
			return 2;
		case "sm":
			return 3;
		case "md":
			return 4;
		case "xl":
			return 6;
		case "xxl":
			return 7;
		default:
			return 5;
	}
});

const accessoriesLength = computed(() => {
	switch (name.value) {
		case "xs":
			return 6;
		case "sm":
			return 7;
		case "md":
			return 8;
		case "xl":
			return 9;
		case "xxl":
			return 12;
		default:
			return 10;
	}
});

const products = ref(
	[
		{
			id: 1,
			name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
			price: 26390000,
			prePrice: 29900000,
			categoryId: 1,
		},
		{
			id: 2,
			name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
			price: 26390000,
			prePrice: 29900000,
			categoryId: 1,
		},
		{
			id: 3,
			name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
			price: 26390000,
			prePrice: 29900000,
			categoryId: 1,
		},
		{
			id: 4,
			name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
			price: 26390000,
			prePrice: 29900000,
			categoryId: 1,
		},
		{
			id: 5,
			name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
			price: 26390000,
			prePrice: 29900000,
			categoryId: 1,
		},
		{
			id: 6,
			name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
			price: 26390000,
			prePrice: 29900000,
			categoryId: 1,
		},
		{
			id: 7,
			name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
			price: 26390000,
			prePrice: 29900000,
			categoryId: 1,
		},
		{
			id: 8,
			name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
			price: 26390000,
			prePrice: 29900000,
			categoryId: 1,
		},
		{
			id: 9,
			name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
			price: 26390000,
			prePrice: 29900000,
			categoryId: 1,
		},
		{
			id: 10,
			name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/_/t_m_18.png",
			price: 26390000,
			prePrice: 29900000,
			categoryId: 1,
		},
		{
			id: 11,
			name: "iPhone 13 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/4/14_1_9_2_9.jpg",
			price: 16290000,
			prePrice: 18990000,
			categoryId: 1,
		},
		{
			id: 12,
			name: "iPhone 13 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/4/14_1_9_2_9.jpg",
			price: 16290000,
			prePrice: 18990000,
			categoryId: 1,
		},
		{
			id: 13,
			name: "iPhone 13 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/4/14_1_9_2_9.jpg",
			price: 16290000,
			prePrice: 18990000,
			categoryId: 1,
		},
		{
			id: 14,
			name: "iPhone 13 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/4/14_1_9_2_9.jpg",
			price: 16290000,
			prePrice: 18990000,
			categoryId: 1,
		},
		{
			id: 15,
			name: "iPhone 13 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/4/14_1_9_2_9.jpg",
			price: 16290000,
			prePrice: 18990000,
			categoryId: 1,
		},
		{
			id: 16,
			name: "iPhone 13 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/4/14_1_9_2_9.jpg",
			price: 16290000,
			prePrice: 18990000,
			categoryId: 1,
		},
		{
			id: 17,
			name: "iPhone 13 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/4/14_1_9_2_9.jpg",
			price: 16290000,
			prePrice: 18990000,
			categoryId: 1,
		},
		{
			id: 18,
			name: "iPhone 13 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/4/14_1_9_2_9.jpg",
			price: 16290000,
			prePrice: 18990000,
			categoryId: 1,
		},
		{
			id: 19,
			name: "iPhone 13 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/4/14_1_9_2_9.jpg",
			price: 16290000,
			prePrice: 18990000,
			categoryId: 1,
		},
		{
			id: 20,
			name: "iPhone 13 Pro Max 128GB | Chính hãng VN/A",
			image: "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/1/4/14_1_9_2_9.jpg",
			price: 16290000,
			prePrice: 18990000,
			categoryId: 1,
		},
	]
);

const accessories = ref([
	{
		id: 20,
		name: "Nổi bật",
		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-1644.svg",
		url: "#",
	},
	{
		id: 21,
		name: "Phụ kiện Apple",
		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
		url: "#",
	},
	{
		id: 22,
		name: "Dán màn hình",
		background: "	https://cdn2.cellphones.com.vn/x/media/icons/category/cate-286.svg",
		url: "#",
	},
	{
		id: 23,
		name: "Nổi bật",
		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-1644.svg",
		url: "#",
	},
	{
		id: 24,
		name: "Phụ kiện Apple",
		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
		url: "#",
	},
	{
		id: 25,
		name: "Dán màn hình",
		background: "	https://cdn2.cellphones.com.vn/x/media/icons/category/cate-286.svg",
		url: "#",
	},
	{
		id: 26,
		name: "Nổi bật",
		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-1644.svg",
		url: "#",
	},
	{
		id: 27,
		name: "Phụ kiện Apple",
		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
		url: "#",
	},
	{
		id: 28,
		name: "Dán màn hình",
		background: "	https://cdn2.cellphones.com.vn/x/media/icons/category/cate-286.svg",
		url: "#",
	},
	{
		id: 29,
		name: "Nổi bật",
		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-1644.svg",
		url: "#",
	},
	{
		id: 30,
		name: "Phụ kiện Apple",
		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
		url: "#",
	},
	{
		id: 31,
		name: "Dán màn hình",
		background: "	https://cdn2.cellphones.com.vn/x/media/icons/category/cate-286.svg",
		url: "#",
	}
]);

const newsNumber = computed(() => {
	switch (name.value) {
		case "xs":
			return 2;
		case "sm":
			return 3;
		case "md":
			return 4;
		case "xl":
			return 5;
		case "xxl":
			return 6;
		default:
			return 4;
	}
});

const news = ref([
	{
		id: 1,
		thumbnail: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/OPPO-Reno10-10.jpeg",
		title: "10 lý do giúp OPPO Reno10 5G trở thành smartphone 10 điểm trong phân khúc tầm trung",
	},
	{
		id: 2,
		thumbnail: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/OPPO-Reno10-10.jpeg",
		title: "10 lý do giúp OPPO Reno10 5G trở thành smartphone 10 điểm trong phân khúc tầm trung",
	},
	{
		id: 3,
		thumbnail: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/OPPO-Reno10-10.jpeg",
		title: "10 lý do giúp OPPO Reno10 5G trở thành smartphone 10 điểm trong phân khúc tầm trung",
	},
	{
		id: 4,
		thumbnail: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/08/OPPO-Reno10-10.jpeg",
		title: "10 lý do giúp OPPO Reno10 5G trở thành smartphone 10 điểm trong phân khúc tầm trung",
	},
]);
</script>

<template>
	<HomeMainTop />

	<template
		v-for="category in parentCategories"
		:key="category.id"
	>
		<HomeMainProductLayout v-if="category.name !== 'Phụ kiện'">
			<template #title>
				{{ category.name }}
			</template>
			<template #button>
				<LogoButton
					v-for="brand in findBrandsOfParentCategory(category.id)"
					:key="brand.id"
					:href="findRecursiveCategorySlug(brand)"
					:logo="brand.logo"
					class="me-2"
				></LogoButton>
			</template>
			<template #content>
				<ProductSlider
					:products="products"
					:floors="category.name === 'Tablet' ? 1 : 2"
					:productsPerFloor="category.name === 'Tablet' ? 0 : 8"
					:productsShow="productsShow"
				>
					<template #default="{ props }">
						<ProductCard
							class="flex-1-0 me-2"
							:width="`calc((100% - ${8 * (productsShow - 1)}px) / ${productsShow})`"
							:style="{ translate: `calc(${-props.percent}% - ${props.px}px)` }"
							:product="props.product"
						/>
					</template>
				</ProductSlider>
			</template>
		</HomeMainProductLayout>
	</template>

	<HomeMainProductLayout>
		<template #title>Phụ kiện</template>
		<template #content>
			<v-sheet class="d-flex flex-wrap">
				<ButtonBackground
					v-for="(accessory, index) in accessories"
					:key="accessory.id"
					:style="{ backgroundImage: `url(${accessory.background})` }"
					:width="`calc((100% - ${(accessoriesLength - 1) * 8}px) / ${accessoriesLength})`"
					style="aspect-ratio: 1;"
					:href="accessory.url"
					class="mb-2 pa-0"
					:class="index % accessoriesLength !== accessoriesLength - 1 ? 'me-2' : ''"
				>
					<v-sheet
						position="absolute"
						location="top left"
						color="transparent"
						class="text-white ms-1 text-caption text-md-body-2"
					>{{ accessory.name }}</v-sheet>
				</ButtonBackground>
			</v-sheet>
		</template>
	</HomeMainProductLayout>

	<HomeMainProductLayout>
		<template #title>Tin công nghệ</template>
		<template #content>
			<v-sheet class="d-flex justify-space-between">
				<NewsCard
					v-for="item in news"
					:key="item.id"
					:item="item"
					:width="`calc((100% - 10px * ${news.length}) / ${news.length})`"
				/>
			</v-sheet>
		</template>
	</HomeMainProductLayout>
</template>

<style></style>