<template>
  <div class="my-5">
    <v-card class="mx-auto pa-10 d-flex flex-column justify-center" elevation="8" max-width="448"  min-height="500" rounded="lg">
      <v-card-title class="text-center text-h4 font-weight-bold py-3">
        Quên mật khẩu
      </v-card-title>
      <v-form ref="dataForm" @submit.prevent="onSubmit">

        <v-text-field class="my-3" v-model="email" :rules="[rule_email]" density="compact" label="Email"
                      prepend-inner-icon="mdi-email-outline" variant="outlined" autocomplete="username"></v-text-field>

        <div class="v-messages__message text-red-accent-4">{{ errors_captcha }}</div>
        <v-card elevation="0" class="d-flex justify-center ma-3">
          <Checkbox v-model="v2_captcha" />
        </v-card>

        <v-btn block="" class="mb-8 my-5" color="red-accent-4" size="large" type="submit">
          Yêu cầu khôi phục
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "../axiosComfig";
import { Checkbox } from 'vue-recaptcha';
import {rule_email} from "@/validators";
import {siteData} from "@/stores/globals";
import {useRecaptchaProvider} from "vue-recaptcha";
useRecaptchaProvider();

const siteStore = siteData();

const dataForm = ref();
const email = ref("");
const v2_captcha = ref(null);
const errors_captcha = ref(null);

watch(v2_captcha, () => errors_captcha.value = v2_captcha.value ? null : "Mã xác thực đã hết hạn.")

const forgot = async () => {
  siteStore.hasLoading()
  try {
    const res = await axios.post('forgot-password', {
      email: email.value,
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.doneLoading();
  }
}
const onSubmit = () => {
  if (!v2_captcha.value) {
    return errors_captcha.value = "Vui lòng xác nhận mã xác thực";
  } else {
    dataForm.value?.validate().then(({ valid: isValid }) => {
      if (isValid)
        forgot()
    })
    v2_captcha.value = false;
  }
}
</script>

<style scoped></style>