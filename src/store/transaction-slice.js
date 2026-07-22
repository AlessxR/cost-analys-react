import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://6a60b66bda10c59c180902cc.mockapi.io';

export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async () => {
        const response = await fetch(`${BASE_URL}/transactions`);
        if (!response.ok) throw new Error('Failed to fetch transactions');
        return response.json();
    },
);

const initialState = {
    transactions: [],
    status: '',
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export const counterActions = transactionSlice.actions;
export default transactionSlice;
