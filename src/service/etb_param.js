import axios from "axios";
import { BASE_URL_ETB } from "../config/config";

export const etbParamService = axios.create({
    baseURL : BASE_URL_ETB,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000,
    method: 'post'
})