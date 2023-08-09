<template>
  <div class="container-fluid">
    <div class="row text-white text-uppercase d-flex align-center justify-center"
      style="background-color: rgb(223, 10, 10); padding: 1rem;">
      <div class="col-1 d-flex d-sm-none align-center justify-center">
        <span @click="showDrawer()">menu</span>
      </div>

      <div class="col-10 col-sm-9 justify-sm-start">
        <img src="/assets/images/logo.jpg" alt="logo" width="125">
        <!-- <span class="d-none d-sm-flex">quản trị viên</span> -->
      </div>

      <div class="col-sm-3 d-none d-sm-flex align-center justify-sm-end">
        <span>admin</span>
      </div>

      <div class="col-1 d-flex d-sm-none align-center justify-center">
        <span @click="showDrawerUser()">admin</span>
      </div>
    </div>
  </div>
  <!-- Begin for mobile -->
  <v-menu v-model:open="open" title="Category" placement="left">
    <p>Phone</p>
    <p>Laptop</p>
    <p>Tablet</p>
  </v-menu>

  <v-menu v-model:open="openUser" title="Admin" placement="right">
    <TheMenu />
  </v-menu>
  <!-- And for mobile -->
</template>

<script>
//show menu bar & admin bar
import { defineComponent, ref } from "vue";
import TheMenu from "../components/TheMenu.vue";
// const open = ref(false);
// const openUser = ref(false);
// const showDrawer = () => { open.value = true;};
// const showDrawerUser = () => { open.value = true; };
export default defineComponent({
  components: {
    TheMenu,
  },

  setup() {
    const open = ref(null);
    const openUser = ref(null);

    function showDrawer() {
      open.value = true;
    };

    function showDrawerUser() {
      openUser.value = true;
    };

    return {
      open,
      showDrawer,
      openUser,
      showDrawerUser
    };
  }
});
</script>


<style>
* {
  margin: 0;
  box-sizing: border-box;
  font-size: 14px;
}
</style>