<script setup >
import UserMenu from "./UserMenu.vue";
import { RouterView } from "vue-router";
import { ref } from "vue";
const user = ref({
    id: 1,
    name: "Tran Duy Tam",
    gender: 1,
    phone: "0362677348",
    address: "372/30 đường Cách Mạng Tháng 8, Phường 10, Quận 3",
    date: "25/07/2023",
    rank: "dong",
    orders: 2,

});

const orders = ref([
    {
        id: 1,
        code: "123",
        date: "20/03/2023",
        status: "Chờ xác nhận",
        products: [
            {
                id: 1,
                name: "Chuột chơi game có dây Dareu A960S Ultralight RGB LED -Đen ",
                image: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/c/h/chuot-choi-game-co-day-dareu-a960s-1_1.jpg",
                price: 10000,
                quantity: 3,
                prePrice: 50000,
            },
            {
                id: 2,
                name: "Chuột chơi game có dây Dareu A960S Ultralight RGB LED -trắng ",
                image: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/c/h/chuot-choi-game-co-day-dareu-a960s-1_1.jpg",
                price: 20000,
                quantity: 2,
                prePrice: 30000,
            }
        ]
    },
    {
        id: 2,
        code: "1234",
        date: "20/05/2023",
        status: "Đã xác nhận",
        products: [
            {
                id: 3,
                name: "Chuột chơi game có dây Dareu A960S Ultralight RGB LED -ĐỎ ",
                image: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/c/h/chuot-choi-game-co-day-dareu-a960s-1_1.jpg",
                price: 10000,
                quantity: 2,
                prePrice: 20000,
            },
            {
                id: 4,
                name: "Chuột chơi game có dây Dareu A960S Ultralight RGB LED -Vàng ",
                image: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/c/h/chuot-choi-game-co-day-dareu-a960s-1_1.jpg",
                price: 10000,
                quantity: 2,
                prePrice: 20000,
            }
        ]
    },
    {
        id: 3,
        code: "12345",
        date: "20/03/2023",
        status: "Đang vận chuyển",
        products: [
            {
                id: 6,
                name: "Chuột chơi game có dây Dareu A960S Ultralight RGB LED -Đen ",
                image: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/c/h/chuot-choi-game-co-day-dareu-a960s-1_1.jpg",
                price: 10000,
                quantity: 2,
                prePrice: 20000,
            },
            {
                id: 7,
                name: "Chuột chơi game có dây Dareu A960S Ultralight RGB LED -trắng ",
                image: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/c/h/chuot-choi-game-co-day-dareu-a960s-1_1.jpg",
                price: 10000,
                quantity: 2,
                prePrice: 20000,
            }
        ]
    },
    {
        id: 4,
        code: "123456",
        date: "20/03/2023",
        status: "Đã giao",
        products: [
            {
                id: 6,
                name: "Chuột chơi game có dây Dareu A960S Ultralight RGB LED -Đen ",
                image: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/c/h/chuot-choi-game-co-day-dareu-a960s-1_1.jpg",
                price: 10000,
                quantity: 2,
                prePrice: 60000,
            },
            {
                id: 7,
                name: "Chuột chơi game có dây Dareu A960S Ultralight RGB LED -trắng ",
                image: "https://cdn2.cellphones.com.vn/358x/media/catalog/product/c/h/chuot-choi-game-co-day-dareu-a960s-1_1.jpg",
                price: 10000,
                quantity: 2,
                prePrice: 20000,
            }
        ]
    },
]);

</script>

<template>
    <v-layout class="pa-3">
        <v-container>
            <v-sheet
                width="20%"
                class="mr-4 float-left"
                position="sticky"
                location="top left"
            >
                <UserMenu
                    rounded="lg"
                    elevation="3"
                    :user="{ name } = user"
                >
                </UserMenu>
            </v-sheet>
            <v-main class="d-flex">

                <RouterView
                    :user="user"
                    :orders="orders"
                ></RouterView>

            </v-main>

        </v-container>
    </v-layout>
</template>


<style></style>