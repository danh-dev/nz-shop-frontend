import axios from "axios";

const accessToken = window.localStorage.getItem(import.meta.env.VITE_NAME_KEY_TOKEN||'accessToken')
axios.defaults.baseURL = import.meta.env.VITE_API_URL||'http://127.0.0.1:4545/api/';
axios.defaults.headers.common['X-Vue-Api-Key'] = import.meta.env.VITE_API_KEY||'298967b545b59db60ae6cd9ccceb4479';

if (accessToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
}

export default axios;