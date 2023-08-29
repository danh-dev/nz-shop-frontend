<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { mapKeys, camelCase } from "lodash";
import useCategoryStore from "@/stores/category";
import useLoadingStore from "@/stores/loading";

import ContentEditor from "@/components/globals/ContentEditor.vue";
import SuccessAlert from "@/components/globals/SuccessAlert.vue";

const url = import.meta.env.VITE_PUBLIC_URL;
const loading = ref(false);

const more = {
  sku: {
    value: "",
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
};

const categoryStore = useCategoryStore();
const loadingStore = useLoadingStore();
const status = ref(false);
const created = ref(false);
const singleVariantTextField = ref(JSON.parse(JSON.stringify(more)));
const multipleVariantTextField = ref([]);
const multipleVariant = ref([]);


const mainForm = ref({
  category: {
    value: null,
  },
  name: {
    value: "",
    errorMessages: "",
  },
  image: {
    value: [],
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
  radio: {
    value: 0,
    errorMessages: "",
  },
});

const variants = ref([]);

// const pushVariant = () => {
//   variants.value.push(
//     {
//       key: {
//         label: "Tên biến thể",
//         value: "",
//         errorMessages: "",
//       },
//       values: {
//         label: "Các giá trị",
//         value: "",
//         placeholder: "Mỗi giá trị cách nhau bằng dấu |",
//         errorMessages: "",
//       }
//     }
//   );
// };

watch(created, () => {
  mainForm.value.radio.errorMessages = "";
});

const pushVariant = () => {
  variants.value.push(
    [
      {
        label: "Tên biến thể",
        value: "",
        errorMessages: "",
      },
      {
        label: "Các giá trị",
        value: "",
        placeholder: "Mỗi giá trị cách nhau bằng dấu |",
        errorMessages: "",
      }
    ]
  );
};

const createVariant = () => {
  // const result = cartesianProduct(
  //   ...variants.value.map((obj) => obj.values.value.split("|"))
  // ).map((arr) =>
  //   Object.fromEntries(
  //     arr.map((val, i) => [variants.value[i].key.value, val])
  //   )
  // );
  const data = getCombinations(variants.value);
  multipleVariant.value = data;

  created.value = variants.value.every(item => {
    return !item[0].errorMessages && !item[1].errorMessages;
  });

  multipleVariantTextField.value = multipleVariant.value.map(() => (JSON.parse(JSON.stringify(more))));
};

function cartesianProduct(...arrays) {
  return [...arrays].reduce(
    (a, b) => a.flatMap((x) => b.map((y) => [...x, y])),
    [[]]
  );
}

function getCombinations(nestedArray, list = []) {
  // initialize an empty array to store the final result
  let result = [];
  // check if there are any subarrays left
  if (nestedArray.length > 0) {
    // get the first subarray, which contains the key
    const key = nestedArray[0][0].value;
    if (key === "") {
      nestedArray[0][0].errorMessages = "Không được để trống!";
    }
    // get the second subarray, which contains the values
    const values = nestedArray[0][1].value.split("|");
    if (nestedArray[0][1].value === "") {
      nestedArray[0][1].errorMessages = "Không được để trống!";
    }
    // loop over the values
    for (const value of values) {
      // create an object with the key and value pair
      const obj = {};
      obj[key] = value;
      // copy the list and add the object to it
      const newList = list.slice();
      newList.push(obj);
      // call the function recursively with the remaining subarrays and the new list
      result = result.concat(getCombinations(nestedArray.slice(1), newList));
    }
  } else {
    // no more subarrays left, merge the objects in the list into one object
    let obj = {};
    for (const item of list) {
      obj = Object.assign(obj, item);
      // or use spread operator: obj = {...obj, ...item};
    }
    // append the merged object to the result
    result.push(obj);
  }
  // return the final result
  return result;
}

const submit = async () => {
  const formData = new FormData();

  if (mainForm.value.category.value) {
    formData.append("categoryId", mainForm.value.category.value);
  }
  formData.append("name", mainForm.value.name.value);
  if (mainForm.value.image.value.length > 0) {
    formData.append("image", mainForm.value.image.value[0]);
  }
  if (mainForm.value.gallery.value.length > 0) {
    for (const item of mainForm.value.gallery.value) {
      formData.append("gallery[]", item);
    }
  }
  formData.append("description", mainForm.value.description.value);

  const more = [];

  if (mainForm.value.radio.value) {
    if (created.value) {
      multipleVariant.value.forEach((item, index) => {
        const singleValue = {
          sku: multipleVariantTextField.value[index].sku.value,
          quantity: multipleVariantTextField.value[index].quantity.value,
          "origin_price": multipleVariantTextField.value[index].originPrice.value,
          "sell_price": multipleVariantTextField.value[index].sellPrice.value,
          "discount_price": multipleVariantTextField.value[index].discountPrice.value || undefined,
        };
        singleValue.value = Object.entries(item).reduce((pre, [key, value], index, self) => {
          if (index !== self.length - 1) {
            return pre += `${key}-${value}|`;
          }
          return pre += `${key}-${value}`;
        }, "");
        more.push(singleValue);
      });
      formData.append("type", 1);
    }
    else {
      mainForm.value.radio.errorMessages = "Chưa có biến thể được tạo!";
    }
  }
  else {
    const singleValue = {
      sku: singleVariantTextField.value.sku.value,
      quantity: singleVariantTextField.value.quantity.value,
      "origin_price": singleVariantTextField.value.originPrice.value,
      "sell_price": singleVariantTextField.value.sellPrice.value,
      "discount_price": singleVariantTextField.value.discountPrice.value || undefined,
    };
    more.push(singleValue);
    formData.append("type", 0);
  }
  formData.append("more", JSON.stringify(more));

  if (more.length > 0) {
    try {
      loadingStore.loading = true;
      const res = await axios.post(`${url}api/products`, formData);
      loadingStore.loading = false;
      if (res.status === 201) {
        status.value = true;
        mainForm.value.name.value = "";
        mainForm.value.image.value = [];
        mainForm.value.gallery.value = [];
        mainForm.value.description.value = "";
        mainForm.value.radio.value = 0;
        mainForm.value.category.value = null;

        singleVariantTextField.value.sku.value = "";
        singleVariantTextField.value.quantity.value = "";
        singleVariantTextField.value.originPrice.value = "";
        singleVariantTextField.value.sellPrice.value = "";
        singleVariantTextField.value.discountPrice.value = "";

        multipleVariantTextField.value = [];
        variants.value = [];
        multipleVariant.value = [];
      }
    }
    catch ({ response: { status, data } }) {
      loadingStore.loading = false;
      if (status === 400) {
        if (data.message === "Failed in product creation!") {
          for (const [key, value] of Object.entries(mapKeys(data.errors, (value, key) => camelCase(key)))) {
            mainForm.value[key].errorMessages = value;
          }
          // console.log("a");
        }
        else if (mainForm.value.radio.value) {
          for (const index in data.errors) {
            for (const [key, value] of Object.entries(mapKeys(data.errors[index], (value, key) => camelCase(key)))) {
              multipleVariantTextField.value[index][key].errorMessages = value;
            }
          }
        }
        else {
          for (const [key, value] of Object.entries(mapKeys(data.errors[0], (value, key) => camelCase(key)))) {
            singleVariantTextField.value[key].errorMessages = value;
          }
        }
      }
      else {
        // push
        console.log(data);
      }
    }
  }
};

const handleInput = input => {
  input.errorMessages = "";
  status.value = false;
};

const editContent = (event) => {
  mainForm.value.description.value = event;
  // handleInput(mainForm.value.description);
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

      <v-row v-if="status">
        <v-col cols="12">
          <SuccessAlert
            :show="status"
            title="Thêm sản phẩm thành công!"
            :to="{
              name: 'admin-product'
            }"
          >
          </SuccessAlert>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-autocomplete
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
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="mainForm.name.value"
            label="Tên sản phẩm"
            :error-messages="mainForm.name.errorMessages"
            variant="outlined"
            @update:model-value="() => handleInput(mainForm.name)"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-file-input
            v-model="mainForm.image.value"
            label="Hình ảnh chính"
            :error-messages="mainForm.image.errorMessages"
            prepend-icon=""
            prepend-inner-icon="mdi-image-outline"
            variant="outlined"
            show-size
            @update:model-value="() => handleInput(mainForm.image)"
          >

          </v-file-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-file-input
            v-model="mainForm.gallery.value"
            label="Hình ảnh trưng bày"
            :error-messages="mainForm.gallery.errorMessages"
            prepend-icon=""
            prepend-inner-icon="mdi-image-multiple-outline"
            variant="outlined"
            show-size
            chips
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
                  color="primary"
                  label
                  size="small"
                  class="me-2"
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
        <v-col cols="12">
          <v-radio-group
            inline
            label="Loại sản phẩm"
            v-model="mainForm.radio.value"
            :error-messages="mainForm.radio.errorMessages"
            @update:model-value="() => handleInput(mainForm.radio)"
          >
            <v-radio
              label="Đơn biến thể"
              :value="0"
            ></v-radio>
            <v-radio
              label="Đa biến thể"
              :value="1"
            ></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <template v-if="mainForm.radio.value">
        <template v-if="!created">
          <v-row>
            <v-col cols="12">
              <v-btn @click="pushVariant">Thêm</v-btn>
            </v-col>
          </v-row>
          <v-row
            v-for="(variant, index) in variants"
            :key="index"
          >
            <v-col cols="3">
              <v-text-field
                :label="variant[0].label"
                v-model="variant[0].value"
                :error-messages="variant[0].errorMessages"
                variant="outlined"
                @update:model-value="() => handleInput(variant[0])"
              ></v-text-field>
            </v-col>
            <v-col cols="9">
              <v-text-field
                :label="variant[1].label"
                v-model="variant[1].value"
                :placeholder="variant[1].placeholder"
                :error-messages="variant[1].errorMessages"
                append-icon="mdi-close"
                variant="outlined"
                @click:append="variants = variants.filter(item => item !== variant)"
                @update:model-value="() => handleInput(variant[1])"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn
                v-if="variants.length > 0"
                @click="createVariant"
              >
                Tạo các biến thể
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <v-row v-else>
          <v-col
            class="d-flex align-center"
            cols="12"
          >
            <div>{{ variants.length }} biến thể đã được tạo</div>
            <v-btn @click="created = false">
              Sửa
            </v-btn>
          </v-col>
        </v-row>
        <template v-if="multipleVariant && created">
          <template
            v-for="(variantProduct, index) in multipleVariant"
            :key="index"
          >
            <v-row>
              <v-col cols="12">
                <v-chip
                  v-for="(entry, index) in Object.entries(variantProduct)"
                  :key="index"
                >
                  {{ entry[0] }}: {{ entry[1] }}
                </v-chip>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Mã sản phẩm"
                  v-model="multipleVariantTextField[index].sku.value"
                  :error-messages="multipleVariantTextField[index].sku.errorMessages"
                  class="mr-2"
                  variant="outlined"
                  @update:model-value="() => handleInput(multipleVariantTextField[index].sku)"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Số lượng"
                  v-model="multipleVariantTextField[index].quantity.value"
                  :error-messages="multipleVariantTextField[index].quantity.errorMessages"
                  class="mr-2"
                  variant="outlined"
                  @update:model-value="() => handleInput(multipleVariantTextField[index].quantity)"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="Giá gốc"
                  v-model="multipleVariantTextField[index].originPrice.value"
                  :error-messages="multipleVariantTextField[index].originPrice.errorMessages"
                  class="mr-2"
                  variant="outlined"
                  @update:model-value="() => handleInput(multipleVariantTextField[index].originPrice)"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Giá bán"
                  v-model="multipleVariantTextField[index].sellPrice.value"
                  :error-messages="multipleVariantTextField[index].sellPrice.errorMessages"
                  class="mr-2"
                  variant="outlined"
                  @update:model-value="() => handleInput(multipleVariantTextField[index].sellPrice)"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Giá khuyến mãi"
                  v-model="multipleVariantTextField[index].discountPrice.value"
                  :error-messages="multipleVariantTextField[index].discountPrice.errorMessages"
                  class="mr-2"
                  variant="outlined"
                  @update:model-value="() => handleInput(multipleVariantTextField[index].discountPrice)"
                  hint="Không bắt buộc"
                ></v-text-field>
              </v-col>
            </v-row>
          </template>
        </template>
      </template>
      <template v-else>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="Mã sản phẩm"
              v-model="singleVariantTextField.sku.value"
              :error-messages="singleVariantTextField.sku.errorMessages"
              class="mr-2"
              variant="outlined"
              @update:model-value="() => handleInput(singleVariantTextField.sku)"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Số lượng"
              v-model="singleVariantTextField.quantity.value"
              :error-messages="singleVariantTextField.quantity.errorMessages"
              class="mr-2"
              variant="outlined"
              @update:model-value="() => handleInput(singleVariantTextField.quantity)"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              label="Giá gốc"
              v-model="singleVariantTextField.originPrice.value"
              :error-messages="singleVariantTextField.originPrice.errorMessages"
              class="mr-2"
              variant="outlined"
              persistent-hint
              @update:model-value="() => handleInput(singleVariantTextField.originPrice)"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Giá bán"
              v-model="singleVariantTextField.sellPrice.value"
              :error-messages="singleVariantTextField.sellPrice.errorMessages"
              class="mr-2"
              variant="outlined"
              persistent-hint
              @update:model-value="() => handleInput(singleVariantTextField.sellPrice)"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="Giá khuyến mãi"
              v-model="singleVariantTextField.discountPrice.value"
              :error-messages="singleVariantTextField.discountPrice.errorMessages"
              class="mr-2"
              variant="outlined"
              persistent-hint
              @update:model-value="() => handleInput(singleVariantTextField.discountPrice)"
              hint="Không bắt buộc"
            ></v-text-field>
          </v-col>
        </v-row>
      </template>

      <v-row>
        <v-col cols="12">
          <v-btn
            type="submit"
            class="mt-2"
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </v-form>

  </v-container>
</template>

<style></style>
