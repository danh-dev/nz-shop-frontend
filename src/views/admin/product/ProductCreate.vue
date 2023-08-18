<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const loading = ref(false);

const requiredMessage = "Không được để trống!";

const validationProduct = ref({
  valid: true,
  name: "",
  lastName: "",
  image: "",
  gallery: "",
  shortDescription: "",
  longDescription: "",
});

const validationMore = ref(
  {
    code: "",
    originPrice: "",
    sellPrice: "",
    discountPrice: "",
    quantity: "",
  }
);

const submit = async () => {
  let productRes = {};
  let moreRes = {};
  const product = {
    name: mainForm.value.name.value,
    lastName: mainForm.value.lastName.value,
    image: mainForm.value.image.value,
    gallery: mainForm.value.gallery.value,
    shortDescription: mainForm.value.shortDescription.value,
    longDescription: mainForm.value.longDescription.value,
  };

  if (mainForm.value.radio.value) {
    if (!created.value) {
      mainForm.value.radio.errorMessages = "Chưa có biến thể được tạo!";
    }
    productRes = {
      data: {
        valid: false,
        name: "a",
        lastName: "",
        image: "",
        gallery: "",
        shortDescription: "Không được để trống!",
        longDescription: "",
      }
    };
    moreRes = {
      data: [
        {
          code: "123",
          originPrice: "",
          sellPrice: "",
          discountPrice: "a",
          quantity: "",
        },
        {
          code: "123",
          originPrice: "",
          sellPrice: "",
          discountPrice: "a",
          quantity: "",
        },
      ]
    };

  }
  else {
    productRes = {
      data: {
        valid: false,
        name: "a",
        lastName: "",
        image: "",
        gallery: "",
        shortDescription: "Không được để trống!",
        longDescription: "",
      }
    };
    moreRes = {
      data: {
        code: "",
        originPrice: "a",
        sellPrice: "",
        discountPrice: "",
        quantity: "",
      }
    };
  }

  validationProduct.value = productRes.data;
  validationMore.value = moreRes.data;
};

const mainForm = ref({
  name: {
    type: "text",
    label: "Tên sản phẩm",
    value: "",
    errorMessages: "",
  },
  lastName: {
    type: "text",
    label: "Last name",
    value: "",
    errorMessages: "",
  },
  image: {
    type: "file",
    label: "Image",
    value: [],
    chips: false,
    multiple: false,
    counter: false,
    icon: "mdi-image-outline",
    errorMessages: "",
  },
  gallery: {
    type: "file",
    label: "Gallery",
    value: [],
    chips: true,
    multiple: true,
    counter: true,
    icon: "mdi-image-multiple-outline",
    errorMessages: "",
  },
  radio: {
    type: "radio",
    groupLabel: "Loại sản phẩm",
    labels: ["Đơn biến thể", "Đa biến thể"],
    value: 0,
    errorMessages: "",
  },
  shortDescription: {
    type: "text",
    label: "Mô tả ngắn",
    value: "",
    errorMessages: "",
  },
  longDescription: {
    type: "text",
    label: "Mô tả chi tiết",
    value: "",
    errorMessages: "",
  }
});

const more = {
  code: {
    label: "Mã sản phẩm",
    value: "",
    errorMessages: "",
  },
  quantity: {
    label: "Số lượng",
    value: "",
    errorMessages: "",
  },
  originPrice: {
    label: "Giá gốc",
    value: "",
    errorMessages: "",
  },
  sellPrice: {
    label: "Giá bán",
    value: "",
    errorMessages: "",
  },
  discountPrice: {
    label: "Giá khuyến mãi",
    value: "",
    errorMessages: "",
  },
};

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

