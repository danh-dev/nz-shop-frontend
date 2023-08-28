<script setup>
import { useCartStore } from "@/stores/cart";
import { userData } from "@/stores/userData";
import axios from "axios";
import { ref } from "vue";
import { useDisplay } from "vuetify";

const cartStore = useCartStore();
const userStore = userData();
const { lgAndUp, mdAndUp } = useDisplay();
const errors = ref([])
const logout = async () => {
  try {
    await axios.get('logout', {
      user_id: userStore.id,
    });
    userStore.logout();
    localStorage.removeItem("accessToken");
  } catch (e) {
    errors.value = e.response.data.errors
  }
};
</script>

<template>
  <v-app-bar elevation="4" color="red-accent-4" scroll-behavior="elevate">
    <v-container>
      <v-row>
        <v-col cols="3" md="4" class="d-flex align-center ">
          <router-link to="/">
            <img id="logoShop" src="/assets/NZShop.svg" alt="Logo Shop" title="Logo Shop">
          </router-link>
          <v-btn class="menu-list text-body-2" prepend-icon="mdi-format-list-bulleted">
            Danh mục
          </v-btn>
        </v-col>
        <v-col cols="6" md="4" class="d-flex align-center justify-content-between">
          <v-form id="searchBox" @submit.prevent>
            <v-text-field density="compact" variant="solo" label="Bạn cần tìm gì?" prepend-inner-icon="mdi-magnify"
              single-line hide-details></v-text-field>
            <button type="submit" hidden=""></button>
          </v-form>
        </v-col>
        <v-col cols="3" md="4" class="d-flex align-center justify-end">
          <v-btn class="tracking text-body-2 text-start" size="large" prepend-icon="mdi-truck-fast-outline">
            Tra cứu<br>đơn hàng
          </v-btn>
          <v-btn @click="$router.push('/cart')" density="compact" class="cart-badge text-body-2" stacked>
            <v-badge :content="cartStore.totalUnit" color="pink-lighten-2">
              <v-icon icon="mdi-cart-outline" size="small"></v-icon>
            </v-badge>
            Giỏ hàng
          </v-btn>
          <v-btn @click="userStore.full_name ? logout() : $router.push('/login')" density="compact"
                 class="btn-login text-body-2" prepend-icon="mdi-account-circle-outline" stacked>
            {{ userStore.full_name ? userStore.full_name : "Đăng nhập" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
#logoShop {
  max-width: 185px;
}

#searchBox {
  min-width: 350px;
}

.btn-login,
.menu-list {
  text-transform: none;
  background-color: #df3346;
  margin: 0 10px;
}
</style>