<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useDisplay } from "vuetify";

import { mapKeys, camelCase } from "lodash";
import axios from "../../axiosComfig";
import useCategoryStore from "@/stores/category";

import HomeMainTop from "./HomeMainTop.vue";
import ProductSlider from "@/components/globals/ProductSlider.vue";
import ButtonBackground from "./ButtonBackground.vue";
import HomeMainProductLayout from "./HomeMainProductLayout.vue";
import ProductCard from "@/components/globals/ProductCard.vue";
import NewsCard from "./NewsCard.vue";
import LogoButton from "./LogoButton.vue";
import { siteData } from "@/stores/globals";

const categoryStore = useCategoryStore();
const siteStore = siteData();

const { findBrandsOfParentCategory, findRecursiveCategorySlug, fetchCategories } = categoryStore;

const gallery = ref([]);
const posts = ref([]);
const products = ref({});

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

// const accessoriesLength = computed(() => {
// 	switch (name.value) {
// 		case "xs":
// 			return 6;
// 		case "sm":
// 			return 7;
// 		case "md":
// 			return 8;
// 		case "xl":
// 			return 9;
// 		case "xxl":
// 			return 12;
// 		default:
// 			return 10;
// 	}
// });

// const accessories = ref([
// 	{
// 		id: 20,
// 		name: "Nổi bật",
// 		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-1644.svg",
// 		url: "#",
// 	},
// 	{
// 		id: 21,
// 		name: "Phụ kiện Apple",
// 		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
// 		url: "#",
// 	},
// 	{
// 		id: 22,
// 		name: "Dán màn hình",
// 		background: "	https://cdn2.cellphones.com.vn/x/media/icons/category/cate-286.svg",
// 		url: "#",
// 	},
// 	{
// 		id: 23,
// 		name: "Nổi bật",
// 		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-1644.svg",
// 		url: "#",
// 	},
// 	{
// 		id: 24,
// 		name: "Phụ kiện Apple",
// 		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
// 		url: "#",
// 	},
// 	{
// 		id: 25,
// 		name: "Dán màn hình",
// 		background: "	https://cdn2.cellphones.com.vn/x/media/icons/category/cate-286.svg",
// 		url: "#",
// 	},
// 	{
// 		id: 26,
// 		name: "Nổi bật",
// 		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-1644.svg",
// 		url: "#",
// 	},
// 	{
// 		id: 27,
// 		name: "Phụ kiện Apple",
// 		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
// 		url: "#",
// 	},
// 	{
// 		id: 28,
// 		name: "Dán màn hình",
// 		background: "	https://cdn2.cellphones.com.vn/x/media/icons/category/cate-286.svg",
// 		url: "#",
// 	},
// 	{
// 		id: 29,
// 		name: "Nổi bật",
// 		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-1644.svg",
// 		url: "#",
// 	},
// 	{
// 		id: 30,
// 		name: "Phụ kiện Apple",
// 		background: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
// 		url: "#",
// 	},
// 	{
// 		id: 31,
// 		name: "Dán màn hình",
// 		background: "	https://cdn2.cellphones.com.vn/x/media/icons/category/cate-286.svg",
// 		url: "#",
// 	}
// ]);

const postsNumber = computed(() => {
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

watch(() => categoryStore.parentCategories, async (newVal) => {
  for (const category of newVal) {
    products.value[category.id] = await fetchRecursiveCategoryProducts(category.id, 8, siteStore.userInfo.user_id);
  }
});

const fetchRecursiveCategoryProducts = async (id, numbers, userId) => {
  let result = [];
  try {
    const res = await axios.get(`recursive-categories/${id}/products/${numbers || ""}`);
    if (res.status === 200) {
      result = res.data.data.map(product => mapKeys(product, (value, key) => camelCase(key)));
    }
  }
  catch (e) {
    //push
    console.log(e);
  }
  return result;
};

const fetchGallery = async () => {
  try {
    const res = await axios.get("sliders");
    if (res.status === 200) {
      gallery.value = res.data.data.map(item => mapKeys(item, (value, key) => camelCase(key)));
    }
  }
  catch (e) {
    //push
  }
};

const fetchPosts = async () => {
  try {
    const res = await axios.get("randomPosts");
    if (res.status === 200) {
      posts.value = res.data.data.map(post => mapKeys(post, (value, key) => camelCase(key)));
    }
  }
  catch (e) {
    //push
    console.log(e);
  }
};

onMounted(() => {
  fetchCategories();
  fetchGallery();
  fetchPosts();
});
</script>

<template>
  <HomeMainTop :gallery="gallery" />

  <template
      v-for="category in categoryStore.parentCategories"
      :key="category.id"
  >
    <HomeMainProductLayout
        v-if="category.name !== 'Phụ kiện' && products[category.id] && products[category.id].length >= 8"
    >
      <template #title>
        {{ category.name }}
      </template>
      <template #button>
        <LogoButton
            v-for="brand in findBrandsOfParentCategory(category.id)"
            :key="brand.id"
            :to="`/danh-muc/${findRecursiveCategorySlug(brand)}`"
            :image="brand.image"
            class="me-2"
        ></LogoButton>
      </template>
      <template #content>
        <ProductSlider
            :products="products[category.id] ?? []"
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
                :to="`/san-pham/${props.product.slug}`"
            />
          </template>
        </ProductSlider>
      </template>
    </HomeMainProductLayout>
  </template>

  <!-- <HomeMainProductLayout>
    <template #title>Phụ kiện</template>
    <template #content>
      <v-sheet class="d-flex flex-wrap">
        <ButtonBackground
          v-for="(accessory, index) in accessories"
          :key="accessory.id"
          :style="{ backgroundImage: `url(${accessory.background})` }"
          :width="`calc((100% - ${(accessoriesLength - 1) * 8}px) / ${accessoriesLength})`"
          style="aspect-ratio: 1;"
          :to="accessory.url"
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
  </HomeMainProductLayout> -->

  <HomeMainProductLayout>
    <template #title>Tin công nghệ</template>
    <template #content>
      <v-sheet class="d-flex justify-space-between">
        <NewsCard
            v-for="item in posts.slice(0, postsNumber)"
            :key="item.id"
            :item="item"
            :width="`calc((100% - 10px * ${postsNumber}) / ${postsNumber})`"
        />
      </v-sheet>
    </template>
  </HomeMainProductLayout>
</template>

<style></style>