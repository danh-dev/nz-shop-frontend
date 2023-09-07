<template>
  <v-row>
    <v-col cols="12">
      <v-card class="m-card">
        <v-card-title class="font-weight-bold text-h5 my-3 text-grey-darken-2">Danh sách mã giảm giá</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="5" md="3" class="d-flex">
              <v-btn
                  block
                  color="red-accent-2"
                  prepend-icon="mdi-plus"
                  size="large"
                  @click="openForm()"
              >
                Tạo mã giảm giá
              </v-btn>
            </v-col>
            <v-spacer/>
            <v-col cols="12" sm="4" md="3" class="d-flex justify-end">
              <v-text-field
                  color="red-accent-2"
                  v-model="searchQuery"
                  placeholder="Tìm kiếm ..."
                  density="compact"
                  variant="outlined"
                  autocomplete="off"
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
                class="d-flex"
            >
              <v-text-field
                  color="red-accent-2"
                  v-model="selectDateStart"
                  label="Ngày bắt đầu"
                  density="compact"
                  variant="outlined"
                  type="date"
                  class="me-2"
                  clearable
              />
              <v-text-field
                  color="red-accent-2"
                  v-model="selectDateEnd"
                  label="Ngày kết thúc"
                  density="compact"
                  variant="outlined"
                  type="date"
                  class="ms-2"
                  clearable
              />
            </v-col>
            <v-col
                cols="12"
                sm="6"
                class="d-flex"
            >
              <v-select
                  density="compact"
                  v-model="selectedType"
                  label="Loại mã giảm giá"
                  :items="typeCoupon"
                  item-title="name"
                  item-value="value"
                  clearable
                  variant="outlined"
                  color="red-accent-2"
                  aria-autocomplete="none"
                  class="me-3"
                  autocomplete="off"
              />
              <v-select
                  density="compact"
                  v-model="selectedStatus"
                  label="Trạng thái"
                  :items="couponStatus"
                  item-title="name"
                  item-value="value"
                  clearable
                  variant="outlined"
                  color="red-accent-2"
                  aria-autocomplete="none"
                  class="ms-3"
                  autocomplete="off"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider/>
        <v-data-table
            v-model:items-per-page="options.itemsPerPage"
            v-model:page="options.page"
            :items="coupons"
            :items-length="coupons.length"
            :headers="headers"
            class="text-no-wrap"
            @update:options="options = $event"
        >
          <template #item.index="{ item }">{{ item.index + 1 }}</template>
          <template #item.type_coupon="{ item }">
            <div class="d-flex align-center">
              <v-avatar
                  size="34"
                  variant="tonal"
                  :color="customType(item.raw.type_coupon).color"
                  class="me-3"
              >
                <v-icon :icon="customType(item.raw.type_coupon).icon"></v-icon>
              </v-avatar>
              <div class="d-flex flex-column">
                <h5 class="text-base m-title" :title="item.raw.name">
                  {{ item.raw.name }}
                </h5>
              </div>
            </div>
          </template>
          <template #item.type_value="{ item }">
            <v-chip :color="customTypeValue(item.raw.type_value).color">{{
                customTypeValue(item.raw.type_value).value
              }}
            </v-chip>
          </template>
          <template #item.code="{item}">
            <div>
              <v-text-field
                  @focus="$event.target.select()"
                  class="m-code text-blue-grey-darken-1 font-weight-bold"
                  v-model="item.raw.code"
                  variant="outlined"
                  density="compact"
                  readonly
                  hide-details
                  color="red-darken-2"
                  append-inner-icon="mdi-content-copy"
                  @click:appendInner="() => copyText(item.raw.code)"
              ></v-text-field>
            </div>
          </template>
          <template #item.value="{ item }">

            {{ customValue(item.raw) }}
          </template>
          <template #item.status="{ item }">
            <v-switch
                :model-value="item.raw.status==='active'||false"
                @change="changeStatus(item.raw.id)"
                density="compact"
                color="light-blue-lighten-3"
                class="d-flex justify-center"
            ></v-switch>
          </template>
          <template #item.actions="{ item }">
            <v-btn variant="text" density="compact" icon="mdi-text-box-edit-outline" color="grey-darken-1"
                   @click="openForm(item.index)"></v-btn>
            <v-btn variant="text" v-if="(item.raw.status!=='active')" density="compact" icon="mdi-delete-empty"
                   color="grey-darken-1"
                   @click="deleteCoupon(item.raw.id)"></v-btn>
          </template>

          <template #bottom>
            <v-divider/>
            <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
              <p class="text-sm text-disabled mb-0">
                {{ paginationMeta(options, totalData) }}
              </p>

              <v-pagination
                  color="red-darken-2"
                  v-model="options.page"
                  :length="totalPage"
                  :total-visible="$vuetify.display.xs ? 1 : Math.ceil(totalData / options.itemsPerPage)"
              >
              </v-pagination>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog
      v-model="formOpen"
      persistent
      max-width="650"
  >
    <v-card>
      <template #append>
        <v-btn density="compact" icon="mdi-close" color="red-darken-2" @click="formOpen = !formOpen"></v-btn>
      </template>
      <v-card-title>
        <span class="text-h5 font-weight-bold">{{
            formId ? "Sửa thông tin mã giảm giá" : "Tạo mới mã giảm giá"
          }}</span>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="formId?onUpdate(formId):onSubmit()" ref="dataForm" validate-on="lazy blur">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="formName"
                              :rules="[(value) =>!!value || 'Dữ liệu không được để trống.',rule_name_utf8]"
                              density="compact"
                              label="Tên mã"
                              prepend-inner-icon="mdi-text-short"
                              variant="outlined"
                              autocomplete="off">
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="formCode"
                              :rules="[rule_coupon]" density="compact"
                              label="Mã giảm giá"
                              prepend-inner-icon="mdi-ticket-percent-outline"
                              variant="outlined"
                              autocomplete="off">
                  <template v-slot:append-inner>
                    <v-btn
                        class="mx-3"
                        color="red-darken-2"
                        rounded="2"
                        density="compact"
                        @click="generateCoupon()"
                    >
                      <v-icon icon="mdi-auto-fix"></v-icon>
                    </v-btn>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4" v-for="item in typeCoupon">
                <v-radio-group
                    v-model="formTypeCoupon"
                    color="red-darken-3"
                    :rules="[ruleTypeCoupon]"
                >
                  <v-label class="m-pointer d-flex flex-column pa-2 m-box"
                           :class="formTypeCoupon === item.value ? 'active' : ''">
                    <v-icon :icon="item.icon" size="35"></v-icon>
                    <h5 class="text-red-darken-3 m-text">{{ item.name }}</h5>
                    <p class="text-body-2 m-text">{{ item.text }}</p>
                    <v-radio :value="item.value"></v-radio>
                  </v-label>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row v-if="formTypeCoupon">
              <v-col cols="6" md="4">
                <v-select
                    density="compact"
                    v-model="formTypeValue"
                    :rules="[(value) =>!!value || 'Dữ liệu bắt buộc']"
                    label="Loại"
                    :items="typeValue"
                    item-title="name"
                    item-value="value"
                    variant="outlined"
                    color="red-accent-2"
                    autocomplete="off"
                />
              </v-col>
              <v-col cols="6" md="8">
                <v-text-field v-model="formValue"
                              :rules="[(value) =>!!value || 'Dữ liệu bắt buộc']"
                              density="compact"
                              label="Giá trị"
                              prepend-inner-icon="mdi-sale"
                              variant="outlined"
                              autocomplete="off"
                              :disabled="formTypeValue==='free_shipping'"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" v-if="formTypeCoupon==='onproduct'">
                <v-autocomplete
                    v-model="formSelectProduct"
                    v-model:search="formSearchProduct"
                    :items="formProductList"
                    density="compact"
                    item-title="name"
                    item-value="id"
                    chips
                    label="Sản phẩm"
                    multiple
                    clearable
                    closable-chips
                    variant="outlined"
                    autocomplete="off"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                    color="red-accent-2"
                    v-model="formDateStart"
                    label="Ngày bắt đầu"
                    density="compact"
                    variant="outlined"
                    type="date"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                    color="red-accent-2"
                    v-model="formDateEnd"
                    label="Ngày kết thúc"
                    density="compact"
                    variant="outlined"
                    type="date"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="formLimitTime"
                              :rules="[(value) => /^(undefined|null||\d*[0-9]\d*)$/.test(value) || 'Dữ liệu không đúng']"
                              density="compact"
                              label="Số lần sử dụng"
                              prepend-inner-icon="mdi-timer-check-outline"
                              variant="outlined"
                              persistent-hint
                              hint="Để trống nếu không giới hạn."
                              autocomplete="off">
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                    density="compact"
                    v-model="formStatus"
                    label="Trạng thái"
                    :items="couponStatus"
                    item-title="name"
                    item-value="value"
                    clearable
                    variant="outlined"
                    color="red-accent-2"
                    aria-autocomplete="none"
                />
              </v-col>
            </v-row>
            <v-btn
                color="red-darken-2"
                rounded="2"
                density="compact"
                @click="addRequest = !addRequest"
            >
              Thêm Yêu Cầu Tuỳ Chỉnh
            </v-btn>
            <v-row v-if="addRequest">
              <v-col cols="12" class="m-box active">
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="5">
                      <v-chip
                          color="red-darken-2"
                          class="my-2"
                          label
                      >
                        Đơn hàng tối thiểu:
                      </v-chip>
                    </v-col>
                    <v-col cols="12" sm="7">
                      <v-text-field v-model="formMinCart"
                                    density="compact"
                                    label="Giá trị"
                                    :rules="[(value) => /^(undefined|null||\d*[1-9]\d*)$/.test(value) || 'Dữ liệu không đúng']"
                                    prepend-inner-icon="mdi-cash"
                                    variant="outlined"
                                    autocomplete="off"
                                    persistent-hint
                                    hint="Giá trị tối thiểu của giỏ hàng để áp mã"
                      >
                      </v-text-field>
                    </v-col>
                    <v-divider/>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="5">
                      <v-chip
                          color="red-darken-2"
                          class="my-2"
                          label
                      >
                        Mức giảm giá tối đa:
                      </v-chip>
                    </v-col>
                    <v-col cols="12" sm="7">
                      <v-text-field v-model="formMaxValue"
                                    density="compact"
                                    label="Giá trị"
                                    :rules="[(value) => /^(undefined|null||\d*[1-9]\d*)$/.test(value) || 'Dữ liệu không đúng']"
                                    prepend-inner-icon="mdi-cash"
                                    variant="outlined"
                                    autocomplete="off"
                                    persistent-hint
                                    hint="Giá trị giảm giá tối đa trên đơn hàng"
                      >
                      </v-text-field>
                    </v-col>
                    <v-divider/>
                  </v-row>
                  <v-row v-if="formTypeCoupon==='onproduct'">
                    <v-col cols="12" sm="5">
                      <v-chip
                          color="red-darken-2"
                          class="my-2"
                          label
                      >
                        Số lượng sản phẩm:
                      </v-chip>
                    </v-col>
                    <v-col cols="12" sm="7" class="d-flex">
                      <v-text-field v-model="formMinQ"
                                    density="compact"
                                    label="Tối thiểu"
                                    :rules="[(value) => /^(undefined|null||\d*[1-9]\d*)$/.test(value) || 'Dữ liệu không đúng']"
                                    prepend-inner-icon="mdi-cart-arrow-up"
                                    variant="outlined"
                                    autocomplete="off"
                                    class="me-1"
                      >
                      </v-text-field>
                      <v-text-field v-model="formMaxQ"
                                    density="compact"
                                    label="Tối đa"
                                    :rules="[(value) => /^(undefined|null||\d*[1-9]\d*)$/.test(value) || 'Dữ liệu không đúng']"
                                    prepend-inner-icon="mdi-cart-arrow-down"
                                    variant="outlined"
                                    autocomplete="off"
                                    class="ms-1"
                      >
                      </v-text-field>
                    </v-col>
                    <v-divider/>
                  </v-row>
                  <v-row v-if="!(formForRole)">
                    <v-col cols="12" sm="5">
                      <v-chip
                          color="red-darken-2"
                          class="my-2"
                          label
                      >

                        Áp dụng theo tài khoản:
                      </v-chip>
                    </v-col>
                    <v-col cols="12" sm="7">
                      <v-autocomplete
                          v-model="formForUser"
                          v-model:search="formSearchUser"
                          :items="userQueryLists"
                          item-title="email"
                          item-value="email"
                          label="Tài khoản"
                          color="red-darken-2"
                          variant="outlined"
                          autocomplete="off"
                          persistent-hint
                          density="compact"
                          chips
                          clearable
                          hint="Tìm tài khoản theo email"
                      >
                      </v-autocomplete>
                    </v-col>
                    <v-divider/>
                  </v-row>
                  <v-row v-if="!(formForUser)">
                    <v-col cols="12" sm="5">
                      <v-chip
                          color="red-darken-2"
                          class="my-2"
                          label
                      >
                        Áp dụng theo vai trò:
                      </v-chip>
                    </v-col>
                    <v-col cols="12" sm="7">
                      <v-select
                          density="compact"
                          v-model="formForRole"
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
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
          <v-btn block="" class="mb-8" color="red-accent-4" size="large" type="submit">
            {{ formId ? "Cập Nhật" : "Tạo mới" }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {useRoute} from "vue-router";
import {useSeoMeta} from "@unhead/vue";
import {computed, onMounted, ref, watch, watchEffect} from "vue";
import {rule_name_utf8, rule_coupon, ruleTypeCoupon} from "@/validators";
import axios from "../../axiosComfig";
import {siteData} from "@/stores/globals";


const siteStore = siteData();
const route = useRoute();
const addRequest = ref(false);
const searchQuery = ref("");
const selectedType = ref();
const selectedStatus = ref();
const selectDateStart = ref();
const selectDateEnd = ref();
const userQueryLists = ref([]);
const formOpen = ref(false);
const dataForm = ref();
const formId = ref();
const formName = ref();
const formCode = ref();
const formTypeCoupon = ref("");
const formValue = ref();
const formTypeValue = ref();
const formLimitTime = ref();
const formDateStart = ref();
const formDateEnd = ref();
const formStatus = ref();
const formSelectProduct = ref();
const formProductList = ref([]);
const formForUser = ref();
const formForRole = ref();
const formMinQ = ref();
const formMaxQ = ref();
const formMinCart = ref();
const formMaxValue = ref();
const formSearchUser = ref();
const formSearchProduct = ref();
const roles = ref();
const coupons = ref([]);

const options = ref({
  page: 1,
  itemsPerPage: 10,
});
const formCouponRequests = computed(() => {
  let result = {};
  if (formForUser.value) {
    result.forUser = formForUser.value;
  }
  if (formForRole.value) {
    result.forRole = formForRole.value;
  }
  if (formMinQ.value) {
    result.MinQ = formMinQ.value;
  }
  if (formMaxQ.value) {
    result.MaxQ = formMaxQ.value;
  }
  if (formMinCart.value) {
    result.MinCart = formMinCart.value;
  }
  if (formMaxValue.value) {
    result.MaxValue = formMaxValue.value;
  }
  return Object.keys(result).length === 0 ? null : result;
});
const totalData = computed(() => {
  return coupons.value.length;
});
const totalPage = computed(() => {
  return Math.ceil(totalData.value / options.value.itemsPerPage) || 1;
});
const paginationMeta = computed(() => {
  return (options, total) => {
    const start = (options.page - 1) * options.itemsPerPage + 1;
    const end = Math.min(options.page * options.itemsPerPage, total);

    return `Đang hiển thị từ ${start} đến ${end} trên tổng ${total} dữ liệu.`;
  };
});
const typeValue = computed(() => {
  if (formTypeCoupon.value) {
    switch (formTypeCoupon.value.toLowerCase()) {
      case "shipping":
        return [{
          name: "Giảm tiền",
          value: "reduce_shipping",
        },
          {
            name: "Free shipping",
            value: "free_shipping",
          }];
      case "totalcart":
        return [{
          name: "Số tiền",
          value: "number_value",
        },
          {
            name: "Phần trăm",
            value: "percent_value",
          }];
      case "onproduct":
        return [{
          name: "Số tiền",
          value: "number_value",
        },
          {
            name: "Phần trăm",
            value: "percent_value",
          }];
      default:
        return [];
    }
  } else {
    return [];
  }
});
const headers = [
  {
    title: "#",
    key: "index",
    sortable: false,
  },
  {
    title: "Tên",
    key: "type_coupon",
  },
  {
    title: "Phương thức",
    key: "type_value",
  },
  {
    title: "Code",
    key: "code",
    sortable: false,
  },
  {
    title: "Giá trị",
    key: "value",
    sortable: false,
  },
  {
    title: "Trạng thái",
    key: "status",
    align: "center",
    sortable: false,
  },
  {
    title: "Chức năng",
    key: "actions",
    align: "start",
    sortable: false,
  },
];
const typeCoupon = [
  {
    icon: "mdi-truck-delivery-outline",
    name: "Giảm giá vận chuyển",
    text: "Giảm giá tính vào cước vận chuyển",
    value: "shipping"
  },
  {
    icon: "mdi-cart-percent",
    name: "Theo tổng đơn hàng",
    text: "Giảm giá tính vào tổng đơn hàng",
    value: "totalcart"
  },
  {
    icon: "mdi-package-variant-closed-check",
    name: "Theo sản phẩm",
    text: "Giảm giá tính theo từng sản phẩm",
    value: "onproduct"
  },
];
const couponStatus = [
  {
    name: "Kích hoạt",
    value: "active"
  },
  {
    name: "Vô hiệu",
    value: "disable"
  }
];
// Watch
let debounceTimer = null;
watch(formSearchUser, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fetchUserList();
  }, 1000);
});
watch(()=>formSearchProduct.value,()=>{
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fetchProductList();
  }, 1000);
})
watch(formTypeCoupon, () => formTypeValue.value = null);
watchEffect(() => formTypeValue.value === "free_shipping" ? formValue.value = 999 : formValue.value = "");

