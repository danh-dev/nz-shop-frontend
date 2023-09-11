import axios from "axios";

const accessToken = window.localStorage.getItem(import.meta.env.VITE_NAME_KEY_TOKEN || 'accessToken');
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:4545/api/';
axios.defaults.headers.common[import.meta.env.VITE_API_NAME_KEY || 'X-Vue-Api-Key'] = import.meta.env.VITE_API_KEY || '298967b545b59db60ae6cd9ccceb4479';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:4545/api/";

if (accessToken) {
	axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
}
// axios.interceptors.response.use(
// 	function (response) {
// 		if (response.data && response.data.data) {
// 			const key_base64 = 'y4XncAVnKZ+CMgzYgPsMeuwW5RIJMCzp4AfgPbGAqR0=';
// 			const encrypted_json = JSON.parse(atob(response.data.data));
// 			const key = CryptoJS.enc.Base64.parse(key_base64);
// 			const iv = CryptoJS.enc.Base64.parse(encrypted_json.iv);
// 			const value = CryptoJS.enc.Base64.parse(encrypted_json.value);
// 			const decrypted = CryptoJS.AES.decrypt({ ciphertext: value }, key, { iv: iv });
// 			response.data.data = decrypted.toString(CryptoJS.enc.Utf8).replace(/^i:|;$/g, '');
// 		}
// 		return response;
// 	},
// 	function (error) {
// 		return Promise.reject(error);
// 	}
// );
export default axios;
