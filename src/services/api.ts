import { INewTransaction } from '@/types';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const categoriesApi = {
    async getCategories() {
        return instance.get('/categories').then((res) => res.data);
    },
};

export const transactionsApi = {
    async getTransactions() {
        const response = await instance.get('/transactions');
        return response.data;
    },

    async addTransaction(transactionData: INewTransaction) {
        const response = await instance.post('/transactions', transactionData);
        return response.data;
    },
};
