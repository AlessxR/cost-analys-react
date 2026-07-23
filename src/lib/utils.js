import { MONTH_LABELS } from '@/data';

export const calculateTotalSpent = (transactions) =>
    transactions
        .filter((el) => el.amount < 0)
        .reduce((acc, el) => acc + Math.abs(Number(el.amount)), 0);

export const calculateCategoryBreakdown = (transactions) => {
    const expenses = transactions.filter((el) => Number(el.amount) < 0);
    const totalSpent = expenses.reduce(
        (acc, el) => acc + Math.abs(Number(el.amount)),
        0,
    );

    const categoryTotals = expenses.reduce((acc, el) => {
        acc[el.category] =
            (acc[el.category] || 0) + Math.abs(Number(el.amount));
        return acc;
    }, {});

    return Object.entries(categoryTotals)
        .map(([label, sum]) => ({
            label,
            sum,
            percent: totalSpent ? Math.round((sum / totalSpent) * 100) : 0,
        }))
        .sort((a, b) => b.sum - a.sum);
};

export const getMonthlyData = (transactions = []) => {
    const now = new Date();
    const months = [];

    for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push({
            key: `${date.getFullYear()}-${date.getMonth()}`,
            label: MONTH_LABELS[date.getMonth()],
            value: 0,
        });
    }

    transactions.forEach((transaction) => {
        const amount = Number(transaction.amount) || 0;
        if (amount >= 0) return;

        const d = new Date(transaction.date);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        const month = months.find((m) => m.key === key);
        if (month) month.value += Math.abs(amount);
    });

    return months;
};

export const formatDateToString = (date) => {
    if (!date) return new Date().toISOString().split('T')[0];
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
    return d.toISOString().split('T')[0];
};

const MONTH_VALUE_MAP = {
    june: 5,
    july: 6,
};

export const parseMonthValue = (value) => {
    const match = value?.match(/^([a-z]+)(\d{4})$/i);
    if (!match) return null;
    const [, monthName, year] = match;
    const monthIndex = MONTH_VALUE_MAP[monthName.toLowerCase()];
    if (monthIndex === undefined) return null;
    return { year: Number(year), monthIndex };
};

export const getTransactionsForMonth = (transactions = [], monthValue) => {
    const parsed = parseMonthValue(monthValue);
    if (!parsed) return transactions;

    return transactions.filter((t) => {
        const d = new Date(t.date);
        if (isNaN(d.getTime())) return false;

        return (
            d.getFullYear() === parsed.year &&
            d.getMonth() === parsed.monthIndex
        );
    });
};
