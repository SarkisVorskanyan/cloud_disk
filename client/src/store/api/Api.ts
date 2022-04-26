import axios  from 'axios';

const token: string | null = localStorage.getItem('token') ? localStorage.getItem('token') : null;

export const instance = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        // 'Content-Type' : 'multipart/form-data; application/x-www-form-urlencoded; charset=UTF-8;application/json',
        // 'Access-Control-Allow-Origin' : '*',
        // 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Authorization': `Bearer ${token}`
    }
})