import axios from 'axios'


export const apiClient = axios.create({
    baseURL: 'https://api.mediavault.fallow.in',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});