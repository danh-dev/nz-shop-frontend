<template>
  <v-row>
    <v-col v-for="meta in userListMeta"
           :key="meta.title"
           cols="12"
           sm="6"
           lg="3">

      <v-card class="m-card">
        <v-card-text class="d-flex justify-space-between text-blue-grey-darken-2">
          <div>
            <span class="font-weight-bold">{{ meta.title }}</span>
            <div class="d-flex align-center gap-2 my-1">
              <h6 class="text-h4">
                {{ meta.stats }}
              </h6>
              <span v-if="meta.percentage"
                    :class="meta.percentage > 0 ? 'text-success' : 'text-error'">( +{{ meta.percentage }} Mới)</span>
            </div>
          </div>
          <v-avatar
              rounded
              variant="tonal"
              :color="meta.color"
              :icon="meta.icon"
          />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-card class="m-card">
        <v-card-title class="font-weight-bold text-h5 my-3 text-grey-darken-2">Danh sách người dùng</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="4" md="3" class="d-flex">
              <v-btn
                  color="red-accent-2"
                  prepend-icon="mdi-plus"
                  size="large"
                  @click="()=>{clearFields(); formCreate = !formCreate;}"
              >
                Thêm User Mới
              </v-btn>
            </v-col>
            <v-spacer/>
            <v-col cols="12" sm="4" md="3" class="d-flex justify-end">
              <v-text-field
                  color="red-accent-2"
                  v-model="searchQuery"
                  placeholder="Tìm kiếm..."
                  density="compact"
                  variant="outlined"
              />
            </v-col>
            <v-col cols="12" sm="3" md="2">
              <v-select
                  color="red-accent-2"
                  density="compact"
                  variant="outlined"
                  :model-value="options.itemsPerPage"
                  :items="[
                          { value: 10, title: '10' },
                          { value: 25, title: '25' },
                          { value: 50, title: '50' },
                          { value: 100, title: '100' },
                          { value: -1, title: 'All' },
                        ]"
                  @update:model-value="options.itemsPerPage = parseInt($event, 10)"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider/>
        <v-card-text>
          <v-row>
            <v-col
                cols="12"
                sm="6"
            >
              <v-select
                  density="compact"
                  v-model="selectedRole"
                  label="Vai trò"
                  :items="roles"
                  item-title="name"
                  item-value="name"
                  clearable
                  variant="outlined"
                  color="red-accent-2"
                  aria-autocomplete="none"
              />
            </v-col>
            <VCol
                cols="12"
                sm="6"
            >
              <v-select
                  density="compact"
                  v-model="selectedStatus"
                  label="Trạng thái"
                  :items="status"
                  clearable
                  variant="outlined"
                  color="red-accent-2"
                  aria-autocomplete="none"
              />
            </VCol>
          </v-row>
        </v-card-text>
        <v-divider/>

        <v-data-table
            v-model:items-per-page="options.itemsPerPage"
            v-model:page="options.page"
            :items="users"
            :items-length="users.length"
            :headers="headers"
            class="text-no-wrap"
            @update:options="options = $event"
        >
          <template #item.index="{ item }">{{ item.index + 1 }}</template>
          <template #item.full_name="{ item }">
            <div class="d-flex align-center">
              <v-avatar
                  size="34"
                  :variant="!item.raw.avatar ? 'tonal' : undefined"
                  :color="!item.raw.avatar ? customItem(item.raw.role).color : undefined"
                  class="me-3"
              >
                <span>{{ avatarText(item.raw.full_name) }}</span>
              </v-avatar>

              <div class="d-flex flex-column">
                <h5 class="text-base">
                  {{ item.raw.full_name }}
                </h5>

                <span class="text-sm text-body-2 text-blue-grey-darken-1">{{ item.raw.email }}</span>
              </div>
            </div>
          </template>

          <template #item.role="{ item }">
            <div>
              <v-avatar
                  :size="30"
                  :color="customItem(item.raw.role).color"
                  variant="tonal"
                  class="me-3"
              >
                <v-icon
                    :size="20"
                    :icon="customItem(item.raw.role).icon"
                />
              </v-avatar>
              <span class="text-capitalize">{{ item.raw.role || "none" }}</span>
            </div>
          </template>

          <template #item.isVerify="{ item }">
            <v-chip
                :color="item.raw.isVerify !=='Verified'?'red-darken-2':'green-darken-2'"
                size="small"
                label
                class="text-capitalize"
            >
              {{ item.raw.isVerify }}
            </v-chip>
          </template>
          <template #item.isSuspended="{ item }">
            <v-switch
                :model-value="item.raw.isSuspended==='active'||false"
                @change="changeStatus(item.raw.id)"
                density="compact"
                color="light-blue-lighten-3"
                class="d-flex justify-center"
            ></v-switch>
          </template>

          <template #item.actions="{ item }">
            <v-btn density="compact" icon="mdi-text-box-edit-outline" color="orange-darken-2"
                   @click="()=>{clearFields(); formUpdate = !formUpdate; getInfo(item.raw.id)}"></v-btn>
          </template>

          <template #bottom>
            <v-divider/>
            <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
              <p class="text-sm text-disabled mb-0">
                {{ paginationMeta(options, totalUsers) }}
              </p>

              <v-pagination
                  color="red-darken-2"
                  v-model="options.page"
                  :length="totalPage"
                  :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalUsers / options.itemsPerPage)"
              >
              </v-pagination>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog
      v-model="formCreate"
      persistent
      max-width="550"
  >
    <v-card>
      <template #append>
        <v-btn density="compact" icon="mdi-close" color="red-darken-2" @click="formCreate = !formCreate"></v-btn>
      </template>
      <v-card-title>
        <span class="text-h5 font-weight-bold">Tạo tài khoản</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="onCreate" ref="dataForm" validate-on="lazy blur">

          <v-text-field class="my-3" v-model="cf_fullname" :rules="[rule_fullname]" density="compact" label="Họ và Tên"
                        prepend-inner-icon="mdi-account-outline" variant="outlined"
          ></v-text-field>
          <v-text-field class="my-3" v-model="cf_email" :rules="[rule_email]" density="compact" label="Email"
                        prepend-inner-icon="mdi-email-outline" variant="outlined"
          ></v-text-field>
          <v-text-field class="my-3" v-model="cf_phone" :rules="[rule_phone]" density="compact"
                        label="Số điện thoại"
                        prepend-inner-icon="mdi-phone-dial-outline" variant="outlined"></v-text-field>
          <v-select
              density="compact"
              v-model="cf_role"
              label="Vai trò"
              :items="roles"
              item-title="name"
              item-value="name"
              variant="outlined"
              color="red-accent-2"
              aria-autocomplete="none"
          />
          <v-select
              density="compact"
              v-model="cf_verify"
              label="Xác minh"
              :items="status"
              variant="outlined"
              color="red-accent-2"
              aria-autocomplete="none"
          />
          <v-btn block="" class="mb-8" color="red-accent-4" size="large" type="submit">
            Thêm Tài Khoản
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog
      v-model="formUpdate"
      persistent
      max-width="550"
  >
    <v-card>
      <template #append>
        <v-btn density="compact" icon="mdi-close" color="red-darken-2" @click="formUpdate = !formUpdate"></v-btn>
      </template>
      <v-card-title>
        <span class="text-h5 font-weight-bold">Sửa thông tin tài khoán</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="onUpdate" ref="dataForm" validate-on="lazy blur" autocomplete="off">
          <v-text-field class="my-3" v-model="cf_fullname" :rules="[rule_fullname]" density="compact" label="Họ và Tên"
                        prepend-inner-icon="mdi-account-outline" variant="outlined" autocomplete="off"></v-text-field>
          <v-text-field class="my-3" v-model="cf_email" :rules="[rule_email]" density="compact" label="Email"
                        prepend-inner-icon="mdi-email-outline" variant="outlined" autocomplete="off"></v-text-field>
          <v-text-field class="my-3" v-model="cf_phone" :rules="[rule_phone]" density="compact" label="Số điện thoại"
                        prepend-inner-icon="mdi-phone-dial-outline" variant="outlined"
                        autocomplete="off"></v-text-field>
          <v-select
              density="compact"
              v-model="cf_role"
              label="Vai trò"
              :items="roles"
              item-title="name"
              item-value="name"
              variant="outlined"
              color="red-accent-2"
              autocomplete="off"
              aria-autocomplete="none"
          />
          <v-select
              density="compact"
              v-model="cf_verify"
              label="Xác minh"
              :items="status"
              variant="outlined"
              color="red-accent-2"
              autocomplete="off"
              aria-autocomplete="none"
          />
          <v-btn block="" class="mb-8" color="red-accent-4" size="large" type="submit">
            Cập nhật
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {useSeoMeta} from "@unhead/vue";
import {useRoute, useRouter} from "vue-router";
import {computed, onMounted, ref, watchEffect} from "vue";
import axios from "../../axiosComfig";
import {rule_email, rule_fullname, rule_phone} from "@/validators";
import {siteData} from "@/stores/globals";

