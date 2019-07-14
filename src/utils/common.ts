import { AxiosRequestConfig } from 'axios';

export const requestConfig: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
};
