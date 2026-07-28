import { useMemo } from 'react';

import { useAppSelector } from '@/store/hooks';

import {
    calculateCategoryBreakdown,
    calculateTotalSpent,
    getTransactionsForMonth,
} from '@/lib/utils';

import { ICategoryBreakdown, ITransaction, Status } from '@/types';

type DashboardResult = {
    transactions: ITransaction[];
    categoryBreakdown: ReturnType<typeof calculateCategoryBreakdown>;
    monthTransactions: ITransaction[];
    fetchStatus: Status;
    totalSpent: number;
    topCategory: ICategoryBreakdown | null;
};

export const useDashboard = (): DashboardResult => {
    const { transactions, fetchStatus } = useAppSelector(
        (state) => state.transactions,
    );
    const { selectedMonth } = useAppSelector((state) => state.ui);

    const monthTransactions = useMemo(
        () => getTransactionsForMonth(transactions, selectedMonth),
        [transactions, selectedMonth],
    );

    const totalSpent = useMemo(
        () => calculateTotalSpent(monthTransactions),
        [monthTransactions],
    );

    const categoryBreakdown = useMemo(
        () => calculateCategoryBreakdown(monthTransactions),
        [monthTransactions],
    );

    const topCategory = categoryBreakdown[0] ?? null;

    return {
        transactions,
        categoryBreakdown,
        monthTransactions,
        fetchStatus,
        totalSpent,
        topCategory,
    };
};
