import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { categoriesApi } from '@/services/api';

import { ICategory, IInitialCategories } from '@/types';

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

const initialState: IInitialCategories = {
    categories: [],
    fetchStatus: 'idle',
    error: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.fetchStatus = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.fetchStatus = 'succeeded';
                state.categories = action.payload;
                state.error = null;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.fetchStatus = 'failed';
                state.error =
                    action.payload ??
                    action.error.message ??
                    'Невідома помилка...';
            });
    },
});

export default categoriesSlice;
