export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface ITransaction {
    id: string | number;
    title: string;
    category: string;
    amount: number;
    date: string;
}

export interface ICategoryBreakdown {
    label: string;
    sum: number;
    percent: number;
}