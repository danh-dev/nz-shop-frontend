import {defineStore} from "pinia";
import axios from "axios";

export const authUser = defineStore("authUser", {
    actions: {
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
