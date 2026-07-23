import { configureStore } from '@reduxjs/toolkit';

import transactionSlice from './transaction-slice';
import categoriesSlice from './categories-slice';
import uiSlice from './month-slice';

const store = configureStore({
    reducer: {
        transactions: transactionSlice.reducer,
        categories: categoriesSlice.reducer,
        ui: uiSlice.reducer,
    },
});

export default store;
