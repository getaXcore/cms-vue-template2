import axios from "axios";
import { BASE_URL } from "../config/config";

export const mbmpService = axios.create({
    baseURL : BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000,
    method: 'post'
})