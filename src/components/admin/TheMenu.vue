<template>
  <v-list v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys">
    <v-list-item key="admin-user">
      <router-link :to="{ name: 'admin' }" class="text-decoration-none">
        <span class="text-h6 text-danger">Dashboard</span>
      </router-link>
    </v-list-item>

    <v-list-item key="admin-user">
      <router-link :to="{ name: 'admin-user' }" class="text-decoration-none">
        <span class="text-body-1">Tài khoản</span>
      </router-link>
    </v-list-item>

    <v-list-item key="admin-role">
      <router-link :to="{ name: 'admin-role' }" class="text-decoration-none">
        <span class="text-body-1">Status</span>
      </router-link>
    </v-list-item>

    <v-list-item key="admin-setting">
      <router-link :to="{ name: 'admin-setting' }" class="text-decoration-none">
        <span class="text-body-1">Cài đặt</span>
      </router-link>
    </v-list-item>

    <v-list-item key="admin-product">
      <router-link :to="{ name: 'admin-product' }" class="text-decoration-none">
        <span class="text-body-1">Sản phẩm</span>
      </router-link>
    </v-list-item>

    <v-list-item key="admin-sale">
      <router-link :to="{ name: 'admin-sale' }" class="text-decoration-none">
        <span class="text-body-1">Doanh số</span>
      </router-link>
    </v-list-item>

    <v-list-item key="admin-sale">
      <router-link :to="{ name: 'admin-sale' }" class="text-decoration-none">
        <span class="text-body-1">Doanh số</span>
      </router-link>
    </v-list-item>

    <v-list-item key="admin-sale">
      <router-link :to="{ name: 'admin-sale' }" class="text-decoration-none">
        <span class="text-body-1">Doanh số</span>
      </router-link>
    </v-list-item>

    <v-list-item key="admin-sale">
      <router-link :to="{ name: 'admin-sale' }" class="text-decoration-none">
        <span class="text-body-1">Doanh số</span>
      </router-link>
    </v-list-item>

    <v-list-item key="admin-sale">
      <router-link :to="{ name: 'admin-sale' }" class="text-decoration-none">
        <span class="text-body-1">Doanh số</span>
      </router-link>
    </v-list-item>
  </v-list>
</template>

<!-- <script setup>
import { reactive } from "vue";
  const state = reactive(
      {
          selectedKeys: ["admin-user"],
          openKeys: []
      }
  );
</script> -->

<script>
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { useMenu } from "../stores/useMenu";
export default defineComponent({
  setup() {
    const store = useMenu();
    return {
      ...storeToRefs(store)
    };

  }
});
</script>
