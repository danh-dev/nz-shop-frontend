<template>
  <v-app>
    <aside>
      <v-navigation-drawer
        v-model="drawer"
        class="pa-3"
        elevation="1"
      >
        <template #prepend>
          <RouterLink
            to="/admincp"
            class="app-logo d-flex align-center gap-x-3 app-title-wrapper"
          >
            <img
              id="logoShop"
              src="/assets/NZShop-Text.svg"
              alt="logo shop"
            >
          </RouterLink>
          <v-btn
            density="compact"
            class="btn-close hidden-lg-and-up"
            icon="mdi-close"
            @click.stop="drawer = !drawer"
          ></v-btn>
        </template>
        <MenuList />
        <template #append>
          <div class="pa-2">
            <v-btn
              block
              color="blue-grey-darken-4"
            >
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </aside>
    <v-main style="background-color: #f8f7fa;">
      <v-container class="position-relative">
        <header class="bar-sticky">
          <v-toolbar
            rounded
            class="bg-white m-card"
          >
            <div class="hidden-lg-and-up  ms-3">
              <v-btn
                prepend-icon="mdi-apps"
                variant="tonal"
                class="font-weight-bold bg-red-darken-1"
                @click.stop="drawer = !drawer"
              >
                Tính năng
              </v-btn>
            </div>
            <v-toolbar-title class="text-h6 font-weight-bold text-blue-grey-darken-1">
              {{ childTitle ? childTitle : "Trang admin" }}
            </v-toolbar-title>
            <div class="hidden-md-and-down ms-3">
              <v-btn
                prepend-icon="mdi-apps"
                variant="tonal"
                class="font-weight-bold bg-red-darken-1"
              >
                Tính năng
              </v-btn>
            </div>
            <v-avatar class="ma-2">
              <v-img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              ></v-img>
            </v-avatar>
          </v-toolbar>
        </header>
        <main>
          <router-view />
        </main>
        <footer>
          <div class="ms-1 ma-3">
            <!-- 👉 Footer: left content -->
            <span class="d-flex align-center">
              &copy;
              {{ new Date().getFullYear() }}
              Made With ❤️‍🔥🧠🍀 By Group 4 - T1.2210.E1

            </span>
          </div>
        </footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import MenuList from "../components/admincp/MenuList.vue";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const drawer = ref(true);
const childTitle = ref();

const route = useRoute();
const router = useRouter();

watch(router.currentRoute,
  () => {
    childTitle.value = document.title;
  }
);

// onMounted(() => {
//   if (route.meta.title) {
//     console.log(route.meta.title)
//     childTitle.value = route.meta.title;
//   }
// });

// onBeforeRouteUpdate((to, from, next) => {
//   if (to.meta.title) {
//     titleChild.value = route.meta.title;
//   }
//   next();
// });
</script>

<style scoped>
.bar-sticky {
  position: sticky;
  top: 0;
  inset-block-start: 1rem;
  z-index: 1;
}

.btn-close {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 3;

}
</style>