import axios from 'axios'


console.log(process.env.REACT_APP_DEV_API_HOST)
export const apiClient = axios.create({
    baseURL: 'https://api.mediavault.fallow.in',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});