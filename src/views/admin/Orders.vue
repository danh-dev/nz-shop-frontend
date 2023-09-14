<template>
  <v-row>
    <v-col cols="12">
      <v-card class="m-card">
        <v-card-title class="font-weight-bold text-h5 my-3 text-grey-darken-2">Danh sách đơn hàng</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="4" md="4" class="d-flex">
              <v-text-field
                  color="red-accent-2"
                  v-model="searchQuery"
                  placeholder="Tìm kiếm..."
                  density="compact"
                  variant="outlined"
              />
            </v-col>
            <v-spacer/>
            <v-col cols="12" sm="4" md="3" class="d-flex justify-end">
            </v-col>
            <v-col cols="12" sm="3" md="2">
              <v-select
                  color="red-accent-2"
                  density="compact"
                  variant="outlined"
                  :model-value="options.itemsPerPage"
                  :items="[
                          { value: 10, title: '10' },
                          { value: 25, title: '25' },
                          { value: 50, title: '50' }
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
                  :items="typeCoupon"
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
            :items="orders"
            :items-length="orders.length"
            :headers="headers"
            class="text-no-wrap"
            @update:options="options = $event"
        >
          <template #item.index="{ item }">{{ item.index + 1 }}</template>
          <template #item.code_order="{ item }">
            <div class="d-flex align-center">
              <v-avatar
                  size="34"
                  variant="tonal"
                  :color="customStatusOrder(statusOder(item.raw)).color"
                  class="me-3"
                  :title="customStatusOrder(statusOder(item.raw)).status"
              >
                <v-icon :icon="customStatusOrder(statusOder(item.raw)).icon"></v-icon>
              </v-avatar>
              <h5 class="text-base">
                {{ item.raw.order_code || "**********" }}
              </h5>
            </div>
          </template>
          <template #item.customer="{ item }">
            <h5 v-if="item.raw.email_buyer" class="text-base">
              {{ item.raw.email_buyer }}
            </h5>
            <h5 v-if="item.raw.phone_number_tracking" class="text-base">
              {{ item.raw.phone_number_tracking }}
            </h5>
          </template>
          <template #item.total_order="{ item }">
            <h5 class="text-base">
              {{ formatPrice(item.raw.total_order || 0) }}
            </h5>
          </template>
          <template #item.value_discount="{ item }">
            <h5 class="text-base">
              {{ formatPrice(item.raw.value_discount || 0) }}
            </h5>
          </template>
          <template #item.profit="{ item }">
            <h5 class="text-base">
              {{ formatPrice(item.raw.profit || 0) }}
            </h5>
          </template>
          <template #item.created_at="{ item }">
            <h5 class="text-base">
              {{ formatDate(item.raw.created_at || 0) }}
            </h5>
          </template>
          <template #item.actions="{ item }">
            <v-btn v-if="statusOder(item.raw)==='done'"
                   @click="()=>{formTracking = !formTracking; createTrackingFor = item.raw.id||null}" variant="text"
                   density="compact" icon="mdi-truck-fast-outline" color="grey-darken-1"></v-btn>
            <v-btn variant="outlined" density="compact" color="grey-darken-1" title="Chức năng"
                   class="ma-2 pa-1" size="30" rounded>
              <v-icon>mdi-dots-vertical</v-icon>
              <v-menu activator="parent">
                <v-list>
                  <v-list-item v-if="statusOder(item.raw) !== 'waiting'" density="compact"
                               @click="clickTrans(item.index)">Xem nhanh giao dịch
                  </v-list-item>
                  <v-list-item v-if="statusOder(item.raw) !== 'waiting' && statusOder(item.raw) !== 'done'"
                               density="compact" @click="clickTrank(item.index)">Xem nhanh vận chuyển
                  </v-list-item>
                  <v-list-item density="compact">Xem chi tiết đơn hàng</v-list-item>
                </v-list>
              </v-menu>
            </v-btn>

          </template>
          <template #bottom>
            <v-divider/>
            <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
              <p class="text-sm text-disabled mb-0">
                {{ paginationMeta(options, totalUsers) }}
              </p>

              <v-pagination
                  color="red-darken-2"
                  v-model="options.page"
                  :length="totalPage"
                  :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalUsers / options.itemsPerPage)"
              >
              </v-pagination>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog
      v-model="formTracking"
      max-width="450"
  >
    <v-card>
      <template #append>
        <v-btn density="compact" icon="mdi-close" color="red-darken-2" @click="formTracking = !formTracking"></v-btn>
      </template>
      <v-card-title class="text-center">
        <span class="text-h6 font-weight-bold">Bạn đã chuẩn bị hàng xong?</span>
      </v-card-title>
      <v-card-item>
        <v-radio-group
            v-model="selectedDeliver"
            color="red-darken-3"
            :rules="[(value) =>!!value || 'Dữ liệu bắt buộc']"
        >
          <v-row>
            <v-col cols="6" v-for="item in typeShipper">
              <v-label class="m-pointer d-flex flex-column pa-2 m-box"
                       :class="selectedDeliver === item.value ? 'active' : ''">
                <v-icon :icon="item.icon" size="35"></v-icon>
                <h5 class="text-red-darken-3 m-text">{{ item.name }}</h5>
                <p class="text-body-2 m-text">{{ item.text }}</p>
                <v-radio :value="item.value"></v-radio>
              </v-label>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-card-item>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="red-darken-2" variant="flat" @click="createTracking">Xác nhận</v-btn>
        <v-btn @click="formTracking = !formTracking" variant="flat" color="blue-grey-darken-1">Thoát</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-dialog
      v-model="formSelected"
      max-width="450"
  >
    <v-card>
      <template #append>
        <v-btn density="compact" icon="mdi-close" color="red-darken-2" @click="formSelected = !formSelected"></v-btn>
      </template>
      <v-card-title class="text-center">
        <span class="text-h6 font-weight-bold">{{ sTrack ? "Thông tin vận chuyển" : "Thông tin giao dịch" }}</span>
      </v-card-title>
      <v-card-item class="ma-2" v-if="sTrack">
        <v-card-text class="d-flex text-body-1 font-weight-bold justify-space-between"><span class="text-grey-darken-2">Vận chuyển bởi :</span>
        </v-card-text>
        <v-autocomplete
            class="ma-4"
            v-if="!sTrack.deliver_info"
            v-model="formForUser"
            v-model:search="formSearchUser"
            :items="userQueryLists"
            item-title="full_name"
            item-value="email"
            label="Deliver"
            color="red-darken-2"
            variant="outlined"
            autocomplete="off"
            persistent-hint
            density="compact"
            return-object
            clearable
        >
          <template #append>
            <v-btn color="red" variant="flat" @click="clickUpdateInfo">Xác nhận</v-btn>
          </template>
        </v-autocomplete>
        <v-card v-else-if="sTrack.deliver ==='user'" elevation="2" class="ma-2 pa-2" color="blue-grey-lighten-4">
          <v-card-text class="d-flex text-body-1 font-weight-bold justify-space-between"><span class="text-grey-darken-2">Họ và tên:</span>
            {{JSON.parse(sTrack.deliver_info).full_name}}
          </v-card-text>
          <v-card-text class="d-flex text-body-1 font-weight-bold justify-space-between"><span class="text-grey-darken-2">Số điện thoại:</span>
            {{JSON.parse(sTrack.deliver_info).phone_number}}
          </v-card-text>
        </v-card>
        <v-card v-else elevation="2" class="ma-2 pa-2" color="blue-grey-lighten-4">
        <v-card-text class="d-flex text-body-1 font-weight-bold justify-space-between"><span class="text-grey-darken-2">Đối tác:</span>
          Giao hàng tiết kiệm
        </v-card-text>
      </v-card>
        <v-card-text class="d-flex text-body-1 font-weight-bold justify-space-between"><span class="text-grey-darken-2">Tracking code :</span>{{
            sTrack.tracking_code
          }}
        </v-card-text>
        <v-card-text class="d-flex text-body-1 font-weight-bold justify-space-between"><span class="text-grey-darken-2">Trạng thái :</span>
          {{ customStatusTracking(sTrack.status) }}
        </v-card-text>
        <v-card-text class="d-flex text-body-1 font-weight-bold justify-space-between"><span class="text-grey-darken-2">Ngày tạo :</span>
          {{ formatDate(sTrack.created_at) }}
        </v-card-text>
        <v-card-text class="d-flex text-body-1 font-weight-bold justify-space-between"><span class="text-grey-darken-2">Cập nhật cuối :</span>
          {{ formatDate(sTrack.updated_at) }}
        </v-card-text>
        <v-card>
        </v-card>
      </v-card-item>
      <v-card-item class="ma-2 text-red-darken-2" v-else>
        <v-card-text class="d-flex text-body-1 font-weight-bold justify-space-between"><span class="text-grey-darken-2">Cổng thanh toán :</span>
          {{ sTrans.payment_method }}
        </v-card-text>
        <v-card-text class="d-flex text-body-1 font-weight-bold justify-space-between"><span class="text-grey-darken-2">Số tiền :</span>
          {{ formatPrice(sTrans.amount) }}
        </v-card-text>
        <v-card-text class="d-flex text-body-1 font-weight-bold justify-space-between"><span class="text-grey-darken-2">Trạng thái :</span>
          {{ sTrans.status }}
        </v-card-text>
        <v-card-text class="d-flex text-body-1 font-weight-bold justify-space-between"><span class="text-grey-darken-2">Thời gian :</span>
          {{ formatDate(sTrans.created_at) }}
        </v-card-text>
      </v-card-item>

    </v-card>
  </v-dialog>
