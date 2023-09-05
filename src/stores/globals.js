import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "@/axiosComfig";

export const siteData = defineStore("siteData", () => {
        const isLoading = ref(false);
        const apiMessages = ref([]);
        const isLogin = ref();
        const isAdmin = ref();
        const useGuest = ref(false);
        const siteSetings = ref({
            setting_ver: "",
            site_name: "",
            logo_bg: "",
            logo_wh: "",
            logo_mini: "",
            favicon: "",
            lang_code: "",
            shop_address: "",
            shop_phone: "",
            shop_email: "",
            shop_timeWork: "",
            shop_cskh: "",
            shop_cskhkn: "",
            shop_cskhbh: "",
            meta_tag_title: "",
            meta_tag_keywords: "",
            meta_tag_description: "",
            meta_tag_social_img: "",
            main_font: "",
            main_color: "",
        });
        const userInfo = ref({
            user_id: 0,
            full_name: "",
            role: "",
            phone_number: "",
            email: "",
            verified: "",
            status: ""
        });
        const cartInfo = ref({
            cartList:[],
            infoAddress:{},
            coupon:"",
            shipping:0,
            step:0
        })

        const fetchSettingSite = async () => {
            let ver = await axios.get("verSetting");
            if (!siteSetings.value.setting_ver || String(ver.data.setting_ver) !== String(siteSetings.value.setting_ver)) {
                const res = await axios.get("fetchPublicSetting");
                Object.assign(siteSetings.value, res.data);
            }
        };
        const setUserInfo = async (v) => {
            const res = await axios.get(`/users/${v}`);
            if (res) {
                userInfo.value.user_id = v;
                userInfo.value.full_name = res.data.full_name;
                userInfo.value.phone_number = res.data.phone_number;
                userInfo.value.email = res.data.email;
                userInfo.value.role = res.data.role;
                userInfo.value.verified = res.data.verified;
                userInfo.value.status = res.data.status;
                isLogin.value = true;
            } else {
                console.log("Khong tim thay user");
            }
        };
        const logout = async () => {
            try {
                let res = await axios.get("logout");
                hasRes(res);
                if (res.data.isSuccess) {
                    userInfo.value.user_id = 0;
                    userInfo.value.full_name = null;
                    userInfo.value.phone_number = null;
                    userInfo.value.email = null;
                    userInfo.value.role = null;
                    userInfo.value.verified = null;
                    userInfo.value.status = null;
                    isLogin.value = false;
                    localStorage.removeItem(import.meta.env.VITE_NAME_KEY_TOKEN || "accessToken");
                }
            } catch (e) {
                if (e.response.status === 401) {
                    hadDisable();
                } else {
                    errorSystem();
                    console.log(e);
                }
            }
        };
        const hadDisable = () => {
            hasRes({data: {status: "error", message: "Phiên đăng nhập đã hết hạn."}});
            userInfo.value.user_id = 0;
            userInfo.value.full_name = null;
            userInfo.value.phone_number = null;
            userInfo.value.email = null;
            userInfo.value.role = null;
            userInfo.value.verified = null;
            userInfo.value.status = null;
            isLogin.value = false;
            localStorage.removeItem(import.meta.env.VITE_NAME_KEY_TOKEN || "accessToken");
        };

        const hasLoading = () => {
            isLoading.value = true;
        };
        const doneLoading = () => {
            isLoading.value = false;
        };
        const configGuest = () => {
            useGuest.value = true;
        };
        const hasRes = (res) => {
            if (res.status === 401) {
                hadDisable();
            } else {
                const newMessage = {
                    status: res.data.status,
                    message: res.data.message,
                    show: !!res.data.status,
                };
                apiMessages.value.push(newMessage);
                setTimeout(() => {
                    apiMessages.value.splice(apiMessages.value.indexOf(newMessage), 1);
                }, 5000);
            }
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
            apiMessages,
            useGuest,
            isLogin,
            isAdmin,
            siteSetings,
            userInfo,
            cartInfo,
            hasLoading,
            doneLoading,
            hasRes,
            errorSystem,
            setUserInfo,
            configGuest,
            logout,
            fetchSettingSite,
            hadDisable,
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
            paths: ["useGuest", "isLogin", "isAdmin", "userInfo", "siteSetings","cartInfo"],
        },
    });
