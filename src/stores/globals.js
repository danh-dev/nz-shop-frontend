import {defineStore} from "pinia";
import {ref} from "vue";

export const siteData = defineStore("siteData", () => {
    const isLoading = ref(false);
    const apiMessages = ref([]);
    const isLogin = ref(true);
    const useGuest = ref(false);

    const hasLoading = () => {
        isLoading.value = true;
    };
    const doneLoading = () => {
        isLoading.value = false;
    };
    const configGuest = () =>{
        useGuest.value = true;
    }
    const hasRes = (res) => {
        const newMessage = {
            status: res.data.status,
            message: res.data.message,
            show: true,
        };
        apiMessages.value.push(newMessage);
        setTimeout(() => {
            apiMessages.value.splice(apiMessages.value.indexOf(newMessage), 1);
        }, 5000);
    };
    const errorSystem = () => {
        const errorMessage = {
            status: "error",
            message: "Có lỗi hệ thống! Liên hệ Developer",
            show: true,
        };
        apiMessages.value.push(errorMessage);
        setTimeout(() => {
            apiMessages.value.splice(apiMessages.value.indexOf(errorMessage), 1);
        }, 5000);
    };
    return {
        isLoading,
        hasLoading,
        doneLoading,
        hasRes,
        errorSystem,
        apiMessages,
        useGuest,
        configGuest,
        isLogin
    };
}, {
    persist: {
        paths: ['useGuest','isLogin'],
    },
});