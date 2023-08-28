<template>
  <v-card class="my-2" elevation="0">
    <v-container id="productList">
      <v-row class="border-bottom my-3" v-for="(product, index) in cartStore.listCart" :key="index">
        <v-col cols="4">
          <v-img class="ma-auto" :width="100" aspect-ratio="1/1" cover :src="product.thumbnail"></v-img>
        </v-col>
        <v-col cols="8" class="d-flex flex-column justify-space-around">
          <div class="productDetail">
            <h4><a class="titleProduct" :href="product.url">{{ product.name }}</a></h4>
            <div class="listVariations py-1">
              <v-badge color="white" class="border rounded border-danger px-2 me-2"
                       v-for="variation in product.variations"
                       :key="variation" :content="variation" inline></v-badge>
            </div>
          </div>
          <div class="d-flex justify-space-between">
            <div class="productPrice py-1">
              <span v-if="product.priceSale" class="sale-price text-body-1 text-red-accent-4 font-weight-bold me-2">
                {{ formatPrice(product.priceSale) }}
              </span>
              <span :class="!product.priceSale ?
                  'text-body-1 text-red-accent-4 font-weight-bold' : 'regular-price text-body-2'
                ">
                {{ formatPrice(product.priceRegular) }}
              </span>
            </div>
            <div class="quantityUpdate d-flex">
              <span class="minus d-flex justify-center align-center m-pointer"
                    @click="cartStore.remove(product.id)">-</span>
              <input class="text-center" type="text" :value="product.quantity" readonly>
              <span class="plus d-flex justify-center align-center m-pointer"
                    @click="()=>{product.quantity>=10?cartError('max'):cartStore.add(product.id)}">+</span>
              <span class="delete d-flex justify-center align-center m-pointer"
                    @click="deleteProductInCart(product.id)"><i
                  class="mdi-delete-outline mdi text-red-accent-4"></i></span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

  <v-dialog
      v-model="showError"
      width="350"
  >
    <v-card>
      <v-card-title>
        <span>{{ errorTitle }}</span>
      </v-card-title>
      {{ errorContent }}
      <v-card-actions>
        <v-btn
            color="primary"
            variant="text"
            @click="cartError = !cartError"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {useCartStore} from "@/stores/cart";
import {siteData} from "@/stores/globals";
import {ref} from "vue";

const siteStore = siteData();
const cartStore = useCartStore();
const showError = ref(false);
const errorTitle = ref();
const errorContent = ref();
const cartError = (value) => {
  if (value === "max") {
    errorTitle.value = "Xin lỗi!";
    errorContent.value = "Số lượng sản phẩm đã đạt đến mức tối đa " +
        "Quý khách có nhu cầu mua số lượng nhiều vui lòng liên hệ phòng bán hàng doanh nghiệp B2B" +
        "Mr.Danh -  03599xxxxxx";
    showError.value = !showError.value;
  }
};
const deleteProductInCart = (id) => {
  if (confirm("Are you sure?")) {
    siteStore.isLoading = true;
    try {
      cartStore.removeAll(id);
      siteStore.hasRes({data: {status: "ok", message: "Đã xoá thành công"}});
    } catch (e) {
      siteStore.errorSystem();
      console.log(e);
    } finally {
      siteStore.isLoading = false;
    }
  }
};
</script>

<style scoped>
#productList {
  max-height: 80vh;
  overflow: auto;
}

.titleProduct {
  text-decoration: none;
}

.regular-price {
  -webkit-text-decoration: line-through;
  text-decoration: line-through;
}

#productList > div:last-child {
  border-bottom: 0 !important;
}

.quantityUpdate .minus {
  background: #f7f7f7;
  border-radius: 15px 0 0 15px;
  border-right: 0;
  height: 25px;
  padding: 8px 5px;
  width: 25px;
}

.quantityUpdate input {
  background: #f7f7f7;
  border: none;
  border-radius: 0;
  border-right: 0;
  font-size: 14px;
  height: 25px;
  padding: 0;
  width: 30px;
}

.quantityUpdate .plus {
  background: #f7f7f7;
  border-left: 0;
  border-radius: 0 15px 15px 0;
  height: 25px;
  padding: 8px 5px;
  width: 25px;
}

.quantityUpdate .delete {
  background: #f7f7f7;
  border-left: 0;
  border-radius: 15px;
  height: 25px;
  padding: 8px 5px;
  margin-left: 10px;
  width: 25px;
}</style>