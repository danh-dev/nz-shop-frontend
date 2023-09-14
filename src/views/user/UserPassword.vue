<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { siteData } from "@/stores/globals";
import { rule_password } from "@/validators";
const siteStore = siteData();

const password = ref(
    {
      old_password: "",
      new_password: "",
      re_password: "",
    }
);

const rule_repass = computed(() => password.value.new_password === password.value.re_password ? true : "Re-Password và Password không trùng khớp");

const submit = async () => {
  siteStore.hasLoading();
  try {
    const res = await axios.put(`changePassword/${siteStore.userInfo.user_id}`, password.value);
    siteStore.hasRes(res);
  }
  catch (e) {
    console.log(e);
    siteStore.errorSystem();
  }
  finally {
    siteStore.doneLoading();
  }
};
</script>

<template>
  <v-sheet
      width="100%"
      class="mx-auto"
  >
    <h2 class="text-center text-uppercase mb-4">Tạo mật khẩu mới</h2>
    <v-form @submit.prevent="submit">
      <v-container>
        <v-row>
          <v-col
              cols="12"
              class="py-1"
          >
            <div class="mb-3 font-weight-bold ">Nhập mật khẩu hiện tại:</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col
              cols="12"
              class="py-1"
          >
            <v-text-field
                v-model="password.old_password"
                variant="outlined"
                density="compact"
                :counter="50"
                type="password"
                label="Mật khẩu hiện tại của bạn"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
              cols="12"
              class="py-1"
          >
            <div class="mb-3 font-weight-bold ">Tạo mật khẩu mới:</div>
          </v-col>
        </v-row>
        <v-row>
          <v-col
              cols="12"
              class="py-1"
          >
            <v-text-field
                v-model="password.new_password"
                variant="outlined"
                density="compact"
                :counter="50"
                label="Mật khẩu mới của bạn"
                hint="Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt"
                type="password"
                autocomplete="off"
            >
            </v-text-field>

          </v-col>
        </v-row>
        <v-row>
          <v-col
              cols="12"
              class="py-1"
          >
            <v-text-field
                v-model="password.re_password"
                variant="outlined"
                density="compact"
                :counter="50"
                label="Xác nhận mật khẩu"
                type="password"
                :rules="[rule_password, rule_repass]"
                :error-messages="rule_repass"
                autocomplete="off"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col
              cols="12"
              class="py-1"
          >
            <v-btn
                type="submit"
                color="red-accent-4"
                block
            >Xác nhận
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-sheet>
</template>

<style></style>