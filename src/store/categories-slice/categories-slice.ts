import { categoriesApi } from '@/services/api';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { ICategory, IInitialCategories } from './categories.types';

const initialState: IInitialCategories = {
    categories: [],
    status: 'idle',
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
                    action.payload ??
                    action.error.message ??
                    'Невідома помилка...';
            });
    },
});

export const fetchCategories = createAsyncThunk<
    ICategory[],
    void,
    { rejectValue: string }
>('categories/fetchCategories', async (_, { rejectWithValue }) => {
    try {
        return await categoriesApi.getCategories();
    } catch (e) {
        return rejectWithValue(
            e instanceof Error ? e.message : 'Помилка отримання категорій...',
        );
    }
});

export default categoriesSlice;
