import transactionSlice, { fetchTransactions } from '@/store/transaction-slice';
import { IInitialTransaction } from '@/types';

const initialState: IInitialTransaction = {
    transactions: [],
    fetchStatus: 'idle',
    postStatus: 'idle',
    error: null,
};

describe('transactionsSlice reducer', () => {
    it('should return the initial state', () => {
        const action = { type: 'fsfs' };
        expect(transactionSlice.reducer(undefined, action)).toEqual(
            initialState,
        );
    });

    it('should set status to loading when fetchTransactions is pending', () => {
        const action = { type: fetchTransactions.pending.type };
        const state = transactionSlice.reducer(initialState, action);

        expect(state.fetchStatus).toBe('loading');
    });

    
});
