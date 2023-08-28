<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

const comments = ref([]);
const filteredComments = ref([]);

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

watch([status, comments], () => {
    switch (status.value) {
        case 0:
            filteredComments.value = comments.value.filter(item => item.status === "pending");
            break;
        case 1:
            filteredComments.value = comments.value.filter(item => item.status === "approved");
            break;
        case 2:
            filteredComments.value = comments.value.filter(item => item.status === "deleted");
            break;
    }
});

watch(comments, newComments => {
    for (const comment of newComments) {
        fetchUser(comment);
        fetchProduct(comment);
    }
});

const fetchComments = async () => {
    try {
        const res = await axios.get("http://127.0.0.1:8000/api/product-comments");
        if (res.status === 200) {
            comments.value = res.data.data;
        }
        if (res.status === 204) {
            console.log("ko co gi");
        }
    }
    catch (e) {
        console.log(e);
    }
};

const fetchUser = async comment => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/product-comments/${comment.id}/user`);
        if (res.status === 200) {
            comment.user = res.data.data.full_name;
        }
    }
    catch (e) {
        console.log(e);
    }
};

const fetchProduct = async comment => {
    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/product-comments/${comment.id}/product`);
        if (res.status === 200) {
            comment.product = res.data.data.name;
        }
    }
    catch (e) {
        console.log(e);
    }
};

const handleCheckButton = async id => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/api/product-comments/approve/${id}`);
        if (res.status === 200) {
            await fetchComments();
            console.log(res.data.message);
        }
    }
    catch (e) {
        console.log(e);
    }
};

const handleDeleteButton = async id => {
    try {
        const res = await axios.put(`http://127.0.0.1:8000/api/product-comments/delete/${id}`);
        if (res.status === 200) {
            await fetchComments();
            console.log(res.data.message);
        }
    }
    catch (e) {
        console.log(e);
    }
};

onMounted(fetchComments);
</script>

<template>
    <h2>Danh sách bình luận</h2>
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
                    Người bình luận
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
                    style="width: 20%;"
                >
                    Thời gian
                </th>
                <th
                    class="text-left"
                    style="width: 10%;"
                >
                    Chức năng
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="item in filteredComments"
                :key="item.id"
            >
                <td>{{ item.user }}</td>
                <td>
                    <div class="review"><v-tooltip
                            width="350px"
                            activator="parent"
                            location="top"
                            attach
                        >{{ item.comment }}
                        </v-tooltip>{{ item.comment }}</div>
                </td>
                <td>
                    <div class="review"><v-tooltip
                            width="350px"
                            activator="parent"
                            location="top"
                            attach
                        >{{ item.product }}
                        </v-tooltip>{{ item.product }}</div>
                </td>
                <td>{{ item.updated_at }}</td>
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

<style></style>