const singleVariantTextField = ref(JSON.parse(JSON.stringify(more)));
const multipleVariantTextField = ref([]);
const multipleVariant = ref([]);

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
      nestedArray[0][0].errorMessages = requiredMessage;
    }
    // get the second subarray, which contains the values
    const values = nestedArray[0][1].value.split("|");
    if (nestedArray[0][1].value === "") {
      nestedArray[0][1].errorMessages = requiredMessage;
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

const created = ref(false);

// watch product validation change
watch(
  () => ({
    name: validationProduct.value.name,
    lastName: validationProduct.value.lastName,
    image: validationProduct.value.image,
    gallery: validationProduct.value.gallery,
    shortDescription: validationProduct.value.shortDescription,
    longDescription: validationProduct.value.longDescription,
  }),
  (newVal, oldVal) => {
    Object.entries(newVal).forEach(([key, value]) => {
      if (oldVal[key] !== value) {
        mainForm.value[key].errorMessages = value;
      }
    });
  },
  {
    deep: true,
  }
);

// watch variant validation change
watch(validationMore, newVal => {
  if (!Array.isArray(newVal)) {
    Object.entries(newVal).forEach(([key, value]) => {
      singleVariantTextField.value[key].errorMessages = value;
    });
  }
  else {
    newVal.forEach((item, index) => {
      Object.entries(item).forEach(([key, value]) => {
        if (multipleVariantTextField.value.length > 0) {
          multipleVariantTextField.value[index][key].errorMessages = value;
        }
      });
    });
  }
});

</script>

<template>
  <v-container class="m-card my-3">
    <v-form
      validate-on="submit lazy"
      @submit.prevent="submit"
    >
      <h1>Hello</h1>
      <template
        v-for="([key, value]) in Object.entries(mainForm)"
        :key="key"
      >
        <v-row v-if="value.type === 'text'">
          <v-col cols="12">
            <v-text-field
              v-model="value.value"
              :label="value.label"
              :error-messages="value.errorMessages"
              variant="outlined"
              @update:model-value="value.errorMessages = ''"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row v-if="value.type === 'file'">
          <v-col cols="12">
            <v-file-input
              v-model="value.value"
              :label="value.label"
              :chips="value.chips"
              :multiple="value.multiple"
              :counter="value.counter"
              :error-messages="value.errorMessages"
              prepend-icon=""
              :prepend-inner-icon="value.icon"
              variant="outlined"
              show-size
              @update:model-value="value.errorMessages = ''"
            >
              <template
                v-if="value.multiple"
                v-slot:selection="{ fileNames }"
              >

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
                    +{{ value.value.length - 3 }} File(s)
                  </span>
                </template>
              </template>
            </v-file-input>
          </v-col>
        </v-row>

        <template v-if="value.type === 'radio'">
          <v-row>
            <v-col cols="12">
              <v-radio-group
                inline
                :label="value.groupLabel"
                v-model="value.value"
                :error-messages="value.errorMessages"
                @update:model-value="value.errorMessages = ''"
              >
                <v-radio
                  v-for="(label, index) in value.labels"
                  :label="label"
                  :value="index"
                  :key="index"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <template v-if="value.value">
            <template v-if="!created">
              <v-row>
                <v-col cols="12">
                  <v-btn @click="pushVariant">Thêm</v-btn>
                </v-col>
              </v-row>
              <v-row
                v-for="(variant, index) in   variants  "
                :key="index"
              >
                <v-col cols="3">
                  <v-text-field
                    :label="variant[0].label"
                    v-model="variant[0].value"
                    :error-messages="variant[0].errorMessages"
                    variant="outlined"
                    @update:model-value="variant[0].errorMessages = ''"
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
                    @update:model-value="variant[1].errorMessages = ''"
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
                v-for="(variantProduct, index) in multipleVariant  "
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
                  <template
                    v-for="([key, value], textFieldIndex) in Object.entries(multipleVariantTextField[index])"
                    :key="key"
                  >
                    <v-col
                      v-if="textFieldIndex < 2"
                      cols="6"
                    >
                      <v-text-field
                        :label="value.label"
                        v-model="value.value"
                        :error-messages="value.errorMessages"
                        class="mr-2"
                        variant="outlined"
                        @update:model-value="value.errorMessages = ''"
                      ></v-text-field>
                    </v-col>
                  </template>
                </v-row>
                <v-row>
                  <template
                    v-for="([key, value], textFieldIndex) in Object.entries(multipleVariantTextField[index])"
                    :key="key"
                  >
                    <v-col
                      v-if="textFieldIndex >= 2"
                      cols="4"
                    >
                      <v-text-field
                        :label="value.label"
                        v-model="value.value"
                        :error-messages="value.errorMessages"
                        class="mr-2"
                        variant="outlined"
                        @update:model-value="value.errorMessages = ''"
                      ></v-text-field>
                    </v-col>
                  </template>
                </v-row>
              </template>
            </template>
          </template>
          <template v-else>
            <v-row>
              <template
                v-for="([key, value], index) in Object.entries(singleVariantTextField)"
                :key="key"
              >
                <v-col
                  v-if="index < 2"
                  cols="6"
                >
                  <v-text-field
                    :label="value.label"
                    v-model="value.value"
                    :error-messages="value.errorMessages"
                    class="mr-2"
                    variant="outlined"
                    @update:model-value="value.errorMessages = ''"
                  ></v-text-field>
                </v-col>
              </template>
            </v-row>
            <v-row>
              <template
                v-for="([key, value], index) in Object.entries(singleVariantTextField)"
                :key="key"
              >
                <v-col
                  v-if="index >= 2"
                  cols="4"
                >
                  <v-text-field
                    :label="value.label"
                    v-model="value.value"
                    :error-messages="value.errorMessages"
                    class="mr-2"
                    variant="outlined"
                    @update:model-value="value.errorMessages = ''"
                  ></v-text-field>
                </v-col>
              </template>

            </v-row>
          </template>
        </template>
      </template>
      <v-row>
        <v-col cols="12">
          <v-btn
            :loading="loading"
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
