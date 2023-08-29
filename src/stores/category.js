import { defineStore } from "pinia";
import axios from "../axiosComfig";
import { mapKeys, camelCase, lowerFirst } from "lodash";
import { ref, computed, getCurrentInstance, onMounted } from "vue";

import getSlugByName from "../utils/getSlugByName.js";
import findOneBySlug from "../utils/findOneBySlug.js";

const url = import.meta.env.VITE_PUBLIC_URL;

const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);

  const parentCategories = computed(() => {
    return categories.value.filter(item => !item.parentCategoryId);
  });

  const findBrandsOfParentCategory = id => {
    return categories.value.filter(item => item.isBrand && item.parentCategoryId === id);
  };

  const findRecursiveCategorySlug = category => {
    const slug = getSlugByName(category.name);
    if (!category.parentCategoryId) {
      return `/${slug}`;
    }
    const parentCategory = categories.value.find(item => item.id === category.parentCategoryId);
    return findRecursiveCategorySlug(parentCategory) + `/${slug}`;
  };

  const findCategoryBySlug = slug => {
    return findOneBySlug(categories.value, "name", slug);
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`categories`);
      if (res.status === 200) {
        categories.value = res.data.data.map(category => mapKeys(category, (value, key) => camelCase(key)));
      }
    }
    catch (e) {
      //push
    }
  };

  if (getCurrentInstance()) {
    onMounted(fetchCategories);
  }
  return {
    categories,
    parentCategories,
    findBrandsOfParentCategory,
    findRecursiveCategorySlug,
    findCategoryBySlug
  };
});

export default useCategoryStore;
