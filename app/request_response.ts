import axios, { Axios } from "axios";


const client = axios.create({
    baseURL:"http://192.168.110.251:8800",
    headers:{"Content-Type":"appliction/json"},
    timeout:10_000
});
export default client