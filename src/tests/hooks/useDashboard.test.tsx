import { renderHook } from '@testing-library/react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';
import type { ReactNode } from 'react';

import transactionSlice from '@/store/transaction-slice';
import categoriesSlice from '@/store/categories-slice';
import uiSlice from '@/store/ui-slice';
import { useDashboard } from '@/hooks/useDashboard';
import { ITransaction } from '@/types';

const rootReducer = combineReducers({
    transactions: transactionSlice.reducer,
    categories: categoriesSlice.reducer,
    ui: uiSlice.reducer,
});

type RootState = ReturnType<typeof rootReducer>;

const createStore = (preloadedState: Partial<RootState>) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
    });

const wrapper = (store: ReturnType<typeof createStore>) =>
    function Wrapper({ children }: { children: ReactNode }) {
        return <Provider store={store}>{children}</Provider>;
    };

const mockTransactions: ITransaction[] = [
    {
        id: '1',
        title: 'Хліб',
        category: 'Продукти',
        amount: -200,
        date: '2026-06-15',
    },
    {
        id: '2',
        title: 'Таксі',
        category: 'Транспорт',
        amount: -150,
        date: '2026-06-20',
    },
    {
        id: '3',
        title: 'Молоко',
        category: 'Продукти',
        amount: -80,
        date: '2026-06-10',
    },
];

describe('useDashboard', () => {
    it('should return initial idle state', () => {
        const store = createStore({
            transactions: {
                transactions: [],
                fetchStatus: 'idle',
                postStatus: 'idle',
                error: null,
            },
            categories: { categories: [], fetchStatus: 'idle', error: null },
            ui: { selectedMonth: 'june2026' },
        });

        const { result } = renderHook(() => useDashboard(), {
            wrapper: wrapper(store),
        });

        expect(result.current.fetchStatus).toBe('idle');
        expect(result.current.totalSpent).toBe(0);
        expect(result.current.topCategory).toBeNull();
        expect(result.current.monthTransactions).toEqual([]);
    });

    it('should return transactions for the selected month', () => {
        const store = createStore({
            transactions: {
                transactions: mockTransactions,
                fetchStatus: 'succeeded',
                postStatus: 'idle',
                error: null,
            },
            categories: {
                categories: [],
                fetchStatus: 'succeeded',
                error: null,
            },
            ui: { selectedMonth: 'june2026' },
        });

        const { result } = renderHook(() => useDashboard(), {
            wrapper: wrapper(store),
        });

        expect(result.current.monthTransactions).toHaveLength(3);
        expect(result.current.totalSpent).toBe(430);
        expect(result.current.topCategory).not.toBeNull();
        expect(result.current.topCategory!.label).toBe('Продукти');
    });

    it('should return empty monthTransactions when no transactions match the selected month', () => {
        const store = createStore({
            transactions: {
                transactions: mockTransactions,
                fetchStatus: 'succeeded',
                postStatus: 'idle',
                error: null,
            },
            categories: {
                categories: [],
                fetchStatus: 'succeeded',
                error: null,
            },
            ui: { selectedMonth: 'july2026' },
        });

        const { result } = renderHook(() => useDashboard(), {
            wrapper: wrapper(store),
        });

        expect(result.current.monthTransactions).toEqual([]);
        expect(result.current.totalSpent).toBe(0);
    });
});
