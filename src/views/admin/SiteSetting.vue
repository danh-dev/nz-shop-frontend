<template>
  <v-row>
    <v-col>
      <v-card class="m-card">
        <v-container>
          <v-row>
            <v-col cols="0" class="d-none d-lg-block">
              <v-list>
                <v-list-item v-for="item in tabList" :prepend-icon="item.icon"
                             @click="()=>{selectSetting = item.tabAction}"
                             color="red-darken-2" rounded="xl" :active="selectSetting === item.tabAction">
                  <v-list-item-title class="text-menu">{{ item.text }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" lg="9">
              <GeneralSetting v-if="selectSetting==='generalSetting'"/>
              <MailSetting v-if="selectSetting==='mailSetting'"/>
              <ShopOnlineSetting v-if="selectSetting==='shopSetting'"/>
              <SEOSetting v-if="selectSetting==='seoSetting'"/>
              <DeliverySetting v-if="selectSetting==='deliverySetting'"/>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import {useSeoMeta} from "@unhead/vue";
import {ref} from "vue";
import GeneralSetting from "./SiteSetting/GeneralSetting.vue";
import SEOSetting from "./SiteSetting/SEOSetting.vue";
import ShopOnlineSetting from "./SiteSetting/ShopOnlineSetting.vue";
import MailSetting from "./SiteSetting/MailSetting.vue";
import DeliverySetting from "./SiteSetting/DeliverySetting.vue";
import PaymentSetting from "./SiteSetting/PaymentSetting.vue";
import {siteData} from "@/stores/globals";

const siteStore = siteData();
const selectSetting = ref("generalSetting");


const tabList = ref([
  {icon: "mdi-file-cog-outline", text: "General Setting", tabAction: "generalSetting"},
  {icon: "mdi-email-lock-outline", text: "Mail Setting", tabAction: "mailSetting"},
  {icon: "mdi-store-marker-outline", text: "Shop Setting", tabAction: "shopSetting"},
  {icon: "mdi-tab-search", text: "SEO Setting", tabAction: "seoSetting"},
  {icon: "mdi-truck-fast-outline", text: "Delivery Setting", tabAction: "deliverySetting"},
]);
siteStore.titleNow = "Site Settings";
useSeoMeta({
  title: siteStore.titleNow,
});
</script>

<style>
</style>