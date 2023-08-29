<template>
  <div class="my-5">
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-form @submit.prevent="onSubmit" ref="dataForm">
        <h2 class="text-center mb-4">Đặt lại Mật khẩu</h2>
        Email:{{email}}
        <v-text-field class="my-3" v-model="password" :rules="[rule_password]"
                      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'" density="compact"
                      label="Password" prepend-inner-icon="mdi-lock-outline" variant="outlined"
                      @click:append-inner="visible = !visible" autocomplete="new-password"></v-text-field>
        <v-text-field class="my-3" v-model="password_cf" :rules="[rule_password, !rule_repass]"
                      :error-messages="rule_repass" :append-inner-icon="visible_cf ? 'mdi-eye-off' : 'mdi-eye'"
                      :type="visible_cf ? 'text' : 'password'" density="compact" label="Re-Password"
                      prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible_cf = !visible_cf"
                      autocomplete="new-password"></v-text-field>
        <div class="v-messages__message text-red-accent-4">{{ errors_captcha }}</div>
        <v-card elevation="0" class="d-flex justify-center ma-3">
          <Checkbox v-model="v2_captcha" />

        </v-card>
        <v-btn block="" class="mb-8" color="red-accent-4" size="large" type="submit">
          Đặt lại mật khẩu
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import axios from "../axiosComfig";
import { userData } from "@/stores/userData";
import { Checkbox } from 'vue-recaptcha';
import { rule_password } from '@/validators'
import {useRoute, useRouter} from "vue-router";


const route = useRoute()
const router = useRouter()



const dataForm = ref();
const email = ref('');
const password = ref('');
const password_cf = ref('');
const token = ref();
const visible = ref(false);
const visible_cf = ref(false);
const v2_captcha = ref(null);
const errors_captcha = ref(null);
const isSuccess =ref();
const Success = ref("");
const errors = ref();
const hasError = ref(false);

email.value = route.query.email;
token.value = route.query.token;

const rule_repass = computed(() => password.value === password_cf.value ? "" : "Re-Password và Password không trùng khớp")

watch(v2_captcha, () => errors_captcha.value = v2_captcha.value ? null : "Mã xác thực đã hết hạn.")
const resetPassword = async () => {
  try {
    let res = await axios.post('reset-password', {
      email: email.value,
      token: token.value,
      password: password.value
    });
    if(res.data.success){
      isSuccess.value = res.data.success;
      Success.value = res.data.message;
      setTimeout(() => {
        router.replace('login')
      }, 1000);
    }
    if(!res.data.success){
      hasError.value = !res.data.success;
      errors.value = res.data.message;
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
        resetPassword()
    })
    v2_captcha.value = null;
  }
}
</script>

<style scoped></style>