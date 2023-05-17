import _axios from 'axios';

export const axios = _axios.create({
    baseURL: process.env.NEXT_PUBLIC_BE_BASE_URL,
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
});
