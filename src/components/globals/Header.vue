<script setup>
import {useDisplay} from "vuetify";
import {siteData} from "@/stores/globals";
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const {lgAndUp, mdAndUp} = useDisplay();
const siteStore = siteData();

const miniLogo = import.meta.env.VITE_PUBLIC_URL + siteStore.siteSetings.logo_mini;
const menus = ref([
  { icon: 'mdi-card-account-details', text: 'Tài khoản', route: 'user' },
  { icon: 'mdi-truck-fast-outline', text: 'Lịch sử đơn hàng', route: 'coupons' },
  { icon: 'mdi-account-outline', text: 'User Manager', route: 'users', role:'admin'},
  { icon: 'mdi-logout', text: 'Đăng xuất', route: 'logout' },
]);

const clickAction = (item , index)=>{
  console.log(item)
  if (index === menus.value.length - 1) {
    siteStore.logout()
  }else{
    router.push(`/${item.route}`);
  }
}
</script>

<template>
  <v-app-bar
      elevation="4"
      color="red-accent-4"
      scroll-behavior="elevate"
  >
    <v-container :fluid="!lgAndUp">
      <v-row class="d-flex align-center justify-space-between py-0">
        <v-col
            cols="2" md="3" lg="4"
            class="d-flex align-center"
        >
          <router-link :to="{ name: 'home' }" class="d-flex align-center">
            <img v-if="mdAndUp" src="/assets/NZShop.svg" width="180" alt="Logo">
            <img v-else :src="miniLogo" width="50" alt="Logo">
          </router-link>
          <div id="categories" class="d-none d-sm-block">
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
            cols="7" md="5" lg="4"
            class="d-flex align-center justify-content-between"
        >
          <v-form
              id="searchBox"
              @submit.prevent
          >
            <v-text-field
                density="compact"
                variant="solo"
                label="Bạn cần tìm gì?"
                prepend-inner-icon="mdi-magnify"
                single-line
                hide-details
            ></v-text-field>
            <button
                type="submit"
                hidden
            ></button>
          </v-form>
        </v-col>
        <v-col
            cols="3" md="4" lg="4"
            class="d-flex align-center justify-end"
        >
          <v-btn
              class="tracking text-body-2 text-start d-none d-sm-flex"
              :size="mdAndUp?'large':'small'"
          >
            <template #prepend>
              <v-icon size="30">mdi-truck-fast-outline</v-icon>
            </template>
            <div v-if="mdAndUp" class="d-none d-block">
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
              <v-list> <v-list-item prepend-icon="mdi-shield-crown-outline" v-if="siteStore.isAdmin" @click="router.push('/admincp')">Admin CP</v-list-item>

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
            <span v-if="mdAndUp" class="m-ellipsis">{{
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