const siteStore = siteData();
const router = useRouter();
const roles = ref([]);
const userStats = ref({});
const selectedRole = ref();
const searchQuery = ref("");
const selectedStatus = ref();
const users = ref([]);
const route = useRoute();
const isLoading = ref();
const formCreate = ref(false);
const formUpdate = ref(false);
const dataForm = ref();

const cf_fullname = ref();
const cf_email = ref();
const cf_phone = ref();
const cf_role = ref();
const cf_verify = ref();
const cf_id = ref();

const options = ref({
  page: 1,
  itemsPerPage: 10,
});

// Computed
const clearFields = () => {
  cf_fullname.value = null;
  cf_email.value = null;
  cf_phone.value = null;
  cf_role.value = null;
  cf_verify.value = null;
  cf_id.value = null;
};
const totalUsers = computed(() => {
  return users.value.length;
});
const totalPage = computed(() => {
  return Math.ceil(totalUsers.value / options.value.itemsPerPage) || 1;
});
const paginationMeta = computed(() => {
  return (options, total) => {
    const start = (options.page - 1) * options.itemsPerPage + 1;
    const end = Math.min(options.page * options.itemsPerPage, total);

    return `Đang hiển thị từ ${start} đến ${end} trên tổng ${total} dữ liệu.`;
  };
});
//Data

