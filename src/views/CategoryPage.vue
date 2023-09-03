<script setup>
import axios from "../axiosComfig";
import { ref, computed, watch } from "vue";
import { mapKeys, camelCase } from "lodash";
import { useRoute } from "vue-router";
import { useDisplay } from "vuetify";
import useCategoryStore from "@/stores/category";
import useLoadingStore from "@/stores/loading";

import BreadCrumbs from "@/components/category/BreadCrumbs.vue";
import FilterChip from "@/components/category/FilterChip.vue";
import RangeSlider from "@/components/category/RangeSlider.vue";
import FilterCard from "@/components/category/FilterCard.vue";
import ProductList from "@/components/category/ProductList.vue";
import GlobalPagination from "@/components/globals/GlobalPagination.vue";
const categoryStore = useCategoryStore();
const loadingStore = useLoadingStore();
const route = useRoute();
const { findCategoryBySlug, findRecursiveCategorySlug } = categoryStore;
const { name } = useDisplay();

const page = ref(1);
const category = ref(null);
const products = ref([]);
const newProducts = ref([]);
const filterArray = ref([]);
const switchCard = ref([]);
const chips = ref([]);
const breadCrumbsItems = ref([{
  title: "Trang chủ",
  href: "/",
  disable: false,
}]);

const selected = ref([]);

const bottomSelected = ref(undefined);
const sort = ref(undefined);

const max = 30000000;
const priceRange = ref([0, max]);
const step = 1000;


const productsLength = computed(() => {
  switch (name.value) {
    case "xs":
      return 2;
    case "sm":
      return 3;
    case "md":
      return 4;
    case "xl":
      return 6;
    case "xxl":
      return 7;
    default:
      return 5;
  }
});

const productsPerPages = computed(() => {
  return productsLength.value * 3;
});

const numberOfPages = computed(() => {
  return Math.ceil(products.value.length / productsPerPages.value);
});

watch(() => categoryStore.categories, async () => {
  const { params: { slugs } } = route;
  category.value = findCategoryBySlug(slugs[slugs.length - 1]);

  slugs.forEach((slug, index, self) => {
    if (index !== self.length - 1) {
      const category = findCategoryBySlug(slug);
      breadCrumbsItems.value.push({
        title: category.name,
        href: `/categories${findRecursiveCategorySlug(category)}`,
        disable: false,
      });
    }
  });

  breadCrumbsItems.value.push({
    title: category.value.name,
    href: `/categories${findRecursiveCategorySlug(category.value)}`,
    disable: true,
    activeColor: "black",
    active: true
  });

  loadingStore.loading = true;
  products.value = await fetchRecursiveCategoryProducts(category.value.id);
  for (const product of products.value) {
    product.variant = await fetchLowPriceVariant(product.id);
  }
  newProducts.value = products.value;
  loadingStore.loading = false;

  const propertiesDuplicateArr = products.value.reduce((pre, cur) => {
    if (pre === "") {
      return pre + cur.properties;
    }
    return pre + ", " + cur.properties;
  }, "").split(", ");

  const propertiesArr = [...new Set(propertiesDuplicateArr)].sort((a, b) => a > b ? 1 : -1);
  const filterArr = propertiesArr.reduce((pre, cur) => {
    const [key, value] = cur.split("-");
    if (pre.length > 0 && pre[pre.length - 1].enName === key) {
      pre[pre.length - 1].items.push(value);
    }
    else {
      pre.push({
        enName: key,
        items: [value],
        choices: [],
      });
      switch (key) {
        case "cpu":
          pre[pre.length - 1].name = "Chíp xử lý";
          pre[pre.length - 1].icon = "mdi-memory";
          break;
        case "screen":
          pre[pre.length - 1].name = "Kích thước màn hình";
          pre[pre.length - 1].icon = "mdi-overscan";
          break;
        case "Rom":
          pre[pre.length - 1].name = "Bộ nhớ trong";
          pre[pre.length - 1].icon = "mdi-harddisk";
          break;
        case "Ram":
          pre[pre.length - 1].name = "Dung lượng ram";
          pre[pre.length - 1].icon = "mdi-harddisk";
          break;
        default:
          break;
      }
    }
    return pre;
  }, []);
  filterArr.forEach(item => {
    item.items.sort((a, b) => {
      if (a.charAt(0) < 10 && b.charAt(0) < 10) {
        return parseInt(a) > parseInt(b) ? 1 : -1;
      }

      return a > b ? 1 : -1;
    });
  });
  filterArray.value = filterArr;
  switchCard.value = [false, ...filterArr.map(() => false), false];
  chips.value = switchCard.value.map(() => null);
});

