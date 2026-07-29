import { describe, it, expect } from 'vitest';

import uiSlice from '@/store/ui-slice';
import { MONTH_NAMES } from '@/data';

const { reducer, actions } = uiSlice;

describe('uiSlice reducer', () => {
    it('should return the initial state with the current month', () => {
        const now = new Date();
        const expectedMonth = `${MONTH_NAMES[now.getMonth()]}${now.getFullYear()}`;

        const state = reducer(undefined, { type: 'unknown' });

        expect(state.selectedMonth).toBe(expectedMonth);
    });

    it('should update selectedMonth when setSelectedMonth is dispatched', () => {
        const state = reducer(
            undefined,
            actions.setSelectedMonth('august2026'),
        );

        expect(state.selectedMonth).toBe('august2026');
    });
});
