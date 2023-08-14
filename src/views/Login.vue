<template>
  <div class="my-5">
    <VSnackbar v-model="isLogin" transition="scroll-y-reverse-transition" location="top end" color="green-darken-1"
      :timeout="2000">
      Đăng nhập thành công!
    </VSnackbar>
    <v-overlay v-model="hasError" :persistent="true">
      <VSnackbar v-model="hasError" transition="scroll-y-reverse-transition" location="bottom end" color="red-darken-1"
        :timeout="1500">
        <div class="ma-5 text-h6 text-center">{{ errors }}</div>
      </VSnackbar>
    </v-overlay>
    <VSnackbar v-model="requestLogin" transition="scroll-y-reverse-transition" location="bottom end"
      color="deep-orange-lighten-1">
      <div class="text-body-1 text-center">Đăng nhập để sử dụng tiếp chức năng</div>
    </VSnackbar>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-card-title class="text-center text-h4 font-weight-bold py-3">
        <!--        {{ router.currentRoute.value }}-->
        Đăng nhập
      </v-card-title>
      <v-form ref="dataForm" @submit.prevent="onSubmit">

        <v-text-field v-model="email" density="compact" label="Email" :rules="[() => !!email || 'Vui lòng nhập email']"
          prepend-inner-icon="mdi-email-outline" variant="outlined" autofocus="" autocomplete="on"></v-text-field>

        <div class="text-medium-emphasis d-flex align-center flex-row-reverse align-content-end">

          <a class="text-caption text-decoration-none text-red-accent-4" href="#" tabindex="-1">
            Quên Password?</a>
        </div>

        <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'" :rules="[() => !!password || 'Vui lòng nhập password']" autocomplete="off"
          density="compact" label="Password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
          @click:append-inner="visible = !visible"></v-text-field>
        <div class="v-messages__message text-red-accent-4">{{ errors_captcha }}</div>
        <v-card elevation="0" class="d-flex justify-center ma-3">
          <Checkbox v-model="v2_captcha" />

        </v-card>

        <v-btn block="" class="mb-8" color="red-accent-4" size="large" type="submit">
          Đăng Nhập
        </v-btn>
      </v-form>
      <div class="d-flex align-items-center">
        <hr class="w-25">
        <span class="d-flex align-center px-2">Hoặc đăng nhập bằng</span>
        <hr class="w-25">
      </div>
      <v-card-text class="text-center">Chưa có tài khoản?
        <router-link to="register" class="text-blue text-decoration-none m-pointer">
          Đăng ký ngay
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { userData } from "@/stores/userData";
import axios from "axios";
import { Checkbox } from 'vue-recaptcha';
import { useRoute, useRouter } from "vue-router";


const route = useRoute()
const router = useRouter()
const userStore = userData();
const isLogin = ref(false)
const dataForm = ref();
const email = ref("");
const password = ref("");
const errors = ref();
const visible = ref(false);
const v2_captcha = ref(null);
const errors_captcha = ref(null);
const hasError = ref(false);
const requestLogin = ref(!!route.query.to);

watch(v2_captcha, () => errors_captcha.value = v2_captcha.value ? null : "Mã xác thực đã hết hạn.")



const login = async () => {
  try {
    let res = await axios.post('login', {
      email: email.value,
      password: password.value,
    });
    if (res.data.token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
      userStore.setUserDetails(res.data);
      localStorage.setItem('accessToken', res.data.token)
      isLogin.value = true
      setTimeout(() => {
        router.replace(route.query.to ? String(route.query.to) : '/')
      }, 1500);
    } else {
      hasError.value = true;
      errors.value = 'Sai thông tin tài khoản';
    }
  } catch (e) {
    errors.value = 'Có lỗi xảy ra ';
    hasError.value = true;
  }
};
const onSubmit = () => {
  if (!v2_captcha.value) {
    return errors_captcha.value = "Vui lòng xác nhận mã xác thực";
  } else {
    dataForm.value?.validate().then(({ valid: isValid }) => {
      if (isValid)
        login()
    })
  }
}
</script>

<style scoped></style>