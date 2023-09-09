<script setup>
import {onMounted, ref} from "vue";
import axios from "@/axiosComfig";
import {siteData} from "@/stores/globals";

const siteStore = siteData();

const formMSHostSMTP = ref();
const formMSEncryptSMTP = ref("SSL");
const formMSPortSMTP = ref();
const formMSUserSMTP = ref();
const formMSPasswordSMTP = ref();

const fetchMSetting = async () => {
  siteStore.hasLoading()
  try {
    const res = await axios.get("fetchMSetting");
    formMSHostSMTP.value = res.data.hostSMTP;
    formMSEncryptSMTP.value = res.data.encryptSMTP||"SSL";
    formMSPortSMTP.value = res.data.portSMTP;
    formMSUserSMTP.value = res.data.userSMTP;
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.doneLoading()
  }
};
const updateMSetting = async () => {
  siteStore.hasLoading();
  try {
    const res = await axios.put("updateSetting", {
      host_smtp: formMSHostSMTP.value,
      port_smtp: formMSPortSMTP.value,
      user_smtp: formMSUserSMTP.value,
      password_smtp: formMSPasswordSMTP.value,
      encrypt_smtp: formMSEncryptSMTP.value,
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    await fetchMSetting();
    formMSPasswordSMTP.value = "";
    siteStore.doneLoading()
  }
};
onMounted(() => {
  fetchMSetting();
});
</script>

<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="formMSHostSMTP"
                        label="Host SMTP"
                        variant="outlined"
                        density="compact"
                        autocomplete="off"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="formMSPortSMTP"
                        label="Port SMTP"
                        variant="outlined"
                        density="compact"
                        autocomplete="off"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
              v-model="formMSEncryptSMTP"
              label="Encrypt"
              :items="['SSL', 'TLS']"
              density="compact"
              variant="outlined"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="formMSUserSMTP"
                        label="User SMTP"
                        variant="outlined"
                        density="compact"
                        autocomplete="off"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="formMSPasswordSMTP"
                        label="Password SMTP"
                        variant="outlined"
                        density="compact"
                        autocomplete="new-password"
                        type="password"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-btn color="red-darken-2" @click="updateMSetting">Lưu</v-btn>
    </v-container>
  </v-form>
</template>

<style scoped>

</style>