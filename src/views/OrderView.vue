<script setup>
import {ref, onMounted, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import axios from "@/axiosComfig";
import {siteData} from "@/stores/globals";

const siteStore = siteData();

const queryPay = ref({});
const route = useRoute();
const router = useRouter();
const order = ref({});
const keyCheck = ref();
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString();
  return `${day}/${month}/${year}`;
}

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
const listItems = ref();
watch(() => order.value, () => {
  listItems.value = JSON.parse(order.value.items);
});

const priceShipping = ref();
const shipInfo = ref({});
const openStripeCheckout = () => {
  const handler = StripeCheckout.configure({
    key: "pk_test_51Nmt1tGFC73034iQjw7RDGTGgNryVT4bA5CJxyhXZ1qCki8aTHBPViUprp2nb0ry55982981pC8MzGjDmYMCD8UO00p3j8i23Q",
    locale: "vi_VN",
    token: (token) => {
      createStripePayment(token.id);
    }
  });

  handler.open({
    name: siteStore.siteSetings.site_name,
    description: "Thanh toán đơn hàng " + order.value.order_code,
    currency: "VND",
    amount: (order.value.total_order * 100) / 100,
  });
};

const createStripePayment = async (token) => {
  siteStore.hasLoading();
  try {
    const res = await axios.post("createStripePayment", {
      token: token,
      order_code: order.value.order_code
    });
    if (String(res.data) === "succeeded") {
      siteStore.hasRes({data: {status: "ok", message: "Thanh toán thành công"}});
      await fetchOrder(keyCheck.value);
    } else {
      siteStore.hasRes({data: {status: "error", message: "Thanh toán thất bại"}});
    }
    console.log(res.data);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.doneLoading();
  }
};

const runVNPay = async (request) => {
  siteStore.hasLoading();
  try {
    const res = await axios.post("runVNPay", request);
    siteStore.hasRes(res);
    if (res.data.status === "ok") {
      await fetchOrder(keyCheck.value);
    }
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.doneLoading();
  }
};

watch(() => queryPay.value, () => {
  if (queryPay.value.vnp_TransactionStatus && queryPay.value.vnp_TransactionStatus === "00") {
    runVNPay(queryPay.value);
  }
  if (queryPay.value.vnp_TransactionStatus && queryPay.value.vnp_TransactionStatus !== "00") {
    siteStore.hasRes({data: {status: "error", message: "Thanh toán thất bại"}});
  }
});
const clickVNPay = () => {
  window.location.href = linkVNPay.value;
};
const linkVNPay = ref("");
const getLink = async () => {
  try {
    const res = await axios.post("createVNPayLink", {
      "order_code": order.value.order_code,
      "url_return": window.location.href,
    });
    linkVNPay.value = res.data;
  } catch (error) {
    console.error(error);
  }
};
const fetchOrder = async (v) => {
  siteStore.hasLoading();
  try {
    const res = await axios.get(`/orderByCode/${route.params.code}?key=${v}`);
    siteStore.hasRes(res);
    if (res.data.status) {
      await router.push("/");
    } else {
      order.value = res.data.data;
      priceShipping.value = JSON.parse(res.data.data.delivery).value;
      shipInfo.value = JSON.parse(res.data.data.address_shipping);
      await getLink();
    }
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
    await router.push("/");
  } finally {
    siteStore.doneLoading();
  }
};
onMounted(async () => {
  queryPay.value = route.query;
  if (route.query.key) {
    keyCheck.value = route.query.key;
    await fetchOrder(route.query.key);
  } else {
    await fetchOrder();
  }
  await router.replace({query: null});
  // Xử lý stripe
  const stripeScript = document.createElement("script");
  stripeScript.src = "https://checkout.stripe.com/checkout.js";
  stripeScript.async = true;
  document.head.appendChild(stripeScript);
});

const url = import.meta.env.VITE_PUBLIC_URL;
</script>

