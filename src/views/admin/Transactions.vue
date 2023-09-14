<template>
  <v-row>
    <v-col cols="12">
      <v-card class="m-card">
        <v-card-title class="font-weight-bold text-h5 my-3 text-grey-darken-2">Danh sách giao dịch</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="5" md="3" class="d-flex">
              <v-text-field
                  color="red-accent-2"
                  v-model="searchQuery"
                  placeholder="Tìm kiếm ..."
                  density="compact"
                  variant="outlined"
                  autocomplete="off"
              />
            </v-col>
            <v-spacer/>
            <v-col cols="12" sm="3" md="2">
              <v-select
                  color="red-accent-2"
                  density="compact"
                  variant="outlined"
                  :model-value="options.itemsPerPage"
                  :items="[
                          { value: 10, title: '10' },
                          { value: 25, title: '25' },
                          { value: 50, title: '50' },
                        ]"
                  @update:model-value="options.itemsPerPage = parseInt($event, 10)"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider/>
        <v-card-text>
          <v-row>
            <v-col
                cols="12"
                sm="6"
                class="d-flex"
            >
              <v-text-field
                  color="red-accent-2"
                  v-model="selectDateStart"
                  label="Ngày bắt đầu"
                  density="compact"
                  variant="outlined"
                  type="date"
                  class="me-2"
                  clearable
              />
              <v-text-field
                  color="red-accent-2"
                  v-model="selectDateEnd"
                  label="Ngày kết thúc"
                  density="compact"
                  variant="outlined"
                  type="date"
                  class="ms-2"
                  clearable
              />
            </v-col>
            <v-spacer></v-spacer>
            <v-col
                cols="12"
                sm="3"
                class="d-flex"
            >
              <v-select
                  density="compact"
                  v-model="selectedType"
                  label="Loại"
                  :items="['Stripe','VNPay']"
                  clearable
                  variant="outlined"
                  color="red-accent-2"
                  aria-autocomplete="none"
                  class="ms-3"
                  autocomplete="off"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider/>
        <v-data-table
            v-model:items-per-page="options.itemsPerPage"
            v-model:page="options.page"
            :items="datas"
            :items-length="datas.length"
            :headers="headers"
            class="text-no-wrap"
            @update:options="options = $event"
        >
          <template #item.type_coupon="{ item }">
            <div class="d-flex align-center">
              <v-avatar
                  size="34"
                  variant="tonal"
                  :color="customType(item.raw.type_coupon).color"
                  class="me-3"
              >
                <v-icon :icon="customType(item.raw.type_coupon).icon"></v-icon>
              </v-avatar>
              <div class="d-flex flex-column">
                <h5 class="text-base m-title" :title="item.raw.name">
                  {{ item.raw.name }}
                </h5>
              </div>
            </div>
          </template>
          <template #item.order_code="{ item }">
            <h5 class="text-base m-title">
              {{ item.raw.order.order_code }}
            </h5>
          </template>
          <template #item.amount="{ item }">
            <h5 class="text-base m-title">
              {{ formatPrice(item.raw.amount) }}
            </h5>
          </template>
          <template #item.payment_method="{ item }">
            <v-chip density="comfortable" variant="flat"
                    :color="item.raw.payment_method === 'stripe'?'deep-purple-darken-1':'blue-darken-2'">
              {{ item.raw.payment_method }}
            </v-chip>
          </template>
          <template #item.created_at="{ item }">
            <h5 class="text-base m-title">
              {{ formatDate(item.raw.created_at) }}
            </h5>
          </template>
          <template #item.status="{ item }">
            <h5 class="text-base m-title">
              {{ item.raw.status }}
            </h5>
          </template>
          <template #item.actions="{ item }">
            <v-btn variant="text" density="compact" icon="mdi-text-box-edit-outline" color="grey-darken-1"
                   :to="`/admincp/orders/detail/${item.raw.order.order_code}`"></v-btn>
          </template>
          <template #bottom>
            <v-divider/>
            <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
              <p class="text-sm text-disabled mb-0">
                {{ paginationMeta(options, totalData) }}
              </p>

              <v-pagination
                  color="red-darken-2"
                  v-model="options.page"
                  :length="totalPage"
                  :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalData / options.itemsPerPage)"
              >
              </v-pagination>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import {useRoute} from "vue-router";
import {useSeoMeta} from "@unhead/vue";
import {computed, onMounted, ref, watch, watchEffect} from "vue";
import {rule_name_utf8, rule_coupon, ruleTypeCoupon} from "@/validators";
import axios from "../../axiosComfig";
import {siteData} from "@/stores/globals";


const siteStore = siteData();
const route = useRoute();
const searchQuery = ref("");
const selectedType = ref();
const selectDateStart = ref();
const selectDateEnd = ref();
const roles = ref();
const datas = ref([]);

const options = ref({
  page: 1,
  itemsPerPage: 10,
});
const totalData = computed(() => {
  return datas.value.length;
});
const totalPage = computed(() => {
  return Math.ceil(totalData.value / options.value.itemsPerPage) || 1;
});
const paginationMeta = computed(() => {
  return (options, total) => {
    const start = (options.page - 1) * options.itemsPerPage + 1;
    const end = Math.min(options.page * options.itemsPerPage, total);

    return `Đang hiển thị từ ${start} đến ${end} trên tổng ${total} dữ liệu.`;
  };
});
const headers = [
  {
    title: "ID",
    key: "id",
    sortable: false,
  },
  {
    title: "Mã đơn hàng",
    key: "order_code",
    sortable: false,
  },
  {
    title: "Phương thức",
    key: "payment_method",
  },
  {
    title: "Số tiền",
    key: "amount",
  },
  {
    title: "Ngày thực hiện",
    key: "created_at",
    align: "center",
  },
  {
    title: "Trạng thái",
    key: "status",
    align: "center",
    sortable: false,
  },
  {
    title: "Chức năng",
    key: "actions",
    align: "center",
    sortable: false,
  },
];

// Watch
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString();
  return `${day}/${month}/${year}`;
}

const fetchListTransaction = async (q, ds, de, t) => {
  siteStore.isLoading = true;
  const queryString = q ? q.toLowerCase() : "";
  const queryDateStart = ds || "";
  const queryDateEnd = de || "";
  const queryType = t ? t.toLowerCase() : "";
  try {
    const res = await axios.get("fetchListTransaction");
    datas.value = res.data.filter(data => (
        (data.order.order_code.toLowerCase().includes(queryString)) &&
        (!queryDateStart || data.created_at >= queryDateStart) &&
        (!queryDateEnd || data.created_at <= queryDateEnd) &&
        (!queryType || data.payment_method.toLowerCase() === queryType)
    )).reverse();
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};

watchEffect(async () => {
  await fetchListTransaction(searchQuery.value, selectDateStart.value, selectDateEnd.value, selectedType.value);
});
// onMounted
onMounted(async () => {
  await fetchListTransaction();
});

siteStore.titleNow = "Transactions Management";
useSeoMeta({
  title: siteStore.titleNow,
});
</script>

<style>
</style>