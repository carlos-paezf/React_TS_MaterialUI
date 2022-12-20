import axios from "axios"


const baseURL = 'https://rickandmortyapi.com/api'


export const instance = axios.create( {
    baseURL
} )