</template>

<script setup>
import {useSeoMeta} from "@unhead/vue";
import {computed, onMounted, ref, watch, watchEffect} from "vue";
import axios from "../../axiosComfig";
import {siteData} from "@/stores/globals";
import {rule_coupon, rule_name_utf8, ruleTypeCoupon} from "@/validators";

const siteStore = siteData();
const formTracking = ref(false);
const formSelected = ref(false);
const orders = ref([]);
const searchQuery = ref("");
const selectedType = ref();
const selectDateStart = ref();
const selectDateEnd = ref();
const createTrackingFor = ref();
const selectedDeliver = ref();
const formForUser = ref();
const formSearchUser = ref("");
const userQueryLists = ref([]);
const options = ref({
  page: 1,
  itemsPerPage: 10,
});
const typeCoupon = [
  {
    name: "Chưa thanh toán",
    value: "waiting"
  }, {
    name: "Đã thanh toán",
    value: "done"
  }, {
    name: "Đang chuẩn bị hàng",
    value: "warehouse"
  }, {
    name: "Đã giao đơn vị vận chuyển",
    value: "shipping"
  }, {
    name: "Khách không nhận trả hàng",
    value: "refund"
  }, {
    name: "Đã giao thành công",
    value: "completed"
  },
];
const typeShipper = [
  {
    icon: "mdi-truck-delivery-outline",
    name: "Giao hàng tiết kiệm",
    text: "Đối tác giao hàng",
    value: "ghtk"
  },
  {
    icon: "mdi-moped-outline",
    name: "Shop giao hàng",
    text: "Deliver sẽ giao hàng",
    value: "user"
  }
];
const sTrack = ref();
const sTrans = ref();
// Computed
const totalUsers = computed(() => {
  return orders.value.length;
});
const totalPage = computed(() => {
  return Math.ceil(totalUsers.value / options.value.itemsPerPage) || 1;
});
const paginationMeta = computed(() => {
  return (options, total) => {
    const start = (options.page - 1) * options.itemsPerPage + 1;
    const end = Math.min(options.page * options.itemsPerPage, total);

    return `Đang hiển thị từ ${start} đến ${end} trên tổng ${total} dữ liệu.`;
  };
});
//Data
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
  if (item.transaction_id && item.tracking_id && item.trackings && item.trackings.status === "return") {
    return "refund";
  }
  if (item.transaction_id && item.tracking_id && item.trackings && item.trackings.status === "done") {
    return "completed";
  }
};
const customStatusTracking = (value) => {
  switch (value.toLowerCase()) {
    case "shipping":
      return "Đã giao đơn vị vận chuyển";
    case "return":
      return "Khách không nhận trả hàng";
    case "done":
      return "Đã giao thành công";
    default:
      return "Đang chuẩn bị hàng";
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
let debounceTimer = null;
watch(formSearchUser, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fetchUserList();
  }, 1000);
});
const fetchUserList = async () => {
  if (String(formSearchUser.value).length >= 3) {
    siteStore.isLoading = true;
    try {
      const res = await axios.post("/searchUsers", {
        query: formSearchUser.value
      });
      // console.log(res.data[0].roles.name);
      userQueryLists.value = res.data.filter(data => data.roles[0].name === "Deliver");
    } catch (e) {
      siteStore.errorSystem();
      console.log(e);
    } finally {
      siteStore.isLoading = false;
    }
  }
};
const headers = [
  {
    title: "#",
    key: "index",
    sortable: false,
  },
  {
    title: "ID Order",
    key: "code_order",
  },
  {
    title: "Khách hàng",
    key: "customer",
  },
  {
    title: "Tổng đơn",
    key: "total_order",
  },
  {
    title: "Giảm giá",
    key: "value_discount",
    sortable: false,
  },
  {
    title: "Lợi nhuận",
    key: "profit",
    align: "center",
    sortable: false,
  },
  {
    title: "Ngày tạo",
    key: "created_at",
    align: "center",
    sortable: false,
  },
  {
    title: "Chức năng",
    key: "actions",
    align: "end",
    sortable: false,
  },
];

