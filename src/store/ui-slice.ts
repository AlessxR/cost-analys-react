import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MONTH_NAMES } from '@/data';

const getCurrentMonthValue = () => {
    const now = new Date();
    return MONTH_NAMES[now.getMonth()] + now.getFullYear();
};

const initialState = {
    selectedMonth: getCurrentMonthValue(),
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setSelectedMonth: (state, action: PayloadAction<string>) => {
            state.selectedMonth = action.payload;
        },
    },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
