import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async () => {
        const response = await fetch(`${BASE_URL}/transactions`);
        if (!response.ok) throw new Error('Failed to fetch transactions');
        return response.json();
    },
);

export const postTransaction = createAsyncThunk(
    'transactions/postTransaction',
    async (transactionData) => {
        const response = await fetch(`${BASE_URL}/transactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(transactionData),
        });
        if (!response.ok) throw new Error('Failed to post transaction');
        return response.json();
    },
);

const initialState = {
    transactions: [],
    status: '',
    error: null,
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    extraReducers: (builder) => {
        builder
            // get transactions
            .addCase(fetchTransactions.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // add new transaction
            .addCase(postTransaction.fulfilled, (state, action) => {
                state.transactions.push(action.payload);
            })
            .addCase(postTransaction.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export default transactionSlice;