const changePrice = up => {
  if (up) {
    priceRange.value[1] += step * 100;
  }
  else {
    priceRange.value[0] -= step * 100;
  }
  if (priceRange.value[0] < 0) {
    priceRange.value[0] = 0;
  }
  if (priceRange.value[1] > max) {
    priceRange.value[1] = max;
  }
};

const handleChipClick = index => {
  switchCard.value[index] = !switchCard.value[index];
  switchCard.value.forEach((_, i, arr) => {
    if (i !== index) {
      arr[i] = false;
    }
  });
};

const checkLastChip = () => {
  if (selected.value.length > 0) {
    const lastSelected = selected.value[selected.value.length - 1];
    if (lastSelected === 0) {
      if (priceRange.value[0] === 0 && priceRange.value[1] === max) {
        selected.value.pop();
      }
    }
    else if (lastSelected === filterArray.value.length + 1) {
      if (sort.value === undefined) {
        selected.value.pop();
      }
    }
    else if (filterArray.value[lastSelected - 1].choices.length === 0) {
      selected.value.pop();
    }
  }
};

const updateSelected = event => {
  if (selected.value.length < event.length) {
    checkLastChip();
    selected.value.push(event[event.length - 1]);
  }
  else {
    const preSum = selected.value.reduce((sum, num) => sum + num, 0);
    const curSum = event.reduce((sum, num) => sum + num, 0);
    const popValue = preSum - curSum;
    selected.value = event;
    checkLastChip();

    if (popValue === 0) {
      if (priceRange.value[0] !== 0 || priceRange.value[1] !== max) {
        selected.value.push(popValue);
      }
    }
    else if (popValue === filterArray.value.length + 1) {
      if (sort.value !== undefined) {
        selected.value.push(popValue);
      }

    }
    else if (filterArray.value[popValue - 1].choices.length > 0) {
      selected.value.push(popValue);
    }
  }
};

const handleSearchClick = () => {
  // lastFiltered.value = filterArray.value.reduce((obj, item) => {
  //   if (item.choices.length > 0) {
  //     obj[getSlugByName(item.name)] = item.choices.map(i => getSlugByName(item.items[i])).join(",");
  //   }
  //   return obj;
  // }, {});

  // if (priceRange.value[0] > 0 || priceRange.value[1] < max) {
  //   lastFiltered.value["price"] = `${priceRange.value[0]}-${priceRange.value[1]}`;
  // }
  newProducts.value = products.value;
  if (priceRange.value[0] !== 0 || priceRange.value[1] !== max) {
    newProducts.value = products.value.filter(item => ((item.variant.discountPrice || item.variant.sellPrice) >= priceRange.value[0]) && ((item.variant.discountPrice || item.variant.sellPrice) <= priceRange.value[1]));
  }
  const filterArray2 = filterArray.value.map(item => item.choices.map(choice => item.enName + "-" + item.items[choice])).filter(item => item.length !== 0);
  newProducts.value = newProducts.value.filter(product => {

    return filterArray2.reduce((pre, cur) => {
      let result = false;
      for (const item of cur) {
        if (product.properties.includes(item)) {
          result = true;
          break;
        }
      }
      return pre && result;
    }, true);

  });
  // router.push({
  //   name: "categories",
  //   query: lastFiltered.value,
  // });
};

const updatePage = (event) => {
  page.value = event;
};

const clickChips = index => {
  chips.value[index].$el.click();
};

watch(([bottomSelected, sort]), () => {
  handleSearchClick();
  if (bottomSelected.value === 0) {
    newProducts.value = newProducts.value.filter(product => product.prePrice !== product.price);

  }
  if (bottomSelected.value === 1) {
    newProducts.value = newProducts.value.filter(product => product.id === 1);
  }

  if (sort.value === 0) {
    newProducts.value.sort((a, b) => a.price - b.price);
  }

  if (sort.value === 1) {
    newProducts.value.sort((a, b) => b.price - a.price);
  }
});

watch(newProducts, () => {
  if (chips.value.length > 0 && chips.value[0] !== null) {
    for (const index in chips.value) {
      if (switchCard.value[index]) {
        clickChips(index);
      }
    }
  }
});

const fetchRecursiveCategoryProducts = async (id, numbers) => {
  let result = [];
  try {
    const res = await axios.get(`recursive-categories/${id}/products/${numbers ?? ""}`);
    if (res.status === 200) {
      result = res.data.data.map(product => mapKeys(product, (value, key) => camelCase(key)));
    }
  }
  catch (e) {
    //push
  }
  return result;
};

