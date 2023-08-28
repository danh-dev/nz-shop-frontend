<script setup></script>

<template>
    <v-sheet
        width="100%"
        class="mx-auto"
    >
        <h2 class="text-center text-uppercase mb-4">Tạo mật khẩu mới</h2>
        <v-form>
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                        class="py-1"
                    >
                        <div class="mb-3 font-weight-bold ">Nhập mật khẩu hiện tại:</div>
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
                            :counter="50"
                            :type="'password'"
                            label="Mật khẩu hiện tại của bạn"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                        class="py-1"
                    >
                        <div class="mb-3 font-weight-bold ">Tạo mật khẩu mới:</div>
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
                            :counter="50"
                            label="Mật khẩu mới của bạn"
                            hint="Mật khẩu phải nhiều hơn 8 ký tự, ít nhất 1 chữ in hoa, 1 chữ số, 1 ký tự đặc biệt"
                        >
                        </v-text-field>

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
                            :counter="50"
                            label="Xác nhận mật khẩu"
                        ></v-text-field>
                    </v-col>
                </v-row>

            </v-container>
        </v-form>
    </v-sheet>
</template>

<style></style>