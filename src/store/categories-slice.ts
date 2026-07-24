import { categoriesApi } from '@/services/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    categories: [],
    status: '',
    error: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                const errorPayload = action.payload;
                state.error =
                    errorPayload?.message ||
                    action.error.message ||
                    'Невідома помилка...';
            });
    },
});

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            return await categoriesApi.getCategories();
        } catch (e) {
            const errorMessage = e.message || 'Помилка завантаження категорій';
            return rejectWithValue({
                message: errorMessage,
                type: e.type || 'ERROR',
                status: e.status,
            });
        }
    },
);

export default categoriesSlice;
