import { defineStore } from "pinia";
import { ref } from "vue";

export const siteData = defineStore("siteData", () => {
	const isLoading = ref(false);
	const apiMessages = ref([]);
	const hasLoading = () => {
		isLoading.value = true;
	};
	const doneLoading = () => {
		isLoading.value = false;
	};
	const hasRes = res => {
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
	};
});