const fetchLowPriceVariant = async id => {
  let variant;
  try {
    const res = await axios.get(`products/${id}/variant`);
    if (res.status === 200) {
      variant = mapKeys(res.data.data, (value, key) => camelCase(key));
    }
  }
  catch (e) {
    //push
  }
  return variant;
};

// Danh
import {useSeoMeta} from "@unhead/vue";
route.meta.title = "Category";
useSeoMeta({
  title: route.meta.title,
});
</script>

<template>
  <BreadCrumbs :breadCrumbsItems="breadCrumbsItems" />

  <v-sheet class="my-5">
    <v-sheet class="d-flex align-center">
      <v-chip-group
        style="overflow: visible;"
        :model-value="selected"
        @update:model-value="updateSelected($event)"
        multiple
      >
        <FilterChip
          prepend-icon="mdi-cash"
          append-icon="mdi-chevron-down"
          style="overflow: visible;"
          @click="handleChipClick(0)"
          :ref="$el => { chips[0] = $el }"
        ><template #text>Giá</template>
          <template
            #card
            v-if="switchCard[0]"
          >
            <FilterCard
              width="25rem"
              @click="clickChips(0)"
            >
              <template #filter-title>Giá</template>
              <template #sub-filter>
                <RangeSlider
                  @update:rangePrice="newValue => priceRange = newValue"
                  @changePrice="changePrice"
                  :max="max"
                  :priceRange="priceRange"
                  :step="step"
                ></RangeSlider>
              </template>
            </FilterCard>
          </template>

        </FilterChip>
        <FilterChip
          v-for="(filter, index) in filterArray"
          :key="filter.id"
          :prepend-icon="filter.icon"
          @click="handleChipClick(index + 1)"
          append-icon="mdi-chevron-down"
          style="overflow: visible;"
          :ref="$el => { chips[index + 1] = $el }"
        >
          <template #text>{{ filter.name }}</template>
          <template
            #card
            v-if="switchCard[index + 1]"
          >
            <FilterCard
              width="14rem"
              @click="clickChips(index + 1)"
            >
              <template #filter-title>{{ filter.name }}</template>
              <template #sub-filter>
                <v-chip-group
                  filter
                  multiple
                  @click.stop
                  v-model="filter.choices"
                >
                  <v-chip
                    v-for="(item, index) in filter.items"
                    :key="index"
                    color="red-accent-4"
                    @click.stop
                  >
                    {{ item }}
                  </v-chip>

                </v-chip-group>
              </template>
            </FilterCard>
          </template>
        </FilterChip>
        <FilterChip
          prepend-icon="mdi-sort"
          append-icon="mdi-chevron-down"
          style="overflow: visible;"
          @click="handleChipClick(switchCard.length - 1)"
          :ref="$el => { chips[chips.length - 1] = $el }"
        >
          <template #text>Sắp xếp theo</template>
          <template
            #card
            v-if="switchCard[switchCard.length - 1]"
          >
            <FilterCard
              width="13rem"
              @click="clickChips(chips.length - 1)"
            >
              <template #filter-title>Sắp xếp theo</template>
              <template #sub-filter>
                <v-chip-group
                  filter
                  @click.stop
                  v-model="sort"
                >
                  <v-chip
                    color="red-accent-4"
                    @click.stop
                  >
                    Giá tăng dần
                  </v-chip>
                  <v-chip
                    color="red-accent-4"
                    @click.stop
                  >
                    Giá giảm dần
                  </v-chip>
                </v-chip-group>
              </template>
            </FilterCard>
          </template>
        </FilterChip>

      </v-chip-group>
      <v-btn
        @click="handleSearchClick"
        class="ms-auto"
      >Search</v-btn>
    </v-sheet>

    <v-chip-group
      style="overflow: visible;"
      v-model="bottomSelected"
    >
      <FilterChip prepend-icon="mdi-sale-outline">
        <template #text>Khuyến mãi hot</template>
      </FilterChip>
      <FilterChip prepend-icon="mdi-eye-outline">
        <template #text>Xem nhiều</template>
      </FilterChip>
    </v-chip-group>

  </v-sheet>
  <ProductList
    :productsLength="productsLength"
    :products="newProducts"
    :productsPerPages="productsPerPages"
    :page="page"
  ></ProductList>
  <GlobalPagination
    v-if="numberOfPages > 1"
    :page="page"
    :numberOfPages="numberOfPages"
    @update:page="updatePage"
  />
</template>

<style></style>