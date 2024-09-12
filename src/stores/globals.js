import {defineStore} from "pinia";

export const siteData = defineStore("siteData", {
    state: () => ({
        isLoading: false,
        Status: "",
        Message: {},
    }),
    actions: {
        hasLoading() {
            this.$state.isLoading = true;
        },
        doneLoading() {
            this.$state.isLoading = false;
        },
        hasRes(res) {
            this.$state.Status = res.data.status;
            this.$state.Message = res.data.message;
            setTimeout(() => {
                this.$state.Status = null;
                this.$state.Message = null;
            }, 1000);
        },
        errorSystem() {
            this.$state.Status = "error";
            this.$state.Message = "Có lỗi hệ thống! Liên hệ Developer";
            setTimeout(() => {
                this.$state.Status = null;
                this.$state.Message = null;
            }, 1000);
        }
    }
});
