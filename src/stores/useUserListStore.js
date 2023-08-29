import {defineStore} from "pinia";
import axios from "../axiosComfig";

export const useUserListStore = defineStore("UserListStore", {
    state: () => ({
        total: {},
        coupon: null,
        shipping: 1
    }),
    actions: {
        // listUsers(params) {
        //     return axios.get("/apps/users/list", {params});
        // },
        listUsers() {
            return axios.get("/apps/users/list", {params});
        },
        async userStats() {
            return await axios.get("/userStats");
        },
        async listRoles() {
            return await axios.get("/listRoles");
        },

        addUser(userData) {
            return new Promise((resolve, reject) => {
                axios.post("/apps/users/user", {
                    user: userData,
                }).then(response => resolve(response))
                    .catch(error => reject(error));
            });
        },

        fetchUser(id) {
            return new Promise((resolve, reject) => {
                axios.get(`/apps/users/${id}`).then(response => resolve(response)).catch(error => reject(error));
            });
        },

        deleteUser(id) {
            return new Promise((resolve, reject) => {
                axios.delete(`/apps/users/${id}`).then(response => resolve(response)).catch(error => reject(error));
            });
        },
    },
});
