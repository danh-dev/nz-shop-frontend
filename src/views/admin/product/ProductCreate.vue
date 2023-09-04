<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import axios from "axios";
import { mapKeys, camelCase } from "lodash";
import useCategoryStore from "@/stores/category";

import ContentEditor from "@/components/globals/ContentEditor.vue";
import ProductCard from "@/components/globals/ProductCard.vue";
import CropImageModal from "@/components/globals/CropImageModal.vue";
import { siteData } from "@/stores/globals.js";
const siteStore = siteData();

const url = import.meta.env.VITE_PUBLIC_URL;
const router = useRouter();

const categoryStore = useCategoryStore();

const mainForm = ref({
  category: {
    value: null,
  },
  sku: {
    value: "",
    errorMessages: "",
  },
  name: {
    value: "",
    errorMessages: "",
  },
  image: {
    value: {
      file: [],
      imageUrl: "",
      height: "",
      width: "",
      left: "",
      top: "",
    },
    errorMessages: "",
  },
  gallery: {
    value: [],
    errorMessages: "",
  },
  description: {
    value: "",
    errorMessages: "",
  },
  multiVariant: {
    value: false,
    errorMessages: "",
  },
  quantity: {
    value: "",
    errorMessages: "",
  },
  originPrice: {
    value: "",
    errorMessages: "",
  },
  sellPrice: {
    value: "",
    errorMessages: "",
  },
  discountPrice: {
    value: "",
    errorMessages: "",
  },
  startDate: {
    value: "",
    errorMessages: "",
  },
  endDate: {
    value: "",
    errorMessages: "",
  },
});

const variantFields = ref([]);

const previewProduct = computed(() => ({
  name: mainForm.value.name.value,
  sellPrice: mainForm.value.sellPrice.value,
  discountPrice: mainForm.value.sellPrice.value,
}));

const submit = async () => {
  const formData = new FormData();

  if (mainForm.value.category.value) {
    formData.append("categoryId", mainForm.value.category.value);
  }
  formData.append("name", mainForm.value.name.value);
  formData.append("sku", mainForm.value.sku.value.toUpperCase());

  formData.append("quantity", mainForm.value.quantity.value);

  formData.append("origin_price", mainForm.value.originPrice.value);
  formData.append("sell_price", mainForm.value.sellPrice.value);
  if (mainForm.value.discountPrice.value) {
    formData.append("discount_price", mainForm.value.discountPrice.value);
    if (mainForm.value.startDate.value) {
      formData.append("start_date", mainForm.value.startDate.value);
    }
    if (mainForm.value.endDate.value) {
      formData.append("end_date", mainForm.value.endDate.value);
    }
  }

  if (mainForm.value.image.value.file.length > 0) {
    formData.append("image", mainForm.value.image.value.file[0]);
    formData.append("height", mainForm.value.image.value.height);
    formData.append("width", mainForm.value.image.value.width);
    formData.append("left", mainForm.value.image.value.left);
    formData.append("top", mainForm.value.image.value.top);
  }

  if (mainForm.value.gallery.value.length > 0) {
    for (const item of mainForm.value.gallery.value) {
      formData.append("gallery[]", item);
    }
  }
  formData.append("description", mainForm.value.description.value);

  if (mainForm.value.multiVariant.value) {
    if (variants.value.length > 0) {
      const temp = variants.value.map(item => {
        const copy = { ...item };
        copy.originPrice = copy.originPrice.value;
        copy.quantity = copy.quantity.value;
        copy.sellPrice = copy.sellPrice.value;
        copy.discountPrice = copy.discountPrice.value;
        copy.startDate = copy.startDate.value;
        copy.endDate = copy.endDate.value;
        return copy;
      });
      formData.append("variants", JSON.stringify(temp));
      sendFormData(formData);
    }
    else {
      mainForm.value.multiVariant.errorMessages = "Chưa có biến thể được tạo!";
    }
  }
  else {
    sendFormData(formData);
  }
};

