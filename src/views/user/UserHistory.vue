<script setup>
import {ref, watch, computed, onMounted, watchEffect} from "vue";
import UserBill from "@/components/user/UserBill.vue";
import axios from "@/axiosComfig";
import {siteData} from "@/stores/globals";
import {useRouter} from "vue-router";

const siteStore = siteData();
const totalSpend = ref();
const OrderList = ref([]);
const countOrder = ref(0);
const lastPage = ref(1);

const selectedPage = ref(1);

const fetchOrdersOfUser =async (v) => {
  siteStore.hasLoading();
  try {
    const res = await axios.get(`/fetchOrdersOfUser/?page=${v}`);
    totalSpend.value = res.data.Total;
    OrderList.value = res.data.list.data;
    countOrder.value = res.data.list.total;
    lastPage.value = res.data.list.last_page;
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.doneLoading();
  }
}

onMounted(async () => {
  await fetchOrdersOfUser(selectedPage.value);
});
const statusOder = (item) => {
  if (!item.transaction_id) {
    return "waiting";
  }
  if (item.transaction_id && !item.tracking_id) {
    return "done";
  }
  if (item.transaction_id && item.tracking_id && item.trackings && !item.trackings.status) {
    return "warehouse";
  }
  if (item.transaction_id && item.tracking_id && item.trackings && item.trackings.status === "shipping") {
    return "shipping";
  }
  if (item.transaction_id && item.tracking_id && item.trackings && item.trackings.status === "refund") {
    return "refund";
  }
  if (item.transaction_id && item.tracking_id && item.trackings && item.trackings.status === "done") {
    return "completed";
  }
};
const customStatusOrder = (value) => {
  switch (value) {
    case "done":
      return {
        status: "Đã thanh toán",
        color: "green-darken-2",
        icon: "mdi-archive-check-outline",
      };
    case "waiting":
      return {
        status: "Chưa thanh toán",
        color: "orange-darken-2",
        icon: "mdi-credit-card-clock-outline"
      };
    case "warehouse":
      return {
        status: "Đang chuẩn bị hàng",
        color: "green-accent-4",
        icon: "mdi-package-variant"
      };
    case "shipping":
      return {
        status: "Đã giao đơn vị vận chuyển",
        color: "teal-darken-2",
        icon: "mdi-truck-delivery-outline"
      };
    case "return":
      return {
        status: "Khách không nhận trả hàng",
        color: "mdi-truck-remove-outline",
        icon: "mdi-truck-delivery-outline"
      };
    case "completed":
      return {
        status: "Đã giao thành công",
        color: "blue-darken-2",
        icon: "mdi-check-decagram-outline"
      };
    default:
      return {
        status: "",
        color: "blue-grey-darken-4",
        icon: "mdi-skull-scan"
      };
  }
};
const url = import.meta.env.VITE_PUBLIC_URL;

watch(()=>selectedPage.value,async () => {
  await fetchOrdersOfUser(selectedPage.value);
})
const router = useRouter();
</script>

<template>
  <v-sheet
      class="d-flex flex-column"
      width="100%"
  >
    <v-sheet class="pa-5">
      <v-sheet class="d-flex ">
        <v-card
            class="d-flex flex-column text-center mr-3 pa-5"
            rounded="lg"
            width="50%"
        >
          <v-sheet class="font-weight-bold">{{ countOrder }}</v-sheet>
          <v-sheet class="text-body-2"> Đơn hàng</v-sheet>
        </v-card>
        <v-card
            rounded="lg"
            class="d-flex flex-column text-center pa-5"
            width="50%"
        >
          <v-sheet class="font-weight-bold">{{ formatPrice(totalSpend) }}</v-sheet>
          <v-sheet class="text-body-2"> Tổng tiền tích lũy</v-sheet>

        </v-card>
      </v-sheet>
    </v-sheet>
    <v-list>
      <v-list-item v-for="order in OrderList">
        <v-card
            class="d-flex ma-3 pa-2"
            variant="elevated"
            elevation="2"
        >
          <v-img
              :src="url+Array.from(JSON.parse(order.items))[0].info.image"
              width="20%"
          />

          <v-sheet width="80%">
            <v-card-title class="text-h6 font-weight-bold">{{ Array.from(JSON.parse(order.items))[0].info.name }}
            </v-card-title>

            <v-card-subtitle v-if="Array.from(JSON.parse(order.items)).length > 1" class="d-flex">và
              {{ Array.from(JSON.parse(order.items)).length - 1 }} sản phẩm khác
            </v-card-subtitle>
            <div class="ps-4">Mã hơn hàng: <span class="text-body-1 font-weight-bold">{{ order.order_code }}</span>
            </div>
            <v-chip class="ma-3" :color="customStatusOrder(statusOder(order)).color" size="small">
              {{ customStatusOrder(statusOder(order)).status }}
            </v-chip>


            <v-sheet class="d-flex justify-end align-center ma-3">
              <v-sheet class="text-body-1 font-weight-bold text-red me-auto">
                Tổng đơn hàng: {{ formatPrice(order.total_order) }}
              </v-sheet>

              <v-btn
                  class="mr-1 text-body-2"
                  variant="outlined"
                  color="red-accent-4"
              >Xem hóa đơn
              </v-btn>
              <v-btn
                  class="text-body-2"
                  variant="outlined"
                  color="red-accent-4"
                  @click="router.push({ name: 'user-history-detail', params: { code: order.order_code }})"
              >Xem chi tiết
              </v-btn>
            </v-sheet>
          </v-sheet>

        </v-card>
      </v-list-item>
      <v-list-item-action>
        <v-pagination
            v-if="lastPage>1"
            color="red-darken-2"
            v-model="selectedPage"
            :length="lastPage"
            :total-visible="$vuetify.display.xs ? 1 : lastPage"
        >
        </v-pagination>
      </v-list-item-action>
    </v-list>
  </v-sheet>
</template>

<style></style>