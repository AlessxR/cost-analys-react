import { configureStore } from '@reduxjs/toolkit';

import transactionSlice from './transaction-slice/transaction-slice';
import categoriesSlice from './categories-slice/categories-slice';
import uiSlice from './ui-slice';

const store = configureStore({
    reducer: {
        transactions: transactionSlice.reducer,
        categories: categoriesSlice.reducer,
        ui: uiSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
