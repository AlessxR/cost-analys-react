import categoriesSlice, { fetchCategories } from '@/store/categories-slice';
import { ICategory, IInitialCategories } from '@/types';

const initialState: IInitialCategories = {
    categories: [],
    fetchStatus: 'idle',
    error: null,
};

const mockCategory: ICategory = {
    label: 'Продукти',
    value: 'Продукти',
};

describe('categoriesSlice reducer', () => {
    it('should return the initial state', () => {
        const action = { type: 'unknown' };
        expect(categoriesSlice.reducer(undefined, action)).toEqual(initialState);
    });

    it('should set fetchStatus to loading when fetchCategories is pending', () => {
        const action = { type: fetchCategories.pending.type };
        const state = categoriesSlice.reducer(initialState, action);

        expect(state.fetchStatus).toBe('loading');
    });

    it('should set categories when fetchCategories is fulfilled', () => {
        const mockCategories: ICategory[] = [mockCategory];
        const action = {
            type: fetchCategories.fulfilled.type,
            payload: mockCategories,
        };
        const state = categoriesSlice.reducer(initialState, action);

        expect(state.fetchStatus).toBe('succeeded');
        expect(state.categories).toEqual(mockCategories);
        expect(state.error).toBeNull();
    });

    it('should set error when fetchCategories is rejected', () => {
        const action = {
            type: fetchCategories.rejected.type,
            payload: 'Помилка отримання категорій...',
        };
        const state = categoriesSlice.reducer(initialState, action);

        expect(state.fetchStatus).toBe('failed');
        expect(state.error).toBe('Помилка отримання категорій...');
    });
});
