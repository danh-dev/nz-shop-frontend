<template>
  <div style="min-height: inherit;
    display: grid;
    place-content: center;">
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-card-title class="text-center text-h4 font-weight-bold py-3">
        Đăng nhập
      </v-card-title>
      <v-form ref="dataForm" @submit.prevent="onSubmit">
        <v-text-field v-model="email" density="compact" label="Email" :rules="[() => !!email || 'Vui lòng nhập email']"
                      prepend-inner-icon="mdi-email-outline" variant="outlined" autofocus=""
                      autocomplete="on">
        </v-text-field>

        <div class="text-medium-emphasis d-flex align-center flex-row-reverse align-content-end">

          <router-link to="/forgot-password" class="text-caption text-decoration-none text-red-accent-4" href="#"
                       tabindex="-1">
            Quên mật khẩu?
          </router-link>
        </div>

        <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                      :type="visible ? 'text' : 'password'" :rules="[() => !!password || 'Vui lòng nhập mật khẩu']"
                      autocomplete="off"
                      density="compact" label="Mật khẩu" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                      @click:append-inner="visible = !visible"></v-text-field>
        <div class="v-messages__message text-red-accent-4">{{ errors_captcha }}</div>
        <v-card elevation="0" class="d-flex justify-center ma-3">
          <Checkbox v-model="v2_captcha"/>

        </v-card>

        <v-btn block="" class="mb-8" color="red-accent-4" size="large" type="submit">
          Đăng Nhập
        </v-btn>
      </v-form>
<!--      <div class="d-flex align-items-center">-->
<!--        <hr class="w-25">-->
<!--        <span class="d-flex align-center px-2">Hoặc đăng nhập bằng</span>-->
<!--        <hr class="w-25">-->
<!--      </div>-->
      <v-card-text class="text-center">Chưa có tài khoản?
        <router-link to="/register" class="text-blue text-decoration-none m-pointer">
          Đăng ký ngay
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import axios from "../axiosComfig";
import {Checkbox} from "vue-recaptcha";
import {useRoute, useRouter} from "vue-router";
import {siteData} from "@/stores/globals";
import {useRecaptchaProvider} from "vue-recaptcha";
useRecaptchaProvider();

const siteStore = siteData();
const route = useRoute();
const router = useRouter();
const dataForm = ref();
const email = ref("");
const password = ref("");
const errors = ref();
const visible = ref(false);
const v2_captcha = ref(null);
const errors_captcha = ref(null);

watch(v2_captcha, () => errors_captcha.value = v2_captcha.value ? null : "Mã xác thực đã hết hạn.");


const login = async () => {
  siteStore.hasLoading()
  try {
    let res = await axios.post("login", {
      email: email.value,
      password: password.value,
    });
    siteStore.hasRes(res);
    if (res.data.token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
      await siteStore.setUserInfo(res.data.user_id);
      localStorage.setItem("accessToken", res.data.token);
      siteStore.isLogin =true;
      siteStore.useGuest = false;
      setTimeout(() => {
        router.replace(route.query.to ? String(route.query.to) : "/");
      }, 100);
    }
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  }finally {
    siteStore.doneLoading()
  }
};
const onSubmit = () => {
  if (!v2_captcha.value) {
    return errors_captcha.value = "Vui lòng xác nhận mã xác thực";
  } else {
    dataForm.value?.validate().then(({valid: isValid}) => {
      if (isValid) {
        login();
      }
    });
    v2_captcha.value = null;
  }
};
</script>
<style scoped></style>