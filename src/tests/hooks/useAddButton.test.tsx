import { renderHook, act } from '@testing-library/react';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';

import transactionSlice from '@/store/transaction-slice';
import categoriesSlice from '@/store/categories-slice';
import uiSlice from '@/store/ui-slice';
import { useAddButton } from '@/hooks/useAddButton';

vi.mock('@/components/ui/toaster', () => ({
    toaster: { create: vi.fn() },
}));

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

describe('useAddButton', () => {
    it('should return initial state: isOpen=false, postStatus=idle', () => {
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

        const { result } = renderHook(() => useAddButton(), {
            wrapper: wrapper(store),
        });

        expect(result.current.isOpen).toBe(false);
        expect(result.current.postStatus).toBe('idle');
        expect(result.current.errors).toBeDefined();
        expect(result.current.control).toBeDefined();
        expect(result.current.register).toBeInstanceOf(Function);
        expect(result.current.handleSubmit).toBeInstanceOf(Function);
    });

    it('should set isOpen to true when setIsOpen(true) is called', () => {
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

        const { result } = renderHook(() => useAddButton(), {
            wrapper: wrapper(store),
        });

        act(() => result.current.setIsOpen(true));

        expect(result.current.isOpen).toBe(true);
    });
});