// Function
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString();
  return `${day}/${month}/${year}`;
}

const clickTrans = async (v) => {
  sTrack.value = null;
  sTrans.value = null;
  formSelected.value = true;
  sTrans.value = orders.value[v].transactions;
};
const clickTrank = async (v) => {
  sTrack.value = null;
  sTrans.value = null;
  formForUser.value = null;
  formSelected.value = true;
  sTrack.value = orders.value[v].trackings;
  console.log(sTrack.value);
};

const updateDeliverInfo = async (id) => {
  try {
    siteStore.isLoading = true;
    let res = await axios.put(`/updateDeliverInfo/${id}`, {
      deliver_info: formForUser.value,
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};
const clickUpdateInfo = async () => {
  await updateDeliverInfo(sTrack.id);
  formSelected.value = false;
  await fetchListOrder(searchQuery.value, selectDateStart.value, selectDateEnd.value, selectedType.value);
};
const createTracking = async () => {
  try {
    siteStore.hasLoading();
    let res = await axios.post("createTracking", {
      order_id: createTrackingFor.value,
      deliver: selectedDeliver.value,
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    formTracking.value = false;
    await fetchListOrder(searchQuery.value, selectDateStart.value, selectDateEnd.value, selectedType.value);
    siteStore.doneLoading();
  }
};

async function fetchListOrder(q, ds, de, t) {
  siteStore.hasLoading();
  try {
    const queryString = q ? q.toLowerCase() : "";
    const queryDateStart = ds || "";
    const queryDateEnd = de || "";
    const queryType = t ? t.toLowerCase() : "";

    const res = await axios.get("/fetchListOrder");
    orders.value = res.data.filter(data => (
        (data.order_code.toLowerCase().includes(queryString) || data.email_buyer.includes(queryString) || data.phone_number_tracking.toLowerCase().includes(queryString)) &&
        (!queryDateStart || data.created_at >= queryDateStart) &&
        (!queryDateEnd || data.created_at <= queryDateEnd) &&
        (!queryType || statusOder(data).toLowerCase() === queryType)
    )).reverse();
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.doneLoading();
  }
}

watchEffect(() => {
  fetchListOrder(searchQuery.value, selectDateStart.value, selectDateEnd.value, selectedType.value);
});

onMounted(() => {
  fetchListOrder();
});

//SEO

siteStore.titleNow = "User Management";
useSeoMeta({
  title: siteStore.titleNow,
});
</script>

<style scoped>
.app-user-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}
</style>