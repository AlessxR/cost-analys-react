import {
    calculateCategoryBreakdown,
    calculateTotalSpent,
    getTransactionsForMonth,
} from '@/lib/utils';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useDashboard = () => {
    const { transactions, fetchStatus } = useSelector(
        (state) => state.transactions,
    );
    const { selectedMonth } = useSelector((state) => state.ui);

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

    const topCategory = categoryBreakdown[0];

    return {
        transactions,
        selectedMonth,
        categoryBreakdown,
        monthTransactions,
        fetchStatus,
        totalSpent,
        topCategory,
    };
};
