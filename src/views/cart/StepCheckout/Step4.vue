<script setup>

import {onMounted, ref} from "vue";
import {siteData} from "@/stores/globals";
import axios from "@/axiosComfig";

const siteStore = siteData();
const orderId = ref("");
const orderData = ref({});
const fetchOrderInfo = async (v) => {
  siteStore.hasLoading();
  try {
    const res = await axios.get(`/orderByCode/${v}`);
    siteStore.hasRes(res);
    orderData.value = res.data.data;
    console.log(orderData.value)
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    //   siteStore.cartInfo.orderCompleted = "";
    siteStore.doneLoading();
  }
};
const createStripePayment = async (token) => {
  siteStore.hasLoading();
  try {
    const res = await axios.post("createStripePayment",{
      token: token,
      order_code: orderId.value
    });
    if(String(res.data) === "succeeded"){
      siteStore.hasRes({ data: {status:"ok",message:"Thanh toán thành công"} });
    }else {
      siteStore.hasRes({ data: {status:"error",message:"Thanh toán thất bại"} });
    }
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    //   siteStore.cartInfo.orderCompleted = "";
    siteStore.doneLoading();
  }
}
const payToken = ref();
const openStripeCheckout = () => {
  const handler = StripeCheckout.configure({
    key: "pk_test_51Nmt1tGFC73034iQjw7RDGTGgNryVT4bA5CJxyhXZ1qCki8aTHBPViUprp2nb0ry55982981pC8MzGjDmYMCD8UO00p3j8i23Q",
    locale: "vi_VN",
    token: (token) => {
      // console.log(token)
      createStripePayment(token.id);
    }
  });

  handler.open({
    name: siteStore.siteSetings.site_name,
    description: "Thanh toán đơn hàng "+ orderId.value,
    currency: "VND",
    amount: (orderData.value.total_order*100)/100,
  });
};

onMounted(async () => {
  orderId.value = siteStore.cartInfo.orderCompleted;
  await fetchOrderInfo(orderId.value);

  const stripeScript = document.createElement("script");
  stripeScript.src = "https://checkout.stripe.com/checkout.js";
  stripeScript.async = true;
  document.head.appendChild(stripeScript);
});
</script>

<template>
  Thanh toán đơn hàng : {{orderId}}

  <button @click="openStripeCheckout">Thanh toán</button>
</template>

<style scoped>

</style>