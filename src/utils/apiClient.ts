import axios from 'axios'


export const apiClient = axios.create({
    baseURL: 'https://medivault.fallow.in',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});