// Functions
const copyText = (text) => {
  navigator.clipboard.writeText(text);
  siteStore.hasRes({data: {status: "ok", message: "Đã copy mã coupon!"}});
};
const formatValue = (value) => {
  return parseFloat(value).toLocaleString("vi-VN", {"style": "currency", "currency": "VND"});
};
const customValue = (value) => {
  switch (value.type_value.toLowerCase()) {
    case "free_shipping":
      return "Free";
    case "reduce_shipping":
    case "number_value":
      return formatValue(value.value.split("|")[0]);
    default:
      return value.value.split("|")[0] + "%";
  }
};
const customTypeValue = (value) => {
  switch (value.toLowerCase()) {
    case "free_shipping":
      return {
        color: "red-darken-2",
        value: "Miễn phí giao hàng"
      };
    case "reduce_shipping":
      return {
        color: "orange-darken-2",
        value: "Giảm phí giao hàng"
      };
    case "number_value":
      return {
        color: "blue-darken-2",
        value: "Giảm theo số tiền"
      };
    default:
      return {
        color: "green-darken-2",
        value: "Giảm theo phần trăm"
      };
  }
};
const customType = (value) => {
  switch (value.toLowerCase()) {
    case "shipping":
      return {
        color: "orange-darken-2",
        icon: "mdi-truck-delivery-outline",
      };
    case "totalcart":
      return {
        color: "red-darken-2",
        icon: "mdi-cart-percent"
      };
    case "onproduct":
      return {
        color: "green-darken-2",
        icon: "mdi-package-variant-closed-check"
      };
    default:
      return {
        color: "blue-grey-darken-4",
        icon: "mdi-skull-scan"
      };
  }
};
const changeStatus = async (id) => {
  try {
    siteStore.isLoading = true;
    let res = await axios.put(`/changeStatusCoupon/${id}`);
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    await fetchCouponList();
    siteStore.isLoading = false;
  }
};
const fetchProductList = async () => {
  if (String(formSearchProduct.value).length >= 3) {
    siteStore.isLoading = true;
    try {
      const res = await axios.get(`products/name/${formSearchProduct.value}`);
     formProductList.value = res.data.data;
    } catch (e) {
      siteStore.errorSystem();
      console.log(e);
    } finally {
      siteStore.isLoading = false;
    }
  }
};
const fetchUserList = async () => {
  if (String(formSearchUser.value).length >= 3) {
    siteStore.isLoading = true;
    try {
      const res = await axios.post("/searchUsers", {
        query: formSearchUser.value
      });
      userQueryLists.value = res.data;
    } catch (e) {
      siteStore.errorSystem();
      console.log(e);
    } finally {
      siteStore.isLoading = false;
    }
  }
};
const fetchCouponList = async (q, ds, de, t, s) => {
  siteStore.isLoading = true;
  const queryString = q ? q.toLowerCase() : "";
  const queryDateStart = ds || "";
  const queryDateEnd = de || "";
  const queryType = t ? t.toLowerCase() : "";
  const queryStatus = s ? s.toLowerCase() : "";
  try {
    const res = await axios.get("getListCoupon");
    coupons.value = res.data.filter(data => (
        (data.name.toLowerCase().includes(queryString) || data.code.toLowerCase().includes(queryString)) &&
        (!queryDateStart || data.date_start >= queryDateStart || !data.date_start) &&
        (!queryDateEnd || data.date_end <= queryDateEnd || !data.date_end) &&
        (!queryType || data.type_coupon.toLowerCase() === queryType) &&
        (!queryStatus || data.status.toLowerCase() === queryStatus)
    )).reverse();
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};
const fetchRoleList = async () => {
  siteStore.isLoading = true;
  try {
    const res = await axios.get("listRoles");
    roles.value = res.data;
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};
const openForm = (index) => {
  addRequest.value = false;
  formOpen.value = true;
  if (typeof index !== "undefined") {
    // console.log("run with" + index);
    formId.value = coupons.value[index].id;
    formName.value = coupons.value[index].name;
    formCode.value = coupons.value[index].code;
    formTypeCoupon.value = coupons.value[index].type_coupon;
    formDateStart.value = coupons.value[index].date_start;
    formDateEnd.value = coupons.value[index].date_end;
    formSelectProduct.value = coupons.value[index].value.split("|")[1];
    formLimitTime.value = coupons.value[index].limit_time;
    formStatus.value = coupons.value[index].status;
    setTimeout(() => formTypeValue.value = coupons.value[index].type_value, 1);
    setTimeout(() => formValue.value = coupons.value[index].value.split("|")[0], 2);
    if (coupons.value[index].coupon_requests) {
      console.log(!!coupons.value[index].coupon_requests)
      addRequest.value = true;
      setTimeout(() => {
        formForUser.value = JSON.parse(coupons.value[index].coupon_requests).forUser || null;
        formForRole.value = JSON.parse(coupons.value[index].coupon_requests).forRole || null;
        formMinQ.value = JSON.parse(coupons.value[index].coupon_requests).MinQ || null;
        formMaxQ.value = JSON.parse(coupons.value[index].coupon_requests).MaxQ || null;
        formMinCart.value = JSON.parse(coupons.value[index].coupon_requests).MinCart || null;
        formMaxValue.value = JSON.parse(coupons.value[index].coupon_requests).MaxValue || null;
      }, 3);
    }
  } else {
    // console.log("run no index");
    formId.value = null;
    formName.value = null;
    formCode.value = null;
    formTypeCoupon.value = null;
    formValue.value = null;
    formTypeValue.value = null;
    formDateStart.value = null;
    formDateEnd.value = null;
    formLimitTime.value = null;
    formSelectProduct.value = null;
    formStatus.value = null;
    formForUser.value = null;
    formForRole.value = null;
    formMinQ.value = null;
    formMaxQ.value = null;
    formMinCart.value = null;
    formMaxValue.value = null;
  }
};
const generateCoupon = async () => {

  siteStore.isLoading = true;
  try {
    const res = await axios.get("generateUniqueCode");
    formCode.value = res.data;
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};
const createCoupon = async () => {
  try {
    siteStore.isLoading = true;
    let res = await axios.post("createCoupon", {
      name: formName.value,
      code: formCode.value,
      type_coupon: formTypeCoupon.value,
      value: formValue.value,
      products_id: formSelectProduct.value,
      type_value: formTypeValue.value,
      date_start: formDateStart.value,
      date_end: formDateEnd.value,
      limit_time: formLimitTime.value,
      status: formStatus.value,
      coupon_requests: formCouponRequests.value,
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};
const updateCoupon = async (id) => {
  try {
    siteStore.isLoading = true;
    let res = await axios.put(`/updateCoupon/${id}`, {
      name: formName.value,
      code: formCode.value,
      type_coupon: formTypeCoupon.value,
      value: formValue.value,
      products_id: formSelectProduct.value,
      type_value: formTypeValue.value,
      date_start: formDateStart.value,
      date_end: formDateEnd.value,
      limit_time: formLimitTime.value,
      status: formStatus.value,
      coupon_requests: formCouponRequests.value,
    });
    siteStore.hasRes(res);
  } catch (e) {
    siteStore.errorSystem();
    console.log(e);
  } finally {
    siteStore.isLoading = false;
  }
};
const deleteCoupon = async (id) => {
  if (confirm("Are you sure?")) {
    siteStore.isLoading = true;
    try {
      const res = await axios.post("/deleteCoupon", {
        coupon_id: id
      });
      await fetchCouponList(searchQuery.value, selectDateStart.value, selectDateEnd.value, selectedType.value, selectedStatus.value);
      siteStore.hasRes(res);
    } catch (e) {
      siteStore.errorSystem();
      console.log(e);
    } finally {
      siteStore.isLoading = false;
    }
  }
};
const onSubmit = () => {
  dataForm.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      createCoupon();
      formOpen.value = false;
    }
    fetchCouponList();
  });
};
const onUpdate = (id) => {
  dataForm.value?.validate().then(({valid: isValid}) => {
    if (isValid) {
      updateCoupon(id);
      formOpen.value = false;
    }
    fetchCouponList(searchQuery.value, selectDateStart.value, selectDateEnd.value, selectedType.value, selectedStatus.value);
  });
};
// onMounted
onMounted(() => {
  fetchCouponList();
  fetchRoleList();
});
watchEffect(() => {
  fetchCouponList(searchQuery.value, selectDateStart.value, selectDateEnd.value, selectedType.value, selectedStatus.value);
});

siteStore.titleNow = "Coupons Management";
useSeoMeta({
  title: siteStore.titleNow,
});
</script>

<style>
.m-text {
  white-space: normal;
  text-align: center;
}

.m-box {
  border: 1px solid #cccccc;
  border-radius: 5px;
}

.active {
  border-color: #dc3545 !important;
}

.m-title {
  white-space: nowrap;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.m-code {
  min-width: 250px;
  background: #fcfcfc;
}

.m-code input {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>