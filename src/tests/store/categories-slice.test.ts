import categoriesSlice from '@/store/categories-slice';
import { IInitialCategories } from '@/types';

const initialState: IInitialCategories = {
    categories: [],
    fetchStatus: 'idle',
    error: null,
};

describe('categoriesSlice reducer', () => {
    it('should return the initial state', () => {
        const action = { type: 'fsfs' };
        expect(categoriesSlice.reducer(undefined, action)).toEqual(
            initialState,
        );
    });
});
