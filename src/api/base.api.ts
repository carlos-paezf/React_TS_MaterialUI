import axios from "axios"


const baseURL = import.meta.env.VITE_APP_BASEURL


export const instance = axios.create( {
    baseURL
} )