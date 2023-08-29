import { defineStore } from "pinia";
import { ref } from "vue";

const useLoadingStore = defineStore("product", () => {
  const loading = ref(false);

  return { loading };
});

export default useLoadingStore;