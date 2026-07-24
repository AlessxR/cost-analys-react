import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTransactionsForMonth } from '@/lib/utils';

export const useMonthFilter = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const { transactions, fetchStatus, error } = useSelector(
        (state) => state.transactions,
    );
    const { selectedMonth } = useSelector((state) => state.ui);
    const { categories } = useSelector((state) => state.categories);

    const monthTransactions = useMemo(
        () => getTransactionsForMonth(transactions, selectedMonth),
        [transactions, selectedMonth],
    );

    const categoryFiltered = useMemo(
        () =>
            activeFilter === 'all'
                ? monthTransactions
                : monthTransactions.filter(
                      (transaction) => transaction.category === activeFilter,
                  ),
        [monthTransactions, activeFilter],
    );

    const filtered = useMemo(
        () =>
            searchTerm.trim()
                ? categoryFiltered.filter((transaction) =>
                      transaction.title
                          .toLowerCase()
                          .includes(searchTerm.trim().toLowerCase()),
                  )
                : categoryFiltered,
        [categoryFiltered, searchTerm],
    );

    const updateSearchTerm = (value) => setSearchTerm(value);
    const updateActiveFilter = (filter) => setActiveFilter(filter);

    return {
        activeFilter,
        searchTerm,
        fetchStatus,
        error,
        categories,
        monthTransactions,
        categoryFiltered,
        filtered,
        updateSearchTerm,
        updateActiveFilter,
    };
};
