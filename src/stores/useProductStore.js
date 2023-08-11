import { ref } from "vue";
import { defineStore } from "pinia";
import getSlugByName from "../utils/getSlugByName";

const useProductStore = defineStore("product", () => {
  const products = ref([
    {
      id: 1,
      name: "Xiaomi Redmi Note 12 Pro",
      slug: "Xiaomi Redmi Note 12 Pro",
      price: 111,
      originPrice: 111,
      productContent: [],
      thumbImg: "",
      productGallery: [],
      productVariants: []

    },
    {
      id: 2,
      name: "",
      slug: "",
      price: 111,
      originPrice: 111,
      productContent: [],
      thumbImg: "",
      productGallery: [],
      productVariants: []

    },
    {
      id: 3,
      name: "",
      slug: "",
      price: 111,
      originPrice: 111,
      productContent: [],
      thumbImg: "",
      productGallery: [],
      productVariants: []

    }
  ]);

  const findProductBySlug = (slug) => {
    return products.value.find(product => getSlugByName(product.slug) === slug);
  };
  return { findProductBySlug };
});

export default useProductStore;