const status = [
  {
    title: "Verified",
    value: "verified",
  },
  {
    title: "Pending",
    value: "pending",
  },
];
const headers = [
  {
    title: "#",
    key: "index",
    sortable: false,
  },
  {
    title: "Họ và Tên",
    key: "full_name",
  },
  {
    title: "Vai trò",
    key: "role",
  },
  {
    title: "Số điện thoại",
    key: "phone_number",
  },
  {
    title: "Xác minh",
    key: "isVerify",
    sortable: false,
  },
  {
    title: "Trạng thái",
    key: "isSuspended",
    align: "center",
    sortable: false,
  },
  {
    title: "Chức năng",
    key: "actions",
    align: "center",
    sortable: false,
  },
];
const userListMeta = computed(() => [
  {
    icon: "mdi-account-clock",
    color: "primary",
    title: "Tổng số tài khoản",
    stats: userStats.value.total,
    percentage: userStats.value.new,
  },
  {
    icon: "mdi-account-star",
    color: "success",
    title: "Tài khoản đã kích hoạt",
    stats: userStats.value.active,
    percentage: "",
  },
  {
    icon: "mdi-account-alert",
    color: "warning",
    title: "Tài khoản chờ kích hoạt",
    stats: userStats.value.pending,
    percentage: "",
  },
  {
    icon: "mdi-account-cancel",
    color: "error",
    title: "Tài khoản bị khoá",
    stats: userStats.value.suspended,
    percentage: "",
  },
]);

// Function

function generatePassword() {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberList = "1234567890";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const specialChars = "!@#$%^&*()_-+=<>?";

  const getRandomChar = (characters) => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  };

  let password = "";
  for (let i = 0; i < 3; i++) {
    password += getRandomChar(lowercaseChars);
    password += getRandomChar(uppercaseChars);
    password += getRandomChar(numberList);
    password += getRandomChar(specialChars);
  }

  return password;
}

