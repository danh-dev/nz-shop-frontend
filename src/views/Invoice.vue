<template>
  <div style="background-color: #cccccc; width: 100%; height: 100%; display: block; block-size: auto;" class="py-5">
    <v-container class="bg-white m-card" style="border-radius: 0 !important;">
      <v-row class="my-2">
        <v-col cols="6">
          <v-card rounded="0" elevation="0">
            <v-card-title>{{ siteStore.siteSetings.site_name }}</v-card-title>
            <v-card-text class="py-0">Địa chỉ: {{ siteStore.siteSetings.shop_address }}</v-card-text>
            <v-card-text class="py-0">Số điện thoại: {{ siteStore.siteSetings.shop_cskh }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card rounded="0" elevation="0" class="text-end">
            <v-card-title>Invoice No: {{ route.params.code }}</v-card-title>
            <v-card-text class="py-0">Ngày tạo: {{ formatDate(orderData.created_at) }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="my-2">
        <v-col cols="6">
          <v-card rounded="0" elevation="0">
            <v-card-title>Người nhận:</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="6">
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {siteData} from "@/stores/globals";
import axios from "@/axiosComfig";

const siteStore = siteData();
const route = useRoute();
const router = useRouter();
const orderData = ref({});


function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString();
  return `${day}/${month}/${year}`;
}

onMounted(async () => {
  siteStore.hasLoading();
  try {
    const res = await axios.get(`/orderByCode/${route.params.code}`);
    siteStore.hasRes(res);
    if (res.data.status) {
      await router.push("/");
    }
    orderData.value = res.data.data;
    console.log(orderData.value);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
    await router.push("/");
  } finally {
    siteStore.doneLoading();
  }
  if (route.query.key) {
    console.log(route.query.key);
  }
});
</script>

<style scoped>

</style>