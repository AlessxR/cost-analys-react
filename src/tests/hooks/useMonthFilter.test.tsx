import { renderHook, act } from '@testing-library/react';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';

import transactionSlice from '@/store/transaction-slice';
import categoriesSlice from '@/store/categories-slice';
import uiSlice from '@/store/ui-slice';
import { useMonthFilter } from '@/hooks/useMonthFilter';
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
    function Wrapper({ children }: { children: React.ReactNode }) {
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

describe('useMonthFilter', () => {
    it('should return initial state: activeFilter=all, searchTerm=""', () => {
        const store = createStore({
            transactions: {
                transactions: mockTransactions,
                fetchStatus: 'succeeded',
                postStatus: 'idle',
                error: null,
            },
            categories: {
                categories: [{ label: 'Продукти', value: 'Продукти' }],
                fetchStatus: 'succeeded',
                error: null,
            },
            ui: { selectedMonth: 'june2026' },
        });

        const { result } = renderHook(() => useMonthFilter(), {
            wrapper: wrapper(store),
        });

        expect(result.current.activeFilter).toBe('all');
        expect(result.current.searchTerm).toBe('');
        expect(result.current.filtered).toHaveLength(3);
    });

    it('should filter transactions by category', () => {
        const store = createStore({
            transactions: {
                transactions: mockTransactions,
                fetchStatus: 'succeeded',
                postStatus: 'idle',
                error: null,
            },
            categories: {
                categories: [{ label: 'Продукти', value: 'Продукти' }],
                fetchStatus: 'succeeded',
                error: null,
            },
            ui: { selectedMonth: 'june2026' },
        });

        const { result } = renderHook(() => useMonthFilter(), {
            wrapper: wrapper(store),
        });

        act(() => result.current.updateActiveFilter('Продукти'));

        expect(result.current.activeFilter).toBe('Продукти');
        expect(result.current.filtered).toHaveLength(2);
        expect(
            result.current.filtered.every((t) => t.category === 'Продукти'),
        ).toBe(true);
    });

    it('should filter transactions by title case-insensitively', () => {
        const store = createStore({
            transactions: {
                transactions: mockTransactions,
                fetchStatus: 'succeeded',
                postStatus: 'idle',
                error: null,
            },
            categories: {
                categories: [{ label: 'Продукти', value: 'Продукти' }],
                fetchStatus: 'succeeded',
                error: null,
            },
            ui: { selectedMonth: 'june2026' },
        });

        const { result } = renderHook(() => useMonthFilter(), {
            wrapper: wrapper(store),
        });

        act(() => result.current.updateSearchTerm('хліб'));

        expect(result.current.searchTerm).toBe('хліб');
        expect(result.current.filtered).toHaveLength(1);
        expect(result.current.filtered[0].title).toBe('Хліб');
    });
});
