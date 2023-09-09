<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card
          class="m-card"
          height="350px"
        >
          <v-list v-if="outStockCount">
            <v-list-item
              v-for="item in outStock"
              :key="item.id"
            >
              <template #prepend>
                <v-img
                  min-width="30"
                  min-height="40"
                  class="flex-grow-0"
                  :src="`${url}${item.image}`"
                ></v-img>
              </template>
              <template #title>
                <div class="ms-3">{{ item.name }}</div>
              </template>
              <template #subtitle>
                <div class="ms-3">Số lượng: {{ item.quantity }}</div>
              </template>
            </v-list-item>
          </v-list>

          <v-sheet v-else>Không có dữ liệu</v-sheet>

        </v-card>
      </v-col>
    </v-row>


  </v-container>
</template>
<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useSeoMeta } from "@unhead/vue";
import { useRoute } from "vue-router";
const route = useRoute();
const url = import.meta.env.VITE_PUBLIC_URL;

route.meta.title = "Dashboard";
useSeoMeta({
  title: route.meta.title,
});

const outStock = ref([]);
const outStockCount = ref(0);

const fetchOutStock = async () => {
  try {
    const res = await axios.get("out-stock");
    if (res.status === 200) {
      outStock.value = res.data.data.products;
      outStockCount.value = res.data.data.count;
    }
  }
  catch (e) {
    console.log(e);
  }
};
onMounted(() => {
  fetchOutStock();
});
</script>
<style scoped></style>;