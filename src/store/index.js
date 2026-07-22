import { configureStore } from '@reduxjs/toolkit';

import transactionSlice from './transaction-slice';
import categoriesSlice from './categories-slice';

const store = configureStore({
    reducer: {
        transactions: transactionSlice.reducer,
        categories: categoriesSlice.reducer,
    },
});

export default store;
