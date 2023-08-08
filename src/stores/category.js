import { ref, computed, onBeforeMount } from "vue";
import { defineStore } from "pinia";
import getSlugByName from "../utils/getSlugByName.js";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);
  const parentCategories = computed(() => {
    return categories.value.filter(item => !item.parentCategoryId);
  });

  onBeforeMount(() => {
    categories.value = [
      {
        id: 1,
        name: "Phone",
        parentCategoryId: null,
        image: "https://cdn2.cellphones.com.vn/40x,webp,q70/media/catalog/product/m/b/mb-phone.png",
      },
      {
        id: 2,
        name: "Laptop",
        parentCategoryId: null,
        image: "https://cdn2.cellphones.com.vn/40x,webp,q70/media/catalog/product/m/b/mb-phone.png",
      },
      {
        id: 3,
        name: "PC",
        parentCategoryId: null,
        image: "https://cdn2.cellphones.com.vn/40x,webp,q70/media/catalog/product/m/b/mb-phone.png",
      },
      {
        id: 4,
        name: "Iphone",
        parentCategoryId: 1,
        isBrand: true,
        logo: "https://cdn2.cellphones.com.vn/x50,webp,q100/media/tmp/catalog/product/t/_/t_i_xu_ng_71_.png"
      },
      {
        id: 5,
        name: "Samsung",
        parentCategoryId: 1,
        isBrand: true,
        logo: "https://cdn2.cellphones.com.vn/x50,webp,q100/media/tmp/catalog/product/t/_/t_i_xu_ng_72_.png",
      },
      {
        id: 6,
        name: "Mac",
        parentCategoryId: 2,
        isBrand: true,
        logo: "https://cdn2.cellphones.com.vn/x50,webp,q100/media/tmp/catalog/product/t/_/t_i_xu_ng_74_.png"
      },
      {
        id: 7,
        name: "Surface",
        parentCategoryId: 2,
      },
      {
        id: 8,
        name: "ASUS",
        parentCategoryId: 3,
      },
      {
        id: 9,
        name: "DELL",
        parentCategoryId: 3,
        isBrand: true
      },
      {
        id: 10,
        name: "Lenovo",
        parentCategoryId: 1,
        isBrand: true,
        logo: "https://cdn2.cellphones.com.vn/x50,webp,q100/media/tmp/catalog/product/t/_/t_i_xu_ng_74_.png",
      },
      {
        id: 11,
        name: "Lenovo",
        parentCategoryId: 2,
      },
      {
        id: 12,
        name: "Accessories",
        parentCategoryId: null,
      }
    ];
  });

  const findBrandsOfParentCategory = (id) => {
    return categories.value.filter(item => item.isBrand && item.parentCategoryId === id);
  };

  const findRecursiveCategorySlug = (category) => {
    const slug = getSlugByName(category.name);
    if (!category.parentCategoryId) {
      return `/${slug}`;
    }
    const parentCategory = categories.value.find((item) => item.id === category.parentCategoryId);
    return findRecursiveCategorySlug(parentCategory) + `/${slug}`;
  };

  return {
    categories,
    parentCategories,
    findBrandsOfParentCategory,
    findRecursiveCategorySlug
  };
});
