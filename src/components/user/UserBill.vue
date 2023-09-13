<script setup>
import { computed } from "vue";
const props = defineProps({
    order: Object,
    statuses: Array,
});
const amount = computed(() => {
    return props.order.products.reduce((pre, cur) => {
        return pre += cur.price * cur.quantity;
    }, 0);
});

const highestPriceProduct = computed(() => {
    return props.order.products.reduce((result, item) => {
        if (item.price > result.price) {
            return item;
        }
        return result;
    }, { price: -1, });
});

const chipColor = computed(() => {
    switch (props.order.status) {
        case props.statuses[0]:
            return "info";
        case props.statuses[1]:
            return "primary";
        case props.statuses[2]:
            return "warning";
        case props.statuses[3]:
            return "success";
        case props.statuses[4]:
            return "error";
        default:
            return "secondary";
    }
});
</script>

<template>
    <v-card
        class="d-flex px-3 py-5"
        variant="elevated"
        height="200px"
    >
        <v-img
            :src="highestPriceProduct.image"
            width="15%"
        />
        <v-sheet width="85%">
            <v-sheet>{{ highestPriceProduct.name }}
            </v-sheet>

            <v-card-subtitle class="d-flex">
                <slot
                    name="subtitle"
                    :productsLength="order.products.length"
                ></slot>
                <slot
                    class="ms-auto"
                    name="quantity"
                    :productsLength="order.products.length"
                ></slot>
            </v-card-subtitle>

            <v-sheet>
                <v-chip
                    class="mb-2"
                    :color="chipColor"
                    label
                    size="small"
                >
                    {{ order.status }}
                </v-chip>
            </v-sheet>

            <v-sheet class="d-flex justify-end align-center">
                <slot
                    name="price"
                    :amount="amount"
                ></slot>
                <slot
                    name="button"
                    :orderCode="order.code"
                ></slot>

            </v-sheet>
        </v-sheet>
    </v-card>
</template>

<style></style>