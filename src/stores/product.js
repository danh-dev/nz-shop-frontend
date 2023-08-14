import { defineStore, computed } from "pinia";
import { ref } from "vue";

const useProductStore = defineStore("product", () => {
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

  computed(() => {
    return products.value;
  });

  return { products };
});

export default useProductStore;