<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <TheAdminHeader />

  <div class="container-fluid mt-3">
    <div class="row">

      <div class="col-sm-3 d-none d-sm-flex">
        <v-list size="large" elevation="2" style="width: 100%;">
          <TheMenu />
          <template #header>
            <div class="text-uppercase" style="color: rgb(223, 10, 10);">Dashboard</div>
          </template>
        </v-list>
      </div>

      <div class="col-sm-9 col-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TheAdminHeader from "../components/TheAdminHeader.vue";
import TheMenu from "../components/TheMenu.vue";
export default {
  components: {
    TheAdminHeader, TheMenu
  }
};
</script>
