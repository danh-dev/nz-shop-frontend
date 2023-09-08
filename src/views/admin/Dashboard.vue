<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card class="m-card">
          <v-list v-if="outStockCount">
            <v-list-item
              v-for="item in outStock"
              :key="item.id"
            >

            </v-list-item>
          </v-list>
          <div v-else>
            Không có dữ liệu
          </div>
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