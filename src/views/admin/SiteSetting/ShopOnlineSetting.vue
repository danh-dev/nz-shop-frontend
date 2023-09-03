<script setup>
import {onMounted, ref} from "vue";
import axios from "@/axiosComfig";
import {siteData} from "@/stores/globals";

const siteStore = siteData();

const formSSAddress = ref();
const formSSPhone = ref();
const formSSEmail = ref();
const formSSTimeWork = ref();
const formSSCSKH = ref();
const formSSKH = ref();
const formSSBH = ref();

const fetchSSetting = async () => {
  siteStore.hasLoading();
  try {
    const res = await axios.get("fetchSSetting");
    formSSAddress.value = res.data.address;
    formSSPhone.value = res.data.phone;
    formSSEmail.value = res.data.email;
    formSSTimeWork.value = res.data.timeWork;
    formSSCSKH.value = res.data.cskh;
    formSSKH.value = res.data.cskhkn;
    formSSBH.value = res.data.cskhbh;
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.doneLoading();
  }
};
const updateSSetting = async () => {
  siteStore.hasLoading();
  try {
    const res = await axios.put("updateSetting", {
      shop_address: formSSAddress.value,
      shop_phone: formSSPhone.value,
      shop_email: formSSEmail.value,
      shop_timeWork: formSSTimeWork.value,
      shop_cskh: formSSCSKH.value,
      shop_cskhkn: formSSKH.value,
      shop_cskhbh: formSSBH.value,
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    await fetchSSetting();
    formMSPasswordSMTP.value = "";
    siteStore.doneLoading();
  }
};
onMounted(() => {
  fetchSSetting();
});
</script>

<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="formSSAddress"
                        label="Địa chỉ cửa hàng"
                        variant="outlined"
                        density="compact"
                        autocomplete="off"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="formSSPhone"
                        label="Số điện thoại"
                        variant="outlined"
                        density="compact"
                        autocomplete="off"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="formSSEmail"
                        label="Email support"
                        variant="outlined"
                        density="compact"
                        autocomplete="off"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="formSSTimeWork"
                        label="Thời gian hoàn động"
                        variant="outlined"
                        density="compact"
                        autocomplete="off"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="formSSCSKH"
                        label="Hotline CSKH"
                        variant="outlined"
                        density="compact"
                        autocomplete="off"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="formSSKH"
                        label="Hotline khiếu nại"
                        variant="outlined"
                        density="compact"
                        autocomplete="off"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="formSSBH"
                        label="Hotline bảo hành"
                        variant="outlined"
                        density="compact"
                        autocomplete="off"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-btn color="red-darken-2" @click="updateSSetting">Lưu</v-btn>
    </v-container>
  </v-form>
</template>

<style scoped>

</style>