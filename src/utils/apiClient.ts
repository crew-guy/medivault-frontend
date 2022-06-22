import axios from 'axios'


export const apiClient = axios.create({
    baseURL: 'https://4vshz4x0r0.execute-api.ap-south-1.amazonaws.com/prod',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});