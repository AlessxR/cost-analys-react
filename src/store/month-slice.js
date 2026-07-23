import { createSlice } from '@reduxjs/toolkit';

const month = new Date().getMonth();
const year = new Date().getFullYear();

const CURRENT_MONTH_VALUE =
    month.toLocaleString('en-US', { month: 'long' }).toLowerCase() + year;

const initialState = {
    selectedMonth: CURRENT_MONTH_VALUE,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setSelectedMonth: (state, action) => {
            state.selectedMonth = action.payload;
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