const avatarText = value => {
  if (!value) {
    return "";
  }
  const nameArray = value.split(" ");

  return nameArray.map(word => word.charAt(0).toUpperCase()).join("");
};
const customItem = (role) => {
  switch (role.toLowerCase()) {
    case "admin":
      return {
        color: "red-darken-2",
        icon: "mdi-shield-crown-outline",
      };
    case "user":
      return {
        color: "light-blue-lighten-2",
        icon: "mdi-shield-account-outline"
      };
    case "deliver":
      return {
        color: "green-darken-1",
        icon: "mdi-package-variant-closed-check"
      };
    case "manager":
      return {
        color: "deep-orange-darken-4",
        icon: "mdi-shield-star-outline"
      };
    default:
      return {
        color: "blue-grey-darken-4",
        icon: "mdi-account-cog-outline"
      };
  }
};

async function getInfo(id) {
  siteStore.isLoading = true;
  try {
    const res = await axios.get(`/users/${id}`);
    cf_email.value = res.data.email;
    cf_fullname.value = res.data.full_name;
    cf_role.value = res.data.role;
    cf_verify.value = res.data.isVerify;
    cf_phone.value = res.data.phone_number;
    cf_id.value = res.data.id;
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
}

async function fetchRoles() {
  siteStore.isLoading = true;
  try {
    const res = await axios.get("/listRoles");
    roles.value = res.data;
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
}

async function fetchStatistics() {
  isLoading.value = true;
  try {
    const res = await axios.get("/userStats");
    userStats.value = res.data;
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    isLoading.value = false;
  }
}

async function fetchUserList(q, r, s) {
  siteStore.isLoading = true;
  try {
    const queryString = q ? q.toLowerCase() : "";
    const queryRole = r ? r.toLowerCase() : "";
    const queryStatus = s ? s.toLowerCase() : "";

    const res = await axios.get("/getListUser");
    users.value = res.data.filter(user => (
        (user.full_name.toLowerCase().includes(queryString) || user.phone_number.includes(queryString) || user.email.toLowerCase().includes(queryString)) &&
        (queryRole === "" || user.role.toLowerCase() === queryRole) &&
        (queryStatus === "" || user.isVerify.toLowerCase() === queryStatus)
    )).reverse();
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading =  false;
  }
}

const create = async () => {
  try {
    siteStore.isLoading = true;
    let res = await axios.post("createUser", {
      full_name: cf_fullname.value,
      phone_number: cf_phone.value,
      email: cf_email.value,
      password: generatePassword(),
      role: cf_role.value,
      verify: cf_verify.value,
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};
const onCreate = async () => {
  dataForm.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      create();
      formCreate.value = false;
    }
    fetchUserList();
    fetchStatistics();
  });
};

const update = async (id) => {
  try {
    siteStore.isLoading = true;
    let res = await axios.put(`/updateUser/${id}`, {
      full_name: cf_fullname.value,
      phone_number: cf_phone.value,
      email: cf_email.value,
      role: cf_role.value,
      verify: cf_verify.value,
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};
const onUpdate = async () => {
  dataForm.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      update(cf_id.value);
      formUpdate.value = false;
    }
    fetchUserList();
    fetchStatistics();
  });
};


const changeStatus = async (id) => {
  try {
    siteStore.isLoading = true;
    let res = await axios.put(`/changeStatusUser/${id}`);
    await fetchStatistics();
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};

watchEffect(() => {
  fetchUserList(searchQuery.value, selectedRole.value, selectedStatus.value);
});

onMounted(() => {
  fetchRoles();
  fetchStatistics();
  fetchUserList();
});

//SEO

route.meta.title = "User Management";
useSeoMeta({
  title: route.meta.title,
});
</script>

<style scoped>
.app-user-search-filter {
  inline-size: 31.6rem;
}

.text-capitalize {
  text-transform: capitalize;
}
</style>