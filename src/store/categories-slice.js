import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://6a60b66bda10c59c180902cc.mockapi.io';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async () => {
        const response = await fetch(`${BASE_URL}/categories`);
        if (!response.ok) throw new Error('Failed to fetch transactions');
        return response.json();
    },
);

const initialState = {
    categories: [],
    status: '',
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
                state.error = action.error.message;
            });
    },
});

export const counterActions = categoriesSlice.actions;
export default categoriesSlice;
