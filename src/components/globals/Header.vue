<script setup>
import {useDisplay} from "vuetify";
import {siteData} from "@/stores/globals";
import {ref, watch} from "vue";
import {useRouter} from "vue-router";
import axios from "@/axiosComfig";

const router = useRouter();
const {lgAndUp, mdAndUp} = useDisplay();
const siteStore = siteData();

const miniLogo = import.meta.env.VITE_PUBLIC_URL + siteStore.siteSetings.logo_mini;
const bigLogo = import.meta.env.VITE_PUBLIC_URL + siteStore.siteSetings.logo_bg;
const menus = ref([
  {icon: "mdi-card-account-details", text: "Tài khoản", route: "user"},
  {icon: "mdi-truck-fast-outline", text: "Lịch sử đơn hàng", route: "user/history"},
  {icon: "mdi-logout", text: "Đăng xuất", route: "logout"},
]);

const clickAction = (item, index) => {
  console.log(item);
  if (index === menus.value.length - 1) {
    siteStore.logout();
  } else {
    router.push(`/${item.route}`);
  }
};

const url = import.meta.env.VITE_PUBLIC_URL;

const searchInput = ref("");
const searchOutput = ref([]);

const submit = () => {
  window.location.href = `/tim-kiem?name=${searchInput.value}`;
};

watch(searchInput, () => {
  fetchSearchOutput();
});

const fetchSearchOutput = async () => {
  if (searchInput.value && searchInput.value.length >= 3) {
    try {
      const res = await axios.get(`search-output/${searchInput.value}`);
      searchOutput.value = res.data.data;
    } catch (e) {
      console.log(e);
    }
  }
};

</script>

<template>
  <v-app-bar
      elevation="4"
      :color="siteStore.siteSetings.main_color"
      scroll-behavior="elevate"
  >
    <v-container :fluid="!lgAndUp">
      <v-row class="d-flex align-center justify-space-between py-0">
        <v-col
            cols="2"
            md="3"
            lg="4"
            class="d-flex align-center"
        >
          <router-link
              :to="{ name: 'home' }"
              class="d-flex align-center"
          >
            <img
                v-if="mdAndUp"
                :src="bigLogo"
                width="180"
                alt="Logo"
            >
            <img
                v-else
                :src="miniLogo"
                width="50"
                alt="Logo"
            >
          </router-link>
          <div class="d-none d-sm-block"
               id="categories">
            <v-btn
                v-if="lgAndUp"
                class="menu-list text-body-2"
                prepend-icon="mdi-format-list-bulleted"

            >
              Danh mục
            </v-btn>
            <v-btn
                v-else
                class="menu-list text-body-2"
                prepend-icon="mdi-format-list-bulleted"
                size="40"
            >
            </v-btn>
          </div>
        </v-col>
        <v-col
            cols="7"
            md="5"
            lg="4"
            class="d-flex align-center justify-content-between"
        >
          <v-form
              id="searchBox"
              @submit.prevent="submit"
          >
            <v-autocomplete
                variant="solo"
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Bạn cần tìm gì?"
                single-line
                density="compact"
                v-model:search="searchInput"
                :items="searchOutput"
                item-title="name"
                hide-no-data
                menu-icon=""
                @keyup.enter="submit"
            >
              <template #item="{ item }">
                <v-list-item
                    :to="`/san-pham/${item?.raw?.slug}`"
                    density="compact"
                >
                  <template #prepend>
                    <v-img
                        width="30"
                        height="40"
                        :src="`${url}${item?.raw?.image}`"
                    ></v-img>
                  </template>
                  <template #title>
                    <div class="ms-3">{{ item?.raw?.name }}</div>
                  </template>
                  <template #subtitle>
                    <div class="ms-3">{{ formatPrice(item?.raw?.sell_price) }}</div>
                  </template>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-form>
        </v-col>
        <v-col
            cols="3"
            md="4"
            lg="4"
            class="d-flex align-center justify-end"
        >
          <v-btn
              class="tracking text-body-2 text-start d-none d-sm-flex"
              :size="mdAndUp ? 'large' : 'small'"
          >
            <template #prepend>
              <v-icon size="30">mdi-truck-fast-outline</v-icon>
            </template>
            <div
                v-if="mdAndUp"
                class="d-none d-block"
            >
              Tra cứu<br>đơn hàng
            </div>
          </v-btn>
          <v-btn
              @click="$router.push('/cart')"
              density="compact"
              class="cart-badge text-body-2"
              stacked
          >
            <v-badge
                :content="siteStore.totalUnit"
                color="pink-lighten-2"
            >
              <v-icon size="25">mdi-cart</v-icon>
            </v-badge>
            <span v-if="mdAndUp">Giỏ hàng</span>
          </v-btn>
          <v-btn
              density="compact"
              class="btn-login text-body-2 d-none d-sm-flex flex-column"
              prepend-icon="mdi-account-circle-outline"
              stacked
              @click="siteStore.userInfo.full_name ? null : $router.push('/login')"
          >
            <v-menu activator="parent" v-if="siteStore.userInfo.full_name">
              <v-list>
                <v-list-item prepend-icon="mdi-shield-crown-outline" v-if="siteStore.isAdmin"
                             @click="router.push('/admincp')">Admin CP
                </v-list-item>

                <v-list-item
                    v-for="(item, index) in menus"
                    :key="index"
                    :prepend-icon="item.icon"
                    @click="clickAction(item, index)"
                >
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <span v-if="mdAndUp" class="m-ellipsis">                  {{
                siteStore.userInfo.full_name ? siteStore.userInfo.full_name : "Đăng nhập"
              }}</span>

          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
#searchBox {
  width: clamp(250px, 80%, 350px);
  padding: 0 10px;
}

.btn-login,
.menu-list {
  text-transform: none;
  background-color: #df3346;
  margin: 0 10px;
}

.m-ellipsis {
  max-width: 75px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>