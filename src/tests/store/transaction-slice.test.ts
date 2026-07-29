import transactionSlice, {
    fetchTransactions,
    postTransaction,
} from '@/store/transaction-slice';
import { IInitialTransaction, ITransaction } from '@/types';

const initialState: IInitialTransaction = {
    transactions: [],
    fetchStatus: 'idle',
    postStatus: 'idle',
    error: null,
};

const mockTransaction: ITransaction = {
    id: '1',
    title: 'Хліб',
    category: 'Продукти',
    amount: -200,
    date: '2025-01-15',
};

describe('transactionsSlice reducer', () => {
    it('should return the initial state', () => {
        const action = { type: 'unknown' };
        expect(transactionSlice.reducer(undefined, action)).toEqual(initialState);
    });

    it('should set fetchStatus to loading when fetchTransactions is pending', () => {
        const action = { type: fetchTransactions.pending.type };
        const state = transactionSlice.reducer(initialState, action);

        expect(state.fetchStatus).toBe('loading');
    });

    it('should set transactions and succeeded status when fetchTransactions is fulfilled', () => {
        const mockTransactions: ITransaction[] = [mockTransaction];
        const action = {
            type: fetchTransactions.fulfilled.type,
            payload: mockTransactions,
        };
        const state = transactionSlice.reducer(initialState, action);

        expect(state.fetchStatus).toBe('succeeded');
        expect(state.transactions).toEqual(mockTransactions);
        expect(state.error).toBeNull();
    });

    it('should set error when fetchTransactions is rejected', () => {
        const action = {
            type: fetchTransactions.rejected.type,
            payload: 'Помилка отримання транзакцій',
        };
        const state = transactionSlice.reducer(initialState, action);

        expect(state.fetchStatus).toBe('failed');
        expect(state.error).toBe('Помилка отримання транзакцій');
    });

    it('should set postStatus to loading when postTransaction is pending', () => {
        const action = { type: postTransaction.pending.type };
        const state = transactionSlice.reducer(initialState, action);

        expect(state.postStatus).toBe('loading');
    });

    it('should push the new transaction when postTransaction is fulfilled', () => {
        const action = {
            type: postTransaction.fulfilled.type,
            payload: mockTransaction,
        };
        const state = transactionSlice.reducer(initialState, action);

        expect(state.postStatus).toBe('succeeded');
        expect(state.transactions).toHaveLength(1);
        expect(state.transactions[0]).toEqual(mockTransaction);
        expect(state.error).toBeNull();
    });

    it('should set error when postTransaction is rejected', () => {
        const action = {
            type: postTransaction.rejected.type,
            payload: 'Помилка додавання транзакції...',
        };
        const state = transactionSlice.reducer(initialState, action);

        expect(state.postStatus).toBe('failed');
        expect(state.error).toBe('Помилка додавання транзакції...');
    });
});
