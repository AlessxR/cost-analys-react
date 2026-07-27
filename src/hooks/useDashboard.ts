import { useMemo } from 'react';

import {
    calculateCategoryBreakdown,
    calculateTotalSpent,
    getTransactionsForMonth,
} from '@/lib/utils';

import { useAppSelector } from '@/store/hooks';

import { ICategoryBreakdown, ITransaction } from '@/types';

type DashboardResult = {
    transactions: ITransaction[];
    selectedMonth: string;
    categoryBreakdown: ReturnType<typeof calculateCategoryBreakdown>;
    monthTransactions: ITransaction[];
    fetchStatus: string;
    totalSpent: number;
    topCategory: ICategoryBreakdown | null;
};

export function useDashboard(): DashboardResult {
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
        selectedMonth,
        categoryBreakdown,
        monthTransactions,
        fetchStatus,
        totalSpent,
        topCategory,
    };
}
