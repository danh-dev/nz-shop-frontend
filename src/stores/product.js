import { defineStore } from "pinia";
import { mapKeys, camelCase, lowerFirst } from "lodash";
import axios from "axios";
import { ref, computed, getCurrentInstance, onMounted, watch } from "vue";

const url = "http://127.0.0.1:8000/";

const useProductStore = defineStore("product", () => {
  const products = ref([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${url}api/products`);
      if (res.status === 200) {
        products.value = res.data.data.map(product => mapKeys(product, (value, key) => camelCase(key)));
      }
    }
    catch (e) {
      //push
    }
  };

  if (getCurrentInstance()) {
    onMounted(fetchProducts);
  }

  return { products };
});

export default useProductStore;