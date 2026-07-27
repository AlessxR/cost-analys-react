import { Status } from '.';

export interface ITransaction {
    id?: string;
    title: string;
    category: string;
    amount: number;
    date: string;
}

export type INewTransaction = Omit<ITransaction, 'id'>;

export interface IInitialTransaction {
    transactions: ITransaction[];
    fetchStatus: Status;
    postStatus: Status;
    error: null | string;
}
