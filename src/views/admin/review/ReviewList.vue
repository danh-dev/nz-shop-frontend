<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "../../../axiosComfig";
import { mapKeys, camelCase } from "lodash";
import GlobalPagination from "../../../components/globals/GlobalPagination.vue";

import { siteData } from "@/stores/globals.js";
import getSlugByName from "@/utils/getSlugByName.js";

const siteStore = siteData();

const headers = [
    {
        title: "Người đánh giá",
        align: "start",
        sortable: false,
        key: "fullName",
    },
    {
        title: "Đánh giá",
        sortable: false,
        key: "rating",
        align: "start"
    },
    {
        title: "Nội dung",
        sortable: false,
        key: "comment",
        align: "start"
    },
    {
        title: "Tên sản phẩm",
        sortable: false,
        key: "name",
        align: "start"
    },
    {
        title: "Thời gian",
        key: "createdAt",
        align: "start"
    },
    {
        title: "Đã duyệt / Chờ duyệt",
        key: "isApproved",
        align: "start"
    },
    {
        title: "Chức năng",
        sortable: false,
        key: "action",
        align: "start"
    },
];
const reviews = ref([]);
const rowsPerPage = 7;
const numberOfPages = ref(0);
const currentPage = ref(1);

const alert = ref("");
const tempId = ref(0);

const status = ref(null);
const statuses = [
    {
        title: "Tất cả",
        value: null,
    },
    {
        title: "Đã duyệt",
        value: true,
    },
    {
        title: "Chờ duyệt",
        value: false,
    }
];

const fetchReviews = async () => {
    try {
        let url = `review-pagination/?page=${currentPage.value}&per_page=${rowsPerPage}`;
        if (status.value !== null) {
            url += `&is_approved=${status.value}`;
        }
        siteStore.hasLoading();
        const res = await axios.get(url);

        if (res.status === 200) {
            reviews.value = res.data.data.reviews.map(comment => mapKeys(comment, (value, key) => camelCase(key)));
            numberOfPages.value = res.data.data.numberOfPages;
        }
    }
    catch (e) {
        console.log(e);
    }
    finally {
        siteStore.doneLoading();
    }
};


const updatePage = event => {
    currentPage.value = event;
};

const handleDeleteButton = async (id) => {
    tempId.value = id;
    alert.value = "Bạn có muốn xoá bình luận này không?";
};

const confirmAlert = async () => {

    try {
        const res = await axios.delete(`reviews-comments/delete/${tempId.value}`);

        if (res.status === 200) {
            fetchReviews();
        }
    }
    catch (e) {
        console.log(e);
    }
    alert.value = "";
};

const handleToggleButton = async id => {
    try {
        const res = await axios.put(`reviews/toggleApprove/${id}`);

        if (res.status === 200) {
            fetchReviews();
        }
    }
    catch (e) {
        console.log(e);
    }
};

watch(status, () => {
    currentPage.value = 1;
});
watch([currentPage, status], fetchReviews);

onMounted(fetchReviews);
</script>
<template>
    <v-card>
        <v-container>
            <v-row>
                <v-col
                    cols="12"
                    class="d-flex align-center"
                >
                    <h2>Danh sách đánh giá</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="6"
                    sm="4"
                >
                    <v-select
                        density="compact"
                        label="Trạng thái"
                        :items="statuses"
                        v-model="status"
                        variant="outlined"
                        hide-details
                    ></v-select>
                </v-col>
            </v-row>
            <v-row v-if="alert">
                <v-col>
                    <v-alert
                        type="warning"
                        :text="alert"
                        :model-value="!!alert"
                        variant="tonal"
                    >
                        <template #append>
                            <v-btn
                                density="compact"
                                color="red-accent-4"
                                icon="mdi-window-close"
                                variant="flat"
                                class="mr-2"
                                @click="alert = ''"
                            ></v-btn>
                            <v-btn
                                density="compact"
                                color="success"
                                icon="mdi-check"
                                variant="flat"
                                @click="confirmAlert"
                            ></v-btn>
                        </template>
                    </v-alert>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-data-table
                        :items-per-page="rowsPerPage"
                        :page="currentPage"
                        :headers="headers"
                        :items="reviews"
                        class="elevation-1"
                        item-value="review"
                        hover
                        no-data-text="Không có bình luận!"
                    >
                        <template #item.name="{ item }">
                            <router-link :to="`/san-pham/${getSlugByName(item.raw.name)}`">{{ item.raw.name }}</router-link>
                        </template>
                        <template #item.isApproved="{ item }">
                            <v-switch
                                color="red-accent-4"
                                :model-value="item.raw.isApproved === 1 ? true : false"
                                @update:modelValue="() => handleToggleButton(item.raw.id)"
                                hide-details
                            ></v-switch>
                        </template>

                        <template #item.action="{ item }">
                            <div class="d-flex align-center">
                                <v-btn
                                    v-if="!item.raw.isApproved"
                                    size="small"
                                    variant="tonal"
                                    icon="mdi-trash-can-outline"
                                    color="red-accent-4"
                                    @click="() => handleDeleteButton(item.raw.id)"
                                >
                                </v-btn>
                            </div>
                        </template>
                        <template #bottom>
                            <GlobalPagination
                                v-if="numberOfPages > 1"
                                :numberOfPages="numberOfPages"
                                :page="currentPage"
                                @update:page="updatePage"
                            ></GlobalPagination>
                        </template>
                    </v-data-table>
                </v-col>
            </v-row>

        </v-container>
    </v-card>
</template>

<style>
.more {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
</style>
