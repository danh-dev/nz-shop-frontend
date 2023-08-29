<script setup>
import { ref, watch, computed } from "vue";
import UserBill from "@/components/user/UserBill.vue";
const props = defineProps({
    user: Object,
    orders: Array
});
const statuses = ref(["Chờ xác nhận", "Đã xác nhận", "Đang vận chuyển", "Đã giao", "Đã hủy"]);
const selected = ref(0);

const newOrders = ref(props.orders);
const unCancelOrders = computed(() => {
    return props.orders.filter(item => item.status !== "Đã hủy");
});

const spend = computed(() => {
    return props.orders.reduce((result, item) => {
        if (item.status === "Đã giao") {
            return result += item.products.reduce((total, item) => total += item.price * item.quantity, 0);
        }
        return result;
    }, 0);
    // let result = 0;
    // orders.value.forEach(item => {
    //     if (item.status === "Đã giao") {
    //         let total = 0;
    //         item.products.forEach(item => {
    //             total += item.price * item.quantity;
    //         });
    //         result += total;
    //     }
    // });

    // return result;
});

watch(selected, () => {
    if (selected.value === 0) {
        newOrders.value = props.orders;
    }
    else {
        newOrders.value = props.orders.filter(item => item.status === statuses.value[selected.value - 1]);
    }

});


</script>

<template>
    <v-sheet
        :user="user"
        class="d-flex flex-column"
        width="100%"
    >
        <v-sheet class="pa-5">
            <v-sheet class="d-flex ">
                <v-card
                    class="d-flex flex-column text-center mr-3"
                    rounded="lg"
                    width="50%"
                >
                    <v-sheet class="font-weight-bold">{{ unCancelOrders.length }}</v-sheet>
                    <v-sheet class="text-body-2"> Đơn hàng</v-sheet>
                </v-card>
                <v-card
                    rounded="lg"
                    class="d-flex flex-column text-center"
                    width="50%"
                >
                    <v-sheet class="font-weight-bold">{{ spend }}</v-sheet>
                    <v-sheet class="text-body-2"> Tổng tiền tích lũy</v-sheet>

                </v-card>
            </v-sheet>
        </v-sheet>
        <v-list class="d-flex">
            <v-list-item
                color="red-accent-4"
                variant="elevated"
                value="Tất cả"
                :active="selected === 0"
                @click="selected = 0"
            >
                <v-list-item-title>Tất cả</v-list-item-title>
            </v-list-item>
            <v-list-item
                color="red-accent-4"
                variant="elevated"
                v-for="(status, index) in statuses"
                :key="status"
                :value="status"
                :active="selected === index + 1"
                @click="selected = index + 1"
            >
                <v-list-item-title>{{ status }}</v-list-item-title>
            </v-list-item>

        </v-list>
        <UserBill
            v-for="order in newOrders"
            :key="order.id"
            :order="order"
            :statuses="statuses"
        >
            <template #subtitle="{ productsLength }">
                <div v-if="productsLength > 1">và {{ productsLength - 1 }} sản phẩm khác</div>
            </template>
            <template #price="{ amount }">
                <v-sheet class="text-body-1 font-weight-bold text-red me-auto">
                    {{ amount }}
                </v-sheet>
            </template>
            <template #button="{ orderCode }">
                <v-btn
                    class="mr-1 text-body-2"
                    variant="outlined"
                    color="red-accent-4"
                >Xem hóa đơn</v-btn>
                <v-btn
                    class="text-body-2"
                    variant="outlined"
                    color="red-accent-4"
                    :to="{
                        name: 'user-history-detail',
                        params: {
                            code: orderCode,
                        }
                    }
                        "
                >Xem chi tiết</v-btn>
            </template>
        </UserBill>
    </v-sheet>
</template>

<style></style>