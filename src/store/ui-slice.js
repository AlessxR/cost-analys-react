import { createSlice } from '@reduxjs/toolkit';

const MONTH_NAMES = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
];

const now = new Date();
const CURRENT_MONTH_VALUE = MONTH_NAMES[now.getMonth()] + now.getFullYear();

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
