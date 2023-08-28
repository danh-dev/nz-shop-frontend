<script setup>
import { ref, onBeforeMount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import UserBill1 from "@/components/user/UserBill1.vue";
const props = defineProps({
    orders: Array,
    user: Object,
});
const route = useRoute();
const router = useRouter();
const order = ref({});

const spend = computed(() => {
    return props.orders.reduce((result, item) => {
        if (item.code === route.params.code) {
            return result += item.products.reduce((total, item) => total += item.prePrice * item.quantity, 0);
        }
        return result;
    }, 0);

});

const discount = computed(() => {
    return props.orders.reduce((result, item) => {
        if (item.code === route.params.code) {
            return result += item.products.reduce((total, item) => total += (item.price - item.prePrice) * item.quantity, 0);
        }
        return result;
    }, 0);

});


const statuses = ref(["Chờ xác nhận", "Đã xác nhận", "Đang vận chuyển", "Đã giao", "Đã hủy"]);
const chipColor = computed(() => {
    switch (order.value.status) {
        case statuses.value[0]:
            return "info";
        case statuses.value[1]:
            return "primary";
        case statuses.value[2]:
            return "warning";
        case statuses.value[3]:
            return "success";
        case statuses.value[4]:
            return "error";
        default:
            return "secondary";
    }
});

onBeforeMount(() => {
    for (const item of props.orders) {
        if (item.code === route.params.code) {
            order.value = item;
            break;
        }
    }
});

</script>

<template>
    <v-sheet
        position="relative"
        width="100%"
        class="d-flex flex-column"
        :user="user"
    >
        <v-btn
            variant="text"
            icon="mdi-arrow-left"
            style="position: absolute;"
            rounded="0"
            @click="router.back()"
        ></v-btn>
        <h1 class="text-center">Chi tiết đơn hàng</h1>
        <div class="d-flex align-center">
            <div>Mã hơn hàng: <span class="text-body-1 font-weight-bold">{{ order.code }}</span>
            </div>
            <v-chip
                class="ms-auto"
                :color="chipColor"
                label
                size="small"
            >
                {{ order.status }}
            </v-chip>
        </div>
        <div>{{ order.date }}</div>
        <UserBill1
            v-for="product in order.products"
            :key="product.id"
            :product="product"
            class="mt-4"
        ></UserBill1>
        <v-sheet class="mt-4">
            <v-card
                class="px-3 py-5"
                width="100%"
            >
                <v-sheet>
                    <v-sheet class="d-flex">
                        <v-icon
                            class="mr-3"
                            color="red-accent-4"
                        >mdi-credit-card-outline</v-icon>
                        <v-sheet class="text-body-1 font-weight-bold mb-4">Thông tin thanh toán</v-sheet>
                    </v-sheet>
                    <v-sheet class="d-flex  justify-space-between mb-2">
                        <div>Tổng tiền sản phẩm:</div>
                        <div>{{ spend }}</div>
                    </v-sheet>
                    <v-sheet class="d-flex  justify-space-between mb-2">
                        <div>Giảm giá:</div>
                        <div>{{ discount }}</div>
                    </v-sheet>
                    <v-sheet class="d-flex mb-2 justify-space-between">
                        <div>Phí vận chuyển:</div>
                        <div>miễn phí </div>
                    </v-sheet>
                    <v-divider
                        class="border-opacity-50 mb-2"
                        color="red"
                    ></v-divider>
                    <v-sheet class="d-flex mb-2 justify-space-between">
                        <div>Phải thanh toán:</div>
                        <div class="font-weight-bold">{{ spend + discount }}</div>
                    </v-sheet>
                    <v-sheet class="d-flex mb-2 justify-space-between">
                        <div>Đã thanh toán:</div>
                        <div class="text-success">{{ spend + discount }}</div>
                    </v-sheet>
                </v-sheet>
            </v-card>
        </v-sheet>
        <v-sheet class="mt-4">
            <v-card
                class="px-3 py-5"
                width="100%"
            >
                <v-sheet class="d-flex ">
                    <v-avatar
                        class="mr-3"
                        variant="elevated"
                        size="30"
                        image="https://tse4.mm.bing.net/th?id=OIF.KkNJGnjHefW6cs0H12qmpw&pid=Api&P=0&h=180"
                    ></v-avatar>
                    <div class="text-body-1 font-weight-bold mb-4">
                        Thông tin khách hàng
                    </div>
                </v-sheet>
                <v-sheet class="d-flex">
                    <v-icon class="mr-3">mdi-account-outline</v-icon>
                    <v-sheet class="mb-4">{{ user.name }}</v-sheet>
                </v-sheet>
                <v-sheet class="d-flex">
                    <v-icon class="mr-3">mdi-phone-outline</v-icon>
                    <v-sheet class="mb-4">{{ user.phone }}</v-sheet>
                </v-sheet>
                <v-sheet class="d-flex">
                    <v-icon class="mr-3">mdi-map-marker-outline</v-icon>
                    <v-sheet class="mb-4">{{ user.address }}</v-sheet>
                </v-sheet>
            </v-card>
        </v-sheet>
        <v-sheet class="mt-4">
            <v-card
                class="px-3 py-5"
                width="100%"
            >
                <v-sheet class="d-flex ">
                    <v-icon
                        class="mr-3"
                        color="red"
                    > mdi-phone-incoming-outline</v-icon>
                    <div class="text-body-1 font-weight-bold mb-4">
                        Thông tin hỗ trợ
                    </div>
                </v-sheet>
                <v-sheet class="d-flex">
                    <v-icon class="mr-3">mdi-phone-outline</v-icon>
                    <v-sheet class="text-grey-lighten-1">Số điện thoại cửa hàng: </v-sheet>
                </v-sheet>
                <v-sheet class="text-red-accent-4 ml-9 mt-1 mb-3">(028)7100 0347</v-sheet>
                <v-sheet class="d-flex">
                    <v-icon class="mr-3">mdi-map-marker-outline</v-icon>
                    <v-sheet class="text-grey-lighten-1">Địa chỉ của hàng: </v-sheet>

                </v-sheet>
                <v-sheet class=" ml-9 mt-1 mb-3">347 Nguyễn Tri Phương, Phường 5, Quận 10</v-sheet>
                <a
                    href="https://g.page/r/CWKo-PuuwVYcEAE"
                    class="d-flex justify-end text-red-accent-4  "
                    target="_blank"
                >
                    xem chỉ đường >
                </a>
            </v-card>
        </v-sheet>
    </v-sheet>
</template>

<style></style>