import axios  from 'axios';
import { API_URL } from '../../config/Config';

const token: string | null = localStorage.getItem('token') ? localStorage.getItem('token') : null;

export const instance = axios.create({
    baseURL: `${API_URL}`,
    headers: {
        // 'Content-Type' : 'multipart/form-data; application/x-www-form-urlencoded; charset=UTF-8;application/json',
        // 'Access-Control-Allow-Origin' : '*',
        // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Authorization': `Bearer ${token}`
    },
    // onUploadProgress: progressEvent => {
    //     const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
    //     console.log('total', totalLength)
    //     if (totalLength) {
    //         let progress = Math.round((progressEvent.loaded * 100) / totalLength)
    //         console.log(progress)
    //     }
    // },
})