const sendFormData = async formData => {
  try {
    siteStore.hasLoading();
    const res = await axios.post("products", formData);
    if (res.status === 201) {
      // mainForm.value.name.value = "";
      // mainForm.value.image.value.file = [];
      // mainForm.value.gallery.value = [];
      // mainForm.value.description.value = "";
      // mainForm.value.multiVariant.value = false;
      // mainForm.value.category.value = null;

      // mainForm.value.sku.value = "";
      // mainForm.value.quantity.value = "";
      // mainForm.value.originPrice.value = "";
      // mainForm.value.sellPrice.value = "";
      // mainForm.value.discountPrice.value = "";

      // variants.value = [];
      // variantFields.value = [];
      // previewImage.value = null;
      siteStore.hasRes(res);
      router.push({
        name: "admin-product",
      });

    }
  }
  catch ({ response }) {
    if (response.status === 400) {
      const errorMessages = Object.entries(mapKeys(response.data.errors, (_, key) => camelCase(key)));
      for (const [key, value] of errorMessages) {
        if (key !== "variants") {
          mainForm.value[key].errorMessages = value;
        }
        else {
          value.forEach((item, index) => {
            for (const key of Object.keys(mapKeys(item, (_, key) => camelCase(key)))) {
              variants.value[index][key].errorMessages = item[key];
            }
          });
        }
      }
      siteStore.hasRes(response);
    }
    else {
      // push
      console.log(response.data);
    }
  }
  finally {
    siteStore.doneLoading();
  }
};

const handleInput = input => {
  input.errorMessages = "";
};

const editContent = (event) => {
  mainForm.value.description.value = event;
  // handleInput(mainForm.value.description);
};

const previewImage = ref(null);
const dialog = ref(false);

const hideDialog = () => {
  dialog.value = false;
};

const getImageUrl = (file) => {
  return URL.createObjectURL(file);
};

const crop = () => {
  previewImage.value = null;
  previewImage.value = mainForm.value.image.value.imageUrl;
  hideDialog();
};

const getUploadedImage = (e) => {
  mainForm.value.image.value.file = e;

  if (e.length === 0) {
    changeCropper();
  }
};

const changeCropper = (event) => {
  if (event) {
    mainForm.value.image.value.imageUrl = event.canvas.toDataURL();
    mainForm.value.image.value.height = event.coordinates.height;
    mainForm.value.image.value.width = event.coordinates.width;
    mainForm.value.image.value.left = event.coordinates.left;
    mainForm.value.image.value.top = event.coordinates.top;
  }
  else {
    mainForm.value.image.value.imageUrl = "";
    mainForm.value.image.value.height = "";
    mainForm.value.image.value.width = "";
    mainForm.value.image.value.left = "";
    mainForm.value.image.value.top = "";
  }
};

//
const variants = ref([]);

const addCreate = () => {
  variantFields.value.push({
    name: {
      value: "",
      errorMessages: "",
    },
    values: {
      value: [],
      errorMessages: "",
    }
  });
};

function generateCombinations(array) {
  const result = [];

  const firstProperty = array[0].name.value;
  const firstValues = array[0].values.value;
  if (!firstProperty) {
    array[0].name.errorMessages = "Không được để trống!";
  }
  if (firstValues.length === 0) {
    array[0].values.errorMessages = "Không được để trống!";
  }
  if (array.length === 1) {
    if (firstProperty) {
      for (const value of firstValues) {
        result.push({
          name: [`${firstProperty}: ${value}`],
          quantity: {
            value: "",
            errorMessages: "",
          },
          originPrice: {
            value: "",
            errorMessages: "",
          },
          sellPrice: {
            value: "",
            errorMessages: "",
          },
          discountPrice: {
            value: "",
            errorMessages: "",
          },
          startDate: {
            value: "",
            errorMessages: "",
          },
          endDate: {
            value: "",
            errorMessages: "",
          },
        });
      }
    }
  }
  else {
    const remainingArray = array.slice(1);
    const combinations = generateCombinations(remainingArray);
    if (firstProperty) {
      for (const value of firstValues) {
        for (const combination of combinations) {
          result.push({
            name: [`${firstProperty}:${value}`, ...combination.name],
            quantity: {
              value: "",
              errorMessages: "",
            },
            originPrice: {
              value: "",
              errorMessages: "",
            },
            sellPrice: {
              value: "",
              errorMessages: "",
            },
            discountPrice: {
              value: "",
              errorMessages: "",
            },
            startDate: {
              value: "",
              errorMessages: "",
            },
            endDate: {
              value: "",
              errorMessages: "",
            },
          });
        }
      }
    }

  }

  return result;
}

const addOneMore = () => {
  variants.value.push(
    {
      name: [],
      quantity: {
        value: "",
        errorMessages: "",
      },
      originPrice: {
        value: "",
        errorMessages: "",
      },
      sellPrice: {
        value: "",
        errorMessages: "",
      },
      discountPrice: {
        value: "",
        errorMessages: "",
      },
      startDate: {
        value: "",
        errorMessages: "",
      },
      endDate: {
        value: "",
        errorMessages: "",
      },

    });
};

