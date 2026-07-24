import { transactionsApi } from '@/services/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ITransactions {
    id: string | number;
    title: string;
    category: string;
    amount: number;
    date: string;
}

interface IInitialState {
    transactions: ITransactions[];
    fetchStatus: string;
    postStatus: string;
    error: string | null;
}

const initialState: IInitialState = {
    transactions: [],
    fetchStatus: '',
    postStatus: '',
    error: '',
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
                state.fetchStatus = 'succeeded';
                state.transactions = action.payload;
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                const errorPayload = action.payload;
                state.error =
                    errorPayload?.message ||
                    action.error.message ||
                    'Невідома помилка...';
            })

            // add new transaction
            .addCase(postTransaction.pending, (state) => {
                state.postStatus = 'loading';
            })
            .addCase(postTransaction.fulfilled, (state, action) => {
                state.postStatus = 'succeeded';
                state.transactions.push(action.payload);
            })
            .addCase(postTransaction.rejected, (state, action) => {
                state.postStatus = 'failed';
                const errorPayload = action.payload;
                state.error =
                    errorPayload?.message ||
                    action.error.message ||
                    'Невідома помилка...';
            });
    },
});

export const fetchTransactions = createAsyncThunk(
    'transactions/fetchTransactions',
    async (_, { rejectWithValue }) => {
        try {
            return await transactionsApi.getTransactions();
        } catch (e) {
            const errorMessage = e.message || 'Помилка загрузки категорій...';
            return rejectWithValue({
                message: errorMessage,
                type: e.type || 'ERROR',
                status: e.status,
            });
        }
    },
);

export const postTransaction = createAsyncThunk(
    'transactions/postTransaction',
    async (transactionData, { rejectWithValue }) => {
        try {
            return await transactionsApi.addTransaction(transactionData);
        } catch (e) {
            const errorMessage =
                e.message || 'Помилка добавлення транзакції...';
            return rejectWithValue({
                message: errorMessage,
                type: e.type || 'ERROR',
                status: e.status,
            });
        }
    },
);

export default transactionSlice;
