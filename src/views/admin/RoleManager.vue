<template>
  <v-row>
    <v-col>
      <v-alert
          density="compact"
          variant="outlined"
          type="warning"
          prominent
          border="top"
          title="Chú ý"
      >Trang quản lý vai trò và phân quyền. Nội dung quan trọng chỉ dành cho người có chuyên môn.<br>Những vai trò mặc
        định ( Admin, User, Manager, Deliver) sẽ không thể đổi tên hoặc xoá.
      </v-alert>

    </v-col>
  </v-row>
  <v-row>
    <v-col v-for="(item,index) in rolesList"
           :key="index"
           cols="12"
           sm="6"
           md="6"
           lg="4">

      <v-card class="m-card">
        <v-row>
          <v-col cols="6" class="d-flex flex-column justify-space-around ps-8">
            <span class="text-blue-grey-darken-1">Có {{ item.totalUser }} tài khoản</span>
            <h2 class="text-grey-darken-2">{{ item.name }}</h2>
            <div class="d-flex">
              <v-btn
                  class="text-none btn-pq"
                  color="red-darken-2"
                  rounded="2"
                  variant="outlined"
                  density="compact"
                  @click="clickEdit(index)"
              >
                Phân Quyền
              </v-btn>
              <v-btn
                  v-if="![1, 2, 3, 4].includes(item.id)"
                  class="mx-3"
                  color="red-darken-2"
                  rounded="2"
                  density="compact"
                  @click="deleteRole(item.id)"
              >
                <v-icon icon="mdi-delete-empty-outline"></v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col cols="6">
            <img :src="imgItem(item.name)" :alt="item.name" height="180">
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col cols="12"
           sm="6"
           md="6"
           lg="4">
      <v-card class="m-card">
        <v-row>
          <v-col cols="6" class="d-flex flex-column justify-center ps-8">
            <v-btn
                class="text-none btn-pq"
                color="red-darken-2"
                rounded="2"
                @click="clickNew"
            >
              Tạo vai trò
            </v-btn>
            <span>Thêm vai trò mới</span>
          </v-col>
          <v-col cols="6">
            <img :src="imgItem('new')" height="180" alt="new"/>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog
      v-model="formOpen"
      persistent
      max-width="550"
  >
    <v-card>
      <template #append>
        <v-btn density="compact" icon="mdi-close" color="red-darken-2" @click="formOpen = !formOpen"></v-btn>
      </template>
      <v-card-title>
        <span class="text-h5 font-weight-bold">{{ cf_id ? "Sửa đổi Vai trò & Phân Quyền" : "Tạo mới Vai trò" }}</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="cf_id?onUpdate(cf_id):onSubmit()" ref="dataForm" validate-on="lazy blur">
          <v-text-field class="my-3" v-model="cf_roleName"
                        :rules="[(value) =>!!value || 'Tên vai trò không được để trống.']" density="compact"
                        label="Vai trò"
                        prepend-inner-icon="mdi-shield" variant="outlined"
                        autocomplete="off"></v-text-field>
          <v-autocomplete
              v-model="selectPermissions"
              chips
              label="Phân Quyền"
              :items="permissionsList"
              multiple
              clearable
              closable-chips
              variant="outlined"
              autocomplete="off"
          ></v-autocomplete>
          <v-btn block="" class="mb-8" color="red-accent-4" size="large" type="submit">
            {{ cf_id ? "Cập Nhật" : "Tạo mới" }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {useSeoMeta} from "@unhead/vue";
import {onMounted, ref} from "vue";
import axios from "axios";
import {useRoute} from "vue-router";
import {siteData} from "@/stores/globals";

const siteStore = siteData();
const route = useRoute();
const dataForm = ref();
const formOpen = ref(false);
const rolesList = ref([]);
const permissionsList = ref([]);
const selectPermissions = ref([]);
const cf_roleName = ref();
const cf_id = ref();

const clickNew = () => {
  selectPermissions.value = [null];
  cf_roleName.value = null;
  cf_id.value = null;
  formOpen.value = true;
};
const clickEdit = (index) => {
  selectPermissions.value = rolesList.value[index].permissions;
  cf_roleName.value = rolesList.value[index].name;
  cf_id.value = rolesList.value[index].id;
  formOpen.value = true;
};

const imgItem = (value) => {
  switch (value.toLowerCase()) {
    case "admin":
      return "/assets/admincp/admin.webp";
    case "user":
      return "/assets/admincp/user.webp";
    case "deliver":
      return "/assets/admincp/deliver.webp";
    case "manager":
      return "/assets/admincp/manager.webp";
    default:
      return "/assets/admincp/default.webp";
  }
};

async function deleteRole(id) {
  if (confirm("Are you sure?")) {
    siteStore.isLoading = true;
    try {
      const res = await axios.post("/deleteRole", {
        role_id: id
      });
      await fetchRoles();
      siteStore.hasRes(res);
    } catch (e) {
      siteStore.errorSystem();
      console.log(e);
    } finally {
      siteStore.isLoading = false;
    }
  }
}

async function fetchRoles() {
  siteStore.isLoading = true;
  try {
    const res = await axios.get("/listRoles");
    rolesList.value = res.data;
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
}

async function fetchPermissions() {
  siteStore.isLoading = true;
  try {
    const res = await axios.get("/listPermissions");
    permissionsList.value = res.data;
  } catch (error) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
}

const createRole = async () => {
  try {
    siteStore.isLoading = true;
    let res = await axios.post("createRoleWithPermissions", {
      role_name: cf_roleName.value,
      permissions: selectPermissions.value,
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};
const updateRole = async (id) => {
  try {
    siteStore.isLoading = true;
    let res = await axios.put(`/updateRole/${id}`, {
      role_name: cf_roleName.value,
      permissions: selectPermissions.value,
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};
const onUpdate = (id) => {
  dataForm.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      updateRole(id);
      formOpen.value = false;
    }
    fetchRoles();
  });
};
const onSubmit = () => {
  dataForm.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      createRole();
      formOpen.value = false;
    }
    fetchRoles();
  });
};
onMounted(() => {
  fetchRoles();
  fetchPermissions();
});
route.meta.title = "Roles Management";
useSeoMeta({
  title: route.meta.title,
});
</script>

<style scoped>
.btn-pq {
  width: fit-content;
}
</style>