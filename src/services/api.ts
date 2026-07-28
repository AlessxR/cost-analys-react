import axios from 'axios';

import { ICategory, INewTransaction, ITransaction } from '@/types';

const BASE_URL = import.meta.env.VITE_API_URL;

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const categoriesApi = {
    async getCategories() {
        const response = await instance.get<ICategory[]>('/categories');
        return response.data;
    },
};

export const transactionsApi = {
    async getTransactions() {
        const response = await instance.get<ITransaction[]>('/transactions');
        return response.data;
    },

    async addTransaction(transactionData: INewTransaction) {
        const response = await instance.post<ITransaction>(
            '/transactions',
            transactionData,
        );
        return response.data;
    },
};