const createAllVariants = () => {
  variants.value = generateCombinations(variantFields.value);
};

const generateSku = async () => {
  try {
    const res = await axios.get("sku");
    if (res.status === 200) {
      mainForm.value.sku.value = res.data.data;
    }
  }
  catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <v-container class="m-card my-3">
    <v-form
      validate-on="submit lazy"
      @submit.prevent="submit"
    >
      <v-row>
        <v-col cols="12">
          <h1>Sản phẩm mới</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3">
          <v-autocomplete
            color="red-accent-4"
            density="compact"
            placeholder="Nhập để tìm kiếm"
            v-model="mainForm.category.value"
            :items="categoryStore.categories"
            item-title="name"
            item-value="id"
            label="Danh mục"
            variant="outlined"
            prepend-inner-icon="mdi-list-box-outline"
            hide-no-data
            hint="Không bắt buộc"
            persistent-hint
            clearable
          ></v-autocomplete>
        </v-col>
        <v-col cols="9">
          <v-text-field
            color="red-accent-4"
            density="compact"
            v-model="mainForm.name.value"
            label="Tên sản phẩm"
            :error-messages="mainForm.name.errorMessages"
            variant="outlined"
            @update:model-value="() => handleInput(mainForm.name)"
          ></v-text-field>
        </v-col>

      </v-row>

      <CropImageModal
        :dialog="dialog"
        @crop="crop"
        @getUploadedImage="getUploadedImage"
        :imageUrl="mainForm.image.value.file.length > 0 ? getImageUrl(mainForm.image.value.file[0]) : ''"
        @changeCropper="changeCropper"
        :file="mainForm.image.value.file"
        @hideDialog="hideDialog"
      ></CropImageModal>

      <v-row>
        <v-col
          cols="8"
          class="d-flex flex-column justify-space-around"
        >
          <v-row class="flex-0-1">
            <v-col cols="6">
              <v-text-field
                color="red-accent-4"
                density="compact"
                v-model="mainForm.sku.value"
                label="Mã sản phẩm"
                :error-messages="mainForm.sku.errorMessages"
                variant="outlined"
                @update:model-value="() => handleInput(mainForm.sku)"
              >
                <template #append-inner>
                  <v-btn
                    class="mx-3"
                    color="red-darken-2"
                    rounded="2"
                    density="compact"
                    @click="generateSku"
                  >
                    <v-icon icon="mdi-auto-fix"></v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                type="number"
                color="red-accent-4"
                density="compact"
                v-model="mainForm.quantity.value"
                label="Số lượng"
                :error-messages="mainForm.quantity.errorMessages"
                variant="outlined"
                @update:model-value="() => handleInput(mainForm.quantity)"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="flex-0-1">
            <v-col cols="4">
              <v-text-field
                type="number"
                color="red-accent-4"
                density="compact"
                v-model="mainForm.originPrice.value"
                label="Giá gốc"
                :error-messages="mainForm.originPrice.errorMessages"
                variant="outlined"
                @update:model-value="() => handleInput(mainForm.originPrice)"
                prepend-inner-icon="mdi-cash"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                type="number"
                color="red-accent-4"
                density="compact"
                v-model="mainForm.sellPrice.value"
                label="Giá bán"
                :error-messages="mainForm.sellPrice.errorMessages"
                variant="outlined"
                @update:model-value="() => handleInput(mainForm.sellPrice)"
                prepend-inner-icon="mdi-cash"
              ></v-text-field>

            </v-col>
            <v-col cols="4">
              <v-text-field
                type="number"
                color="red-accent-4"
                density="compact"
                v-model="mainForm.discountPrice.value"
                label="Giá khuyến mãi"
                :error-messages="mainForm.discountPrice.errorMessages"
                variant="outlined"
                @update:model-value="() => handleInput(mainForm.discountPrice)"
                prepend-inner-icon="mdi-cash"
                hint="Không bắt buộc"
                persistent-hint
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="flex-0-1">
            <v-col cols="6">
              <v-text-field
                color="red-accent-4"
                density="compact"
                type="date"
                v-model="mainForm.startDate.value"
                label="Ngày bắt đầu"
                :error-messages="mainForm.startDate.errorMessages"
                variant="outlined"
                @update:model-value="() => handleInput(mainForm.startDate)"
                :disabled="!mainForm.discountPrice.value"
                hint="Không bắt buộc"
                persistent-hint
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                color="red-accent-4"
                density="compact"
                type="date"
                v-model="mainForm.endDate.value"
                label="Ngày kết thúc"
                :error-messages="mainForm.endDate.errorMessages"
                variant="outlined"
                @update:model-value="() => handleInput(mainForm.endDate)"
                :disabled="!mainForm.discountPrice.value"
                hint="Không bắt buộc"
                persistent-hint
              ></v-text-field>
            </v-col>

          </v-row>
        </v-col>
        <v-col cols="4">
          <ProductCard
            :product="previewProduct"
            v-ripple="false"
            max-width="260"
            class="mx-auto"
            style="cursor: auto"
          >
            <template #image="{ maxWidth, height }">
              <v-img
                v-if="previewImage"
                style="cursor: pointer;"
                class="rounded-sm overflow-hidden mx-auto"
                :max-width="maxWidth"
                :src="previewImage"
                @click="dialog = true;"
              />
              <v-img
                v-else
                style="cursor: pointer;"
                :max-width="maxWidth"
                :height="height"
                class="rounded-sm overflow-hidden mx-auto"
                @click="() => { dialog = true; }"
                src="https://cdn.vectorstock.com/i/preview-1x/65/30/default-image-icon-missing-picture-page-vector-40546530.jpg"
              />
            </template>
          </ProductCard>

        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-file-input
            color="red-accent-4"
            density="compact"
            v-model="mainForm.gallery.value"
            label="Hình ảnh trưng bày"
            :error-messages="mainForm.gallery.errorMessages"
            prepend-icon=""
            prepend-inner-icon="mdi-image-multiple-outline"
            variant="outlined"
            show-size
            multiple
            counter
            @update:model-value="() => handleInput(mainForm.gallery)"
          >
            <template v-slot:selection="{ fileNames }">
              <template
                v-for="(fileName, index) in fileNames"
                :key="fileName"
              >
                <v-chip
                  v-if="index < 3"
                  color="red-accent-4"
                  label
                  class="me-2"
                  variant="outlined"
                >
                  {{ fileName }}
                </v-chip>

                <span
                  v-else-if="index === 3"
                  class="text-overline text-grey-darken-3 mx-2"
                >
                  +{{ mainForm.gallery.value.length - 3 }} File(s)
                </span>
              </template>
            </template>
          </v-file-input>
        </v-col>
        <v-col
          v-if="mainForm.gallery.value.length"
          cols="12"
          class="d-flex flex-wrap"
        >
          <v-img
            v-for="(file, index) in mainForm.gallery.value"
            :key="index"
            :src="getImageUrl(file)"
            :max-width="80"
            :min-width="80"
            class="ma-2"
            style="position: relative;"
          >
            <v-btn
              color="red-accent-3"
              class="text-white"
              rounded="circle"
              size="15"
              style="position: absolute; right: 0;"
              variant="flat"
              @click="mainForm.gallery.value.splice(index, 1)"
            >
              <v-icon
                icon="mdi-close"
                size="15"
              ></v-icon>
            </v-btn>
          </v-img>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-label>Mô tả</v-label>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <ContentEditor
            :editorContent="mainForm.description.value"
            @editContent="editContent"
          ></ContentEditor>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-switch
            color="red-accent-4"
            label="Đa biến thể"
            v-model="mainForm.multiVariant.value"
            :error-messages="mainForm.multiVariant.errorMessages"
            @update:model-value="() => handleInput(mainForm.multiVariant)"
          >
          </v-switch>
        </v-col>
        <v-col
          cols="8"
          v-if="mainForm.multiVariant.value"
          class="d-flex align-center justify-end"
        >

          <div
            v-if="variants.length
              > 0"
            class="text-red-accent-4"
            style="margin-bottom: 22px"
          >{{ variants.length }} biến thể đã được tạo
          </div>
          <v-btn
            v-else
            @click="addCreate"
            style="margin-bottom: 22px"
          >Thêm
          </v-btn>

        </v-col>
      </v-row>
      <template v-if="mainForm.multiVariant.value">
        <template v-if="variants.length === 0">
          <v-row
            v-for="(variantField, index) in variantFields"
            :key="index"
          >
            <v-col cols="3">
              <v-text-field
                color="red-accent-4"
                density="compact"
                label="Tên thuộc tính"
                v-model="variantField.name.value"
                :error-messages="variantField.name.errorMessages"
                variant="outlined"
                @update:model-value="() => handleInput(variantField.name)"
              ></v-text-field>
            </v-col>
            <v-col cols="9">
              <v-combobox
                color="red-accent-4"
                density="compact"
                label="Các giá trị"
                v-model="variantField.values.value"
                :error-messages="variantField.values.errorMessages"
                append-icon="mdi-close"
                variant="outlined"
                multiple
                @click:append="variantFields.splice(index, 1)"
                @update:model-value="() => handleInput(variantField.values)"
              >
                <template #selection="{ attrs, item, select, selected }">
                  <v-chip
                    color="red-accent-4"
                    v-bind="attrs"
                    :model-value="selected"
                    @click="select"
                    size="small"
                    class="me-1"
                    variant="outlined"
                    label
                  >
                    {{ item.value }}
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                v-if="variantFields.length > 0"
                @click="createAllVariants"
              >
                Tạo các biến thể
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <v-card
            v-for="(variantProduct, index) in variants"
            :key="index"
            class="mb-4"
          >
            <v-container>
              <v-row>
                <v-col cols="11">
                  <v-row>
                    <v-col cols="6">
                      <v-combobox
                        label="Biến thể"
                        variant="outlined"
                        color="red-accent-4"
                        multiple
                        density="compact"
                        v-model="variantProduct.name"
                      >
                        <template #selection="{ attrs, item, select, selected }">
                          <v-chip
                            color="red-accent-4"
                            v-bind="attrs"
                            :model-value="selected"
                            @click="select"
                            size="small"
                            class="me-1"
                            variant="outlined"
                            label
                          >
                            {{ item.value }}
                          </v-chip>
                        </template>
                      </v-combobox>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        color="red-accent-4"
                        label="Mã sản phẩm"
                        :model-value="mainForm.sku.value ? `${mainForm.sku.value}-${index + 1}` : ''"
                        variant="outlined"
                        density="compact"
                        disabled
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        type="number"
                        color="red-accent-4"
                        label="Số lượng"
                        v-model="variantProduct.quantity.value"
                        :error-messages="variantProduct.quantity.errorMessages"
                        variant="outlined"
                        density="compact"
                        @update:model-value="() => handleInput(variantProduct.quantity)"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="11">
                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        type="number"
                        color="red-accent-4"
                        label="Giá gốc"
                        v-model="variantProduct.originPrice.value"
                        :error-messages="variantProduct.originPrice.errorMessages"
                        variant="outlined"
                        density="compact"
                        @update:model-value="() => handleInput(variantProduct.originPrice)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        type="number"
                        color="red-accent-4"
                        label="Giá bán"
                        v-model="variantProduct.sellPrice.value"
                        :error-messages="variantProduct.sellPrice.errorMessages"
                        variant="outlined"
                        density="compact"
                        @update:model-value="() => handleInput(variantProduct.sellPrice)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        type="number"
                        color="red-accent-4"
                        label="Giá khuyến mãi"
                        v-model="variantProduct.discountPrice.value"
                        :error-messages="variantProduct.discountPrice.errorMessages"
                        variant="outlined"
                        density="compact"
                        @update:model-value="() => handleInput(variantProduct.discountPrice)"
                        hint="Không bắt buộc"
                        persistent-hint
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="1"
                  class="d-flex align-center justify-center"
                >
                  <v-btn
                    variant="text"
                    density="compact"
                    icon="mdi-close"
                    color="red-accent-4"
                    style="margin-bottom: 22px"
                    @click="variants.splice(index, 1)"
                  ></v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="11">
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        color="red-accent-4"
                        type="date"
                        label="Ngày bắt đầu"
                        v-model="variantProduct.startDate.value"
                        :error-messages="variantProduct.startDate.errorMessages"
                        variant="outlined"
                        density="compact"
                        :disabled="!variantProduct.discountPrice.value"
                        @update:model-value="() => handleInput(variantProduct.startDate)"
                        hint="Không bắt buộc"
                        persistent-hint
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        color="red-accent-4"
                        type="date"
                        label="Ngày kết thúc"
                        v-model="variantProduct.endDate.value"
                        :error-messages="variantProduct.endDate.errorMessages"
                        variant="outlined"
                        density="compact"
                        :disabled="!variantProduct.discountPrice.value"
                        @update:model-value="() => handleInput(variantProduct.endDate)"
                        hint="Không bắt buộc"
                        persistent-hint
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-btn @click="addOneMore">
            Thêm
          </v-btn>
        </template>

      </template>
      <v-row>
        <v-col cols="12">
          <v-btn
            type="submit"
            class="mt-2 me-2"
          >
            Submit
          </v-btn>
          <v-btn class="mt-2">
            Reset
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

  </v-container>
</template>

<style></style>