<template>
  <v-sheet position="relative" width="100%" class="d-flex flex-column">
    <h1 class="text-center">Chi tiết đơn hàng</h1>
    <div class="d-flex align-center">
      <div>Mã hơn hàng: <span class="text-body-1 font-weight-bold">{{ order.order_code }}</span></div>
      <v-chip class="ms-auto" :color="customStatusOrder(statusOder(order)).color" size="small">
        {{ customStatusOrder(statusOder(order)).status }}
      </v-chip>
    </div>
    <div>{{ formatDate(order.created_at) }}</div>

    <v-card
        class="mt-4 d-flex px-3 py-5"
        variant="elevated"
        height="150px"
        v-for="(product , index) in listItems"
        :key="index"
    >
      <v-img
          :src="url+product.info.image"
          width="15%"
      />
      <v-sheet width="85%">
        <v-sheet class=" mb-3">{{ product.info.name }}
        </v-sheet>

        <v-sheet class="d-flex justify-end mb-3">Số lượng :
          <v-sheet class="text-red"> {{
              product.quantity
            }}
          </v-sheet>
        </v-sheet>


        <v-sheet class="d-flex justify-space-between">
          <v-sheet class="d-flex">
            <v-sheet class="mr-3 text-red">{{ formatPrice(product.info.discount_price || product.info.sell_price) }}
            </v-sheet>
            <v-sheet v-if="product.info.discount_price" class="text-decoration-line-through">
              {{ formatPrice(product.info.sell_price) }}
            </v-sheet>
          </v-sheet>
          <v-btn
              v-if="statusOder(order) === 'completed'"
              class="text-body-2 jutify-end"
              variant="outlined"
              color="red-accent-4"
          >Đánh giá
          </v-btn>
        </v-sheet>

      </v-sheet>
    </v-card>
    <v-sheet class="mt-4">
      <v-card
          class="px-3 py-5"
          width="100%"
      >
        <v-sheet>
          <v-sheet class="d-flex">
            <v-icon
                class="mr-3"
                color="red-accent-4"
            >mdi-credit-card-outline
            </v-icon>
            <v-sheet class="text-body-1 font-weight-bold mb-4">Thông tin thanh toán</v-sheet>
          </v-sheet>
          <v-sheet class="d-flex  justify-space-between mb-2">
            <div>Tổng tiền sản phẩm:</div>
            <div>{{ formatPrice(order.total_value) }}</div>
          </v-sheet>
          <v-sheet v-if="order.value_discount != 0" class="d-flex  justify-space-between mb-2">
            <div>Giảm giá:</div>
            <div>{{ formatPrice(order.value_discount) }}</div>
          </v-sheet>
          <v-sheet class="d-flex mb-2 justify-space-between">
            <div>Phí vận chuyển:</div>
            <div>{{ formatPrice(priceShipping) }}</div>
          </v-sheet>
          <v-divider
              class="border-opacity-50 mb-2"
              color="red"
          ></v-divider>
          <v-sheet class="d-flex mb-2 justify-space-between">
            <div>Số tiền thanh toán:</div>
            <div class="font-weight-bold">{{ formatPrice(order.total_order) }}</div>
          </v-sheet>
        </v-sheet>
        <div v-if="statusOder(order) === 'waiting'">
          <v-card-title class="ps-0"> Thanh toán đơn hàng:</v-card-title>
          <v-card-actions>
            <v-btn prepend-icon="mdi-credit-card-outline" color="deep-purple-darken-1" variant="flat"
                   @click="openStripeCheckout">Thanh Toán Stripe
            </v-btn>
            <v-btn prepend-icon="mdi-credit-card-outline" color="blue-darken-2" variant="flat" @click="clickVNPay">Thanh
              Toán VNPay
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-sheet>


    <v-sheet class="mt-4">
      <v-card
          class="px-3 py-5"
          width="100%"
      >
        <v-sheet class="d-flex ">
          <div class="text-body-1 font-weight-bold mb-4">
            Thông tin người nhận
          </div>
        </v-sheet>
        <v-sheet class="d-flex">
          <v-icon class="mr-3">mdi-account-outline</v-icon>
          <v-sheet class="mb-4">{{ shipInfo.name }}</v-sheet>
        </v-sheet>
        <v-sheet class="d-flex">
          <v-icon class="mr-3">mdi-phone-outline</v-icon>
          <v-sheet class="mb-4">{{ shipInfo.phone_number }}</v-sheet>
        </v-sheet>
        <v-sheet class="d-flex">
          <v-icon class="mr-3">mdi-map-marker-outline</v-icon>
          <v-sheet class="mb-4">{{ shipInfo.address }} - {{ shipInfo.ward }} - {{ shipInfo.district }} -
            {{ shipInfo.city }}
          </v-sheet>
        </v-sheet>
      </v-card>
    </v-sheet>


    <v-sheet class="mt-4">
      <v-card
          class="px-3 py-5"
          width="100%"
      >
        <v-sheet class="d-flex ">
          <div class="text-body-1 font-weight-bold mb-4">
            Thông tin hỗ trợ
          </div>
        </v-sheet>
        <v-sheet class="d-flex">
          <v-icon class="mr-3">mdi-phone-outline</v-icon>
          <v-sheet class="text-grey-lighten-1">Số điện thoại cửa hàng:</v-sheet>
        </v-sheet>
        <v-sheet class="text-red-accent-4 ml-9 mt-1 mb-3">{{ siteStore.siteSetings.shop_cskh }}</v-sheet>
        <v-sheet class="d-flex">
          <v-icon class="mr-3">mdi-map-marker-outline</v-icon>
          <v-sheet class="text-grey-lighten-1">Địa chỉ của hàng:</v-sheet>

        </v-sheet>
        <v-sheet class=" ml-9 mt-1 mb-3">{{ siteStore.siteSetings.shop_address }}</v-sheet>
      </v-card>
    </v-sheet>


  </v-sheet>
</template>

<style></style>