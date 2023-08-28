import axios from "axios";

const accessToken = window.localStorage.getItem('accessToken')
axios.defaults.baseURL = 'http://127.0.0.1:4545/api/'

if (accessToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
}
