import { AxiosRequestConfig } from 'axios';
import { Cookie } from './properties';
import Cookies from 'universal-cookie';

export function requestConfig(): AxiosRequestConfig {
    const token = localStorage.getItem(Cookie.AUTH) || cookies.get(Cookie.AUTH);
    return {
        headers: {
            'Content-Type': 'application/json',
            [Cookie.AUTH]: `Bearer ${token}`,
        }
    };
}

export const cookies = new Cookies();
