<template>
  <div style="min-height: inherit;
    display: grid;
    place-content: center;">
    <v-card class="mx-auto pa-12 pb-8" elevation="8" rounded="lg" width="450">
      <v-form @submit.prevent="onSubmit" ref="dataForm">
        <h2 class="text-center mb-4">Đăng ký</h2>
        <v-text-field class="my-3" v-model="full_name" density="compact" label="Họ và tên" :rules="[rule_fullname]"
                      prepend-inner-icon="mdi-account-outline" variant="outlined"></v-text-field>
        <v-text-field class="my-3" v-model="email" :rules="[rule_email]" density="compact" label="Email"
                      prepend-inner-icon="mdi-email-outline" variant="outlined" autocomplete="username"></v-text-field>
        <v-text-field class="my-3" v-model="phone_number" :rules="[rule_phone]" density="compact" label="Số điện thoại"
                      prepend-inner-icon="mdi-phone-dial-outline" variant="outlined"></v-text-field>

        <v-text-field class="my-3" v-model="password" :rules="[rule_password]"
                      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
                      density="compact"
                      label="Password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                      @click:append-inner="visible = !visible" autocomplete="new-password"></v-text-field>
        <v-text-field class="my-3" v-model="password_cf" :rules="[rule_password, rule_repass]"
                      :error-messages="rule_repass" :append-inner-icon="visible_cf ? 'mdi-eye-off' : 'mdi-eye'"
                      :type="visible_cf ? 'text' : 'password'" density="compact" label="Re-Password"
                      prepend-inner-icon="mdi-lock-outline" variant="outlined"
                      @click:append-inner="visible_cf = !visible_cf"
                      autocomplete="new-password"></v-text-field>
        <div class="v-messages__message text-red-accent-4">{{ errors_captcha }}</div>
        <v-card elevation="0" class="d-flex justify-center ma-3">
          <Checkbox v-model="v2_captcha"/>
        </v-card>
        <v-btn block="" class="mb-8" color="red-accent-4" size="large" type="submit">
          Đăng Ký
        </v-btn>
      </v-form>
      <!--      <div class="d-flex align-items-center">-->
      <!--        <hr class="w-25">-->
      <!--        <span class="d-flex align-center px-2">Hoặc đăng nhập bằng</span>-->
      <!--        <hr class="w-25">-->
      <!--      </div>-->
      <v-card-text class="text-center">Đã có tài khoản?
        <a class="text-blue text-decoration-none m-pointer" @click="$router.push('/login')">
          Đăng nhập ngay
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import axios from "../axiosComfig";
import {Checkbox} from "vue-recaptcha";
import {rule_email, rule_fullname, rule_password, rule_phone} from "@/validators";
import {useRoute, useRouter} from "vue-router";
import {siteData} from "@/stores/globals";
import {useRecaptchaProvider} from "vue-recaptcha";
useRecaptchaProvider();

const route = useRoute();
const router = useRouter();

const siteStore = siteData();


const dataForm = ref();
const full_name = ref("");
const phone_number = ref("");
const email = ref("");
const password = ref("");
const password_cf = ref("");
const visible = ref(false);
const visible_cf = ref(false);
const v2_captcha = ref(null);
const errors_captcha = ref(null);
const errors = ref();

const rule_repass = computed(() => password.value === password_cf.value ? true : "Re-Password và Password không trùng khớp");

watch(v2_captcha, () => errors_captcha.value = v2_captcha.value ? null : "Mã xác thực đã hết hạn.");
const register = async () => {
  siteStore.hasLoading();
  try {
    let res = await axios.post("register", {
      full_name: full_name.value,
      phone_number: phone_number.value,
      email: email.value,
      password: password.value
    });
    if (res.data.token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
      localStorage.setItem("accessToken", res.data.token);
      await siteStore.setUserInfo(res.data.user_id);
      setTimeout(() => {
        router.replace(route.query.to ? String(route.query.from) : "/");
      }, 200);
    }
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.doneLoading();
  }
};

const onSubmit = () => {
  if (!v2_captcha.value) {
    return errors_captcha.value = "Vui lòng xác nhận mã xác thực";
  } else {
    dataForm.value?.validate().then(({valid: isValid}) => {
      if (isValid) {
        register();
      }
    });
    v2_captcha.value = false;
  }
};
</script>

<style scoped></style>