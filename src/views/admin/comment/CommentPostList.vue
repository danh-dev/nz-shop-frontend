<script setup>
import { ref, onMounted, watch, onBeforeMount } from "vue";
import axios from "../../../axiosComfig";
import { mapKeys, camelCase, lowerFirst } from "lodash";
import GlobalPagination from "../../../components/globals/GlobalPagination.vue";

import { siteData } from "@/stores/globals.js";
const siteStore = siteData();

const dialog = ref(false);

const url = import.meta.env.VITE_PUBLIC_URL;

const saveId = ref(null);
const headers = [
    {
        title: "Người bình luận",
        align: "start",
        sortable: false,
        key: "fullName",
    },
    {
        title: "Nội dung",
        sortable: false,
        key: "comment",
        align: "start"
    },
    {
        title: "Bài viết",
        sortable: false,
        key: "post",
        align: "start"
    },
    {
        title: "Thời gian",
        key: "updatedAt",
        align: "start"
    },
    {
        title: "Trạng thái",
        key: "isApproved",
        align: "start"
    },
    {
        title: "Chức năng",
        sortable: false,
        key: "action",
        align: "start"
    },
    {
        title: "Feedback",
        sortable: false,
        key: "feedbackCount",
        align: "start"
    }
];
const headers1 = [
    {
        title: "Người bình luận",
        align: "start",
        sortable: false,
        key: "fullName",
    },
    {
        title: "Nội dung",
        sortable: false,
        key: "comment",
        align: "start"
    },
    {
        title: "Thời gian",
        key: "updatedAt",
        align: "start"
    },
    {
        title: "Trạng thái",
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

const comments = ref([]);
const feedbacks = ref([]);
const rowsPerPage = 7;
const numberOfPages = ref(0);
const numberOfPages1 = ref(0);
const currentPage = ref(1);
const currentPage1 = ref(1);

const alert = ref("");
const alert1 = ref("");
const tempId = ref(0);
const tempStatus = ref(null);

const status = ref(null);
const status1 = ref(null);
const statuses = [
    {
        title: "Tất cả",
        value: null,
    },
    {
        title: "Đã duyệt",
        value: false,
    },
    {
        title: "Chờ duyệt",
        value: true,
    }
];

const fetchComments = async () => {
    try {
        let url = `post-comments/?page=${currentPage.value}&per_page=${rowsPerPage}`;
        if (status.value !== null) {
            url += `&is_approved=${status.value}`;
        }
        siteStore.hasLoading();
        const res = await axios.get(url);
        if (res.status === 200) {
            comments.value = res.data.data.map(comment => mapKeys(comment, (value, key) => camelCase(key)));
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

const fetchFeedbacks = async id => {
    saveId.value = id;
    try {
        let url = `post-comment-pagination/${id}/feedback?page=${currentPage.value}&per_page=${rowsPerPage}`;
        if (status1.value !== null) {
            url += `&is_approved=${status1.value}`;
        }
        siteStore.hasLoading();
        const res = await axios.get(url);

        if (res.status === 200) {
            feedbacks.value = res.data.data.feedbacks.map(feedback => mapKeys(feedback, (value, key) => camelCase(key)));
            numberOfPages1.value = res.data.data.numberOfPages;
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

const handleDeleteButton = async (id, name) => {
    tempId.value = id;
    alert.value = `Bạn có muốn xoá bình luận ${name} không?`;
};

const handleDeleteButton1 = async (id) => {
    tempId.value = id;
    alert1.value = "Bạn có muốn xoá bình luận này không?";
};

const confirmAlert = async () => {

    try {
        const res = await axios.delete(`post-comments/delete/${tempId.value}`);

        if (res.status === 200) {
            fetchComments();
        }
    }
    catch (e) {
        console.log(e);
    }
    alert.value = "";
};

const confirmAlert1 = async () => {

    try {
        const res = await axios.delete(`post-feedbacks/delete/${tempId.value}`);

        if (res.status === 200) {
            fetchFeedbacks(saveId.value);
            fetchComments();
        }
    }
    catch (e) {
        console.log(e);
    }
    alert1.value = "";
};

const handleToggleButton = async id => {
    try {
        const res = await axios.put(`post-comments/toggle/${id}`);

        if (res.status === 200) {
            fetchComments();
        }
    }
    catch (e) {
        console.log(e);
    }
};

const handleToggleButton1 = async id => {
    try {
        const res = await axios.put(`post-feedbacks/toggle/${id}`);

        if (res.status === 200) {
            fetchFeedbacks(saveId.value);
            fetchComments();
        }
    }
    catch (e) {
        console.log(e);
    }
};

watch(status, () => {
    currentPage.value = 1;
});

watch([currentPage, status], fetchComments);

onMounted(fetchComments);
</script>

<template>
    <v-container>
        <v-row>
            <v-col
                cols="12"
                class="d-flex align-center"
            >
                <h2>Danh sách bình luận</h2>
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
                    :items="comments"
                    class="elevation-1"
                    item-value="comment"
                    hover
                    no-data-text="Không có bình luận!"
                >
                    <template #item.isApproved="{ item }">
                        <v-switch
                            color="red-accent-4"
                            :model-value="!item.raw.isApproved"
                            @update:modelValue="() => handleToggleButton(item.raw.id)"
                            hide-details
                        ></v-switch>
                    </template>

                    <template #item.action="{ item }">
                        <div class="d-flex">
                            <v-btn
                                v-if="item.raw.isApproved"
                                size="small"
                                variant="tonal"
                                icon="mdi-trash-can-outline"
                                color="red-accent-4"
                                @click="() => handleDeleteButton(item.raw.id, item.raw.name)"
                            >
                            </v-btn>
                            <v-btn
                                v-if="item.raw.feedbackCount > 0"
                                size="25"
                                variant="text"
                                rounded="circle"
                                :ripple="false"
                                @click="() => fetchFeedbacks(item.raw.id)"
                            >
                                <v-dialog
                                    v-model="dialog"
                                    activator="parent"
                                    width="auto"
                                >
                                    <v-card>
                                        <v-row v-if="alert1">
                                            <v-col>
                                                <v-alert
                                                    type="warning"
                                                    :text="alert1"
                                                    :model-value="!!alert1"
                                                    variant="tonal"
                                                >
                                                    <template #append>
                                                        <v-btn
                                                            density="compact"
                                                            color="red-accent-4"
                                                            icon="mdi-window-close"
                                                            variant="flat"
                                                            class="mr-2"
                                                            @click="alert1 = ''"
                                                        ></v-btn>
                                                        <v-btn
                                                            density="compact"
                                                            color="success"
                                                            icon="mdi-check"
                                                            variant="flat"
                                                            @click="confirmAlert1"
                                                        ></v-btn>
                                                    </template>
                                                </v-alert>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                <v-data-table
                                                    :items-per-page="rowsPerPage"
                                                    :page="currentPage1"
                                                    :headers="headers1"
                                                    :items="feedbacks"
                                                    class="elevation-1"
                                                    item-value="comment"
                                                    hover
                                                    no-data-text="Không có bình luận!"
                                                >
                                                    <template #item.isApproved="{ item }">
                                                        <v-switch
                                                            color="red-accent-4"
                                                            :model-value="!item.raw.isApproved"
                                                            @update:modelValue="() => handleToggleButton1(item.raw.id)"
                                                            hide-details
                                                        ></v-switch>
                                                    </template>
                                                    <template #item.action="{ item }">
                                                        <div class="d-flex align-center">
                                                            <v-btn
                                                                v-if="item.raw.isApproved"
                                                                size="small"
                                                                variant="tonal"
                                                                icon="mdi-trash-can-outline"
                                                                color="red-accent-4"
                                                                @click="() => handleDeleteButton1(item.raw.id)"
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
                                        <v-card-actions>
                                            <v-btn
                                                color="primary"
                                                block
                                                @click="dialog = false"
                                            >Close Dialog</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <v-badge
                                    color="error"
                                    :content="item.raw.pendingFeedbackCount"
                                >
                                    <v-icon size="25">mdi-bell-outline</v-icon>
                                </v-badge>
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
</template>

<style>
.more {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
</style> 
