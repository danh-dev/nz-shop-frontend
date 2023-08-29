<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
    user: Object,
    orders: Array
});;
const spend = computed(() => {
    return props.orders.reduce((result, item) => {
        if (item.status === "Đã giao") {
            return result += item.products.reduce((total, item) => total += item.price * item.quantity, 0);
        }
        return result;
    }, 0);
});

const items = [
    {
        name: "Nam",
        value: 1,
    },
    {
        name: "Nu",
        value: 0,
    }
];
const newUser = ref(
    {
        name: {
            value: props.user.name,
            readonly: true,
        },
        gender: {
            value: props.user.gender,
            readonly: true,
        },
        address: {
            value: props.user.address,
            readonly: true,
        },
    }
);

const show = ref(false);

</script>

<template>
    <v-sheet
        width="600px"
        class="mx-auto"
    >
        <h2 class="text-center text-uppercase mb-4">Thông tin tài khoản của bạn</h2>
        <v-form>
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        class="py-1"
                    >
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            :counter="50"
                            label="Họ và tên"
                            v-model="newUser.name.value"
                            :append-inner-icon="newUser.name.readonly ? 'mdi-square-edit-outline' : ''"
                            :readonly="newUser.name.readonly"
                            :clearable="!newUser.name.readonly"
                            @click:append-inner="newUser.name.readonly = false"
                            @blur="($event) => {
                                newUser.name.readonly = true;
                                if (!$event.target.value) {
                                    newUser.name.value = props.user.name;
                                }
                            }"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        class="py-1"
                    >
                        <v-select
                            variant="outlined"
                            density="compact"
                            v-model="newUser.gender.value"
                            label="Giới tính"
                            menu-icon=""
                            :append-inner-icon="newUser.gender.readonly ? 'mdi-square-edit-outline' : '$dropdown'"
                            :readonly="newUser.gender.readonly"
                            :items="items"
                            item-title="name"
                            item-value="value"
                            @click:append-inner="newUser.gender.readonly = false"
                            @blur="newUser.gender.readonly = true"
                        ></v-select>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        class="py-1"
                    >
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            :model-value="user.phone"
                            label="Số điện thoại"
                            readonly
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        class="py-1"
                    >
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            :model-value="user.date"
                            label="Ngày tham gia"
                            readonly
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        class="py-1"
                    >
                        <v-text-field
                            variant="outlined"
                            density="compact"
                            :model-value="spend"
                            label="Tổng tiền đã mua sắm"
                            readonly
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        class="py-1"
                    >
                        <v-textarea
                            variant="outlined"
                            density="compact"
                            v-model="newUser.address.value"
                            label="Địa chỉ"
                            :append-inner-icon="newUser.address.readonly ? 'mdi-square-edit-outline' : ''"
                            :readonly="newUser.address.readonly"
                            :clearable="!newUser.address.readonly"
                            :counter="200"
                            rows="4"
                            auto-grow
                            @click:append-inner="newUser.address.readonly = false"
                            @blur="($event) => {
                                newUser.address.readonly = true;
                                if (!$event.target.value) {
                                    newUser.address.value = props.user.address;
                                }
                            }"
                        ></v-textarea>

                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        class="py-1"
                    >
                        <v-text-field
                            model-value="hello world"
                            variant="outlined"
                            density="compact"
                            type="password"
                            label="Mật khẩu"
                            append-inner-icon="mdi-square-edit-outline"
                            readonly
                            @click:append-inner="router.push('/user/account/change-password')"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        class="py-1"
                    >
                        <v-btn
                            color="red-accent-4"
                            block
                        >Cập nhật thông tin</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </v-sheet>
</template>

<style></style>