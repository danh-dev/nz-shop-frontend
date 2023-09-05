<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "../../../axiosComfig";

const reviews = ref([]);
const filteredReviews = ref([]);
const users = ref([]);
const products = ref([]);

const status = ref(0);
const statuses = [
    {
        title: "Chờ duyệt",
        value: 0,
    },
    {
        title: "Đã duyệt",
        value: 1,
    },
    {
        title: "Đã xóa",
        value: 2,
    }
];

watch([status, reviews], () => {
    switch (status.value) {
        case 0:
            filteredReviews.value = reviews.value.filter(item => item.status === "pending");
            break;
        case 1:
            filteredReviews.value = reviews.value.filter(item => item.status === "approved");
            break;
        case 2:
            filteredReviews.value = reviews.value.filter(item => item.status === "deleted");
            break;
    }
});

const fetchUsers = async () => {
    try {
        const res = await axios.get("users");
        if (res.status === 200) {
            users.value = res.data.data;
        }
        if (res.status === 204) {
            console.log("ko co gi");
        }
    }
    catch (e) {
        console.log(e);
    }
};

const fetchProducts = async () => {
    try {
        const res = await axios.get("products");
        if (res.status === 200) {
            products.value = res.data.data;
        }
        if (res.status === 204) {
            console.log("ko co gi");
        }
    }
    catch (e) {
        console.log(e);
    }
};

const fetchReviews = async () => {
    try {
        const res = await axios.get("reviews");
        if (res.status === 200) {
            reviews.value = res.data.data;
        }
        if (res.status === 204) {
            console.log("ko co gi");
        }
    }
    catch (e) {
        console.log(e);
    }

};

const getUserNameById = id => users.value.find(item => item.id === id)?.full_name;
const getProductNameById = id => products.value.find(item => item.id === id)?.name;

const handleCheckButton = async id => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/api/reviews/approve/${id}`);
        if (res.status === 200) {
            await fetchReviews();
            console.log(res.data.message);
        }
    }
    catch (e) {
        console.log(e);
    }
};

const handleDeleteButton = async id => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/api/reviews/delete/${id}`);
        if (res.status === 200) {
            await fetchReviews();
            console.log(res.data.message);
        }
    }
    catch (e) {
        console.log(e);
    }
};

onMounted(async () => {
    await fetchReviews();
    await fetchUsers();
    await fetchProducts();
});
</script>

<template>
    <h2>Danh sách đánh giá</h2>
    <v-select
        label="Trạng thái"
        v-model="status"
        :items="statuses"
    ></v-select>
    <v-table>
        <thead>
            <tr>
                <th
                    class="text-left"
                    style="width: 20%;"
                >
                    Người đánh giá
                </th>
                <th
                    class="text-left"
                    style="width: 10%;"
                >
                    Đánh giá
                </th>
                <th
                    class="text-left"
                    style="width: 25%;"
                >
                    Nội dung
                </th>
                <th
                    class="text-left"
                    style="width: 25%;"
                >
                    Sản phẩm
                </th>
                <th
                    class="text-left"
                    style="width: 15%;"
                >
                    Thời gian
                </th>
                <th
                    class="text-left"
                    style="width: 15%;"
                >
                    Chức năng
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="item in filteredReviews"
                :key="item.name"
            >
                <td>{{ getUserNameById(item.user_id) }}</td>
                <td>{{ item.rating }}</td>
                <td>
                    <div class="review"><v-tooltip
                            width="350px"
                            activator="parent"
                            location="top"
                            attach
                        >{{ item.comment }}
                        </v-tooltip>
                        {{ item.comment }}</div>
                </td>
                <td>
                    <div class="review"><v-tooltip
                            width="350px"
                            activator="parent"
                            location="top"
                            attach
                        >{{ getProductNameById(item.product_id) }}
                        </v-tooltip>{{ getProductNameById(item.product_id) }}</div>
                </td>
                <td>{{ item.updated_at.slice(0, 19) }}</td>
                <td>
                    <v-btn
                        v-if="status !== 1"
                        icon="mdi-check"
                        color="success"
                        variant="tonal"
                        size="small"
                        @click="() => handleCheckButton(item.id)"
                    ></v-btn>
                    <v-btn
                        v-if="status !== 2"
                        icon="mdi-trash-can-outline"
                        color="red-accent-4"
                        variant="tonal"
                        size="small"
                        @click="() => handleDeleteButton(item.id)"
                    ></v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<style>
.review {
    -webkit-line-clamp: 2;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    height: 2.8em;
}
</style>