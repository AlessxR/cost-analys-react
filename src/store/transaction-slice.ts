import { transactionsApi } from '@/services/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { IInitialTransaction, INewTransaction, ITransaction } from '@/types';

export const fetchTransactions = createAsyncThunk<
    ITransaction[],
    void,
    { rejectValue: string }
>('transactions/fetchTransactions', async (_, { rejectWithValue }) => {
    try {
        return await transactionsApi.getTransactions();
    } catch (e) {
        return rejectWithValue(
            e instanceof Error ? e.message : 'Помилка отримання транзакцій',
        );
    }
});

export const postTransaction = createAsyncThunk<
    ITransaction,
    INewTransaction,
    { rejectValue: string }
>(
    'transactions/postTransaction',
    async (transactionData: INewTransaction, { rejectWithValue }) => {
        try {
            return await transactionsApi.addTransaction(transactionData);
        } catch (e) {
            return rejectWithValue(
                e instanceof Error
                    ? e.message
                    : 'Помилка додавання транзакції...',
            );
        }
    },
);

const initialState: IInitialTransaction = {
    transactions: [],
    fetchStatus: 'idle',
    postStatus: 'idle',
    error: null,
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // get transactions
            .addCase(fetchTransactions.pending, (state) => {
                state.fetchStatus = 'loading';
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.error = null;
                state.fetchStatus = 'succeeded';
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.error =
                    action.payload ??
                    action.error.message ??
                    'Помилка отримання транзакції...';
            })

            // add new transaction
            .addCase(postTransaction.pending, (state) => {
                state.postStatus = 'loading';
            })
            .addCase(postTransaction.fulfilled, (state, action) => {
                state.error = null;
                state.postStatus = 'succeeded';
                state.transactions.push(action.payload);
            })
            .addCase(postTransaction.rejected, (state, action) => {
                state.postStatus = 'failed';
                state.error =
                    action.payload ??
                    action.error.message ??
                    'Помилка додавання транзакції...';
            });
    },
});

export default transactionSlice;
