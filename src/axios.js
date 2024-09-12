import axios from "axios";

const accessToken = window.localStorage.getItem('accessToken')
axios.defaults.baseURL = 'http://127.0.0.1:4545/api/'
axios.defaults.headers.common['X-Vue-Api-Key'] = '298967b545b59db60ae6cd9ccceb4479';

if (accessToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
}
