import { ITransaction, Status } from '@/types';

export type NewTransaction = Omit<ITransaction, 'id'>;

export interface IInitialTransactions {
    transactions: ITransaction[];
    fetchStatus: Status;
    postStatus: Status;
    error: string | null;
}
