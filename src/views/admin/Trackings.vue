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
                  label="Từ ngày"
                  density="compact"
                  variant="outlined"
                  type="date"
                  class="me-2"
                  clearable
              />
              <v-text-field
                  color="red-accent-2"
                  v-model="selectDateEnd"
                  label="Trước ngày"
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
                  :items="typeTracking"
                  item-title="name"
                  item-value="value"
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
          <template #item.order_code="{ item }">
            <h5 class="text-base m-title">
              {{ item.raw.order.order_code }}
            </h5>
          </template>
          <template #item.deliver="{ item }">
            <div v-if="!item.raw.deliver_info" >
            </div>
            <div v-else-if="item.raw.deliver ==='user'" elevation="2"  color="blue-grey-lighten-4">
              <span class="text-grey-darken-2">Họ và tên:</span> {{ JSON.parse(item.raw.deliver_info).full_name }}<br>
              <span class="text-grey-darken-2">Số điện thoại:</span>{{ JSON.parse(item.raw.deliver_info).phone_number }}
            </div>
            <div v-else elevation="2" color="blue-grey-lighten-4">
              <span class="text-grey-darken-2">Đối tác:</span>Giao hàng tiết kiệm
            </div>
          </template>
          <template #item.created_at="{ item }">
            <h5 class="text-base m-title">
              {{ formatDate(item.raw.created_at) }}
            </h5>
          </template>
          <template #item.updated_at="{ item }">
            <h5 class="text-base m-title">
              {{ formatDate(item.raw.updated_at) }}
            </h5>
          </template>
          <template #item.status="{ item }">
            <h5 class="text-base m-title">
              {{ customStatusTracking(item.raw.status) }}
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
const datas = ref([]);


const typeTracking = [
  {
    name: "Đang đóng gói",
    value: ""
  },
  {
    name: "Đang vận chuyển",
    value: "shipping"
  },
  {
    name: "Hàng trả về",
    value: "return"
  },
  {
    name: "Đã giao xong",
    value: "done"
  }
];

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
    title: "Vận chuyển bởi",
    key: "deliver",
  },
  {
    title: "Ngày tạo",
    key: "created_at",
    align: "center",
  },
  {
    title: "Cập nhật cuối",
    key: "updated_at",
  },
  {
    title: "Trạng thái",
    key: "status",
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

const customStatusTracking = (value) => {
  switch (value.toLowerCase()) {
    case "shipping":
      return "Đang vận chuyển";
    case "return":
      return "Hàng trả về";
    case "done":
      return "Đã giao thành công";
    default:
      return "Đang chuẩn bị hàng";
  }
};

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const fetchListTransaction = async (q, ds, de, t) => {
  siteStore.isLoading = true;
  const queryString = q ? q.toLowerCase() : "";
  const queryDateStart = ds || "";
  const queryDateEnd = de || "";
  const queryType = t ? t.toLowerCase() : "";
  try {
    const res = await axios.get("fetchListTracking");
    datas.value = res.data.filter(data => (
        (data.order.order_code.toLowerCase().includes(queryString)) &&
        (!queryDateStart || data.created_at >= queryDateStart) &&
        (!queryDateEnd || data.created_at <= queryDateEnd) &&
        (!queryType || data.status.toLowerCase() === queryType)
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

onMounted(async () => {
  await fetchListTransaction();
});

siteStore.titleNow = "Tracking Management";
useSeoMeta({
  title: siteStore.titleNow,
});
</script>

<style>
</style>