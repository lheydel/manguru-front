import { AxiosRequestConfig } from 'axios';
import Cookies from 'universal-cookie';

export const requestConfig: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
};

export const cookies = new Cookies();
