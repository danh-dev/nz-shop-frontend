<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { siteData } from "@/stores/globals";
const siteStore = siteData();

const router = useRouter();
const props = defineProps({
  user: Object,
});

const newUser = ref(
    {
      full_name: siteStore.userInfo.full_name,
      email: siteStore.userInfo.email,
      phone_number: siteStore.userInfo.phone_number,
      created_at: siteStore.userInfo.created_at,
    }
);


const readonly = ref(true);
const submit = async () => {
  siteStore.hasLoading();
  try {
    const res = await axios.put(`updateUser1/${siteStore.userInfo.user_id}`, newUser.value);
    siteStore.hasRes(res);
    readonly.value = true;
  }
  catch (e) {
    console.log(e);
    siteStore.errorSystem();
  }
  finally {
    siteStore.doneLoading();
  }
};

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear().toString();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// :append-inner-icon="newUser.name.readonly ? 'mdi-square-edit-outline' : ''"
//                             :readonly="newUser.name.readonly"
//                             :clearable="!newUser.name.readonly"
//                             @click:append-inner="newUser.name.readonly = false"
//                             @blur="($event) => {
//                                 newUser.name.readonly = true;
//                                 if (!$event.target.value) {
//                                     newUser.name.value = props.user.name;
//                                 }
//                             }"

</script>

<template>
  <v-sheet
      width="600px"
      class="mx-auto"
  >
    <h2 class="text-center text-uppercase mb-4">Thông tin tài khoản của bạn</h2>
    <v-form @submit.prevent="submit">
      <v-container>
        <v-row>
          <v-col
              cols="12"
              class="py-1"
          >
            <v-text-field
                variant="outlined"
                density="compact"
                :counter="50"
                label="Họ và tên"
                v-model="newUser.full_name"
                :readonly="readonly"
                append-inner-icon="mdi-square-edit-outline"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
              cols="12"
              class="py-1"
          >
            <v-text-field
                variant="outlined"
                density="compact"
                label="Email"
                :model-value="newUser.email"
                disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
              cols="12"
              class="py-1"
          >
            <v-text-field
                variant="outlined"
                density="compact"
                v-model="newUser.phone_number"
                label="Số điện thoại"
                :readonly="readonly"
                append-inner-icon="mdi-square-edit-outline"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
              cols="12"
              class="py-1"
          >
            <v-text-field
                variant="outlined"
                density="compact"
                :model-value="formatDate(newUser.created_at)"
                label="Ngày tham gia"
                disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
              cols="12"
              class="py-1"
          >
            <v-text-field
                model-value="hello world"
                variant="outlined"
                density="compact"
                type="password"
                label="Mật khẩu"
                append-inner-icon="mdi-square-edit-outline"
                readonly
                @click:append-inner="router.push('/user/account/change-password')"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col
              cols="12"
              class="py-1"
          >
            <v-btn
                v-if="readonly"
                color="red-accent-4"
                block
                @click="readonly = false"
            >Chỉnh sửa thông tin
            </v-btn>
            <v-btn
                v-else
                type="submit"
                color="red-accent-4"
                block
            >
              Xác nhận
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-sheet>
</template>

<style></style>