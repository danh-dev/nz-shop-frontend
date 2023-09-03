import {defineStore} from "pinia";
import {ref} from "vue";

export const siteData = defineStore("siteData", () => {
    const isLoading = ref(false);
    const apiMessages = ref([]);
    const isLogin = ref();
    const isAdmin = ref();
    const useGuest = ref(false);
    const siteSetings = ref({
        linkAdmin:"admincp"
    });


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
        isLogin,
        isAdmin,
        siteSetings
    };
}
// , {
//     persist: {
//         paths: ['useGuest','isLogin','isAdmin'],
//         storage: localStorage,
//         serializer: {
//             serialize: (value) => btoa(JSON.stringify(value)),
//             deserialize: (value) => JSON.parse(atob(value)),
//         },
//     },
// });
, {
    persist: {
        paths: ['useGuest','isLogin','isAdmin'],
    },
});