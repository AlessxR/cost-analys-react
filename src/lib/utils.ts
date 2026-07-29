import { MONTH_LABELS, MONTH_NAMES, MONTH_NAMES_UA } from '@/data';

import { ICategoryBreakdown, ITransaction } from '@/types';

const getAbsAmount = (el: ITransaction) => Math.abs(el.amount);

export const calculateTotalSpent = (transactions: ITransaction[]) =>
    transactions.reduce((acc, el) => acc + getAbsAmount(el), 0);

const MONTH_VALUE_MAP = Object.fromEntries(
    MONTH_NAMES.map((name, index) => [name, index]),
);

const MONTH_VALUE_MAP = Object.fromEntries(
    MONTH_NAMES.map((name, index) => [name, index]),
);

export const formatCurrency = (value: number) => {
    const amount = value || 0;

    const formatted = new Intl.NumberFormat('uk-UA', {
        style: 'currency',
        currency: 'UAH',
        maximumFractionDigits: 0,
    }).format(Math.abs(amount));

    return formatted;
};

export const generateMonthItems = (count = 12) => {
    const now = new Date();
    const items = [];

    for (let i = 0; i < count; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        const value = `${MONTH_NAMES[monthIndex]}${year}`;
        const label = `${MONTH_NAMES_UA[monthIndex]} ${year}`;

        items.push({ label, value });
    }

    return items;
};

export const calculateCategoryBreakdown = (
    transactions: ITransaction[],
): ICategoryBreakdown[] => {
    const totalSpent = transactions.reduce(
        (acc, el) => acc + getAbsAmount(el),
        0,
    );

    const categoryTotals = transactions.reduce<Record<string, number>>(
        (acc, el) => {
            acc[el.category] = (acc[el.category] || 0) + getAbsAmount(el);
            return acc;
        },
        {},
    );

    return Object.entries(categoryTotals)
        .map(([label, sum]) => ({
            label,
            sum,
            percent: totalSpent ? Math.round((sum / totalSpent) * 100) : 0,
        }))
        .sort((a, b) => b.sum - a.sum);
};

export const getMonthlyData = (transactions: ITransaction[] = []) => {
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

    const monthMap = new Map(months.map((m) => [m.key, m]));

    transactions.forEach((transaction) => {
        const amount = transaction.amount || 0;
        if (amount >= 0) return;

        const d = new Date(transaction.date);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        const month = monthMap.get(key);
        if (month) month.value += Math.abs(amount);
    });

    return months;
};

export const formatDateToString = (date: string | Date) => {
    if (!date) return new Date().toISOString().split('T')[0];
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
    return d.toISOString().split('T')[0];
};

export const parseMonthValue = (value: string) => {
    if (typeof value !== 'string') return null;

    const match = value
        .trim()
        .toLowerCase()
        .match(/^([a-z]+)(\d{4})$/);
    if (!match) return null;

    const [, name, year] = match;
    const monthIndex = MONTH_VALUE_MAP[name];

    if (monthIndex === undefined) return null;

    return { year: Number(year), monthIndex };
};

export const getTransactionsForMonth = (
    transactions: ITransaction[] = [],
    monthValue: string,
) => {
    const parsed = parseMonthValue(monthValue);
    if (!parsed) return [];

    return transactions.filter((t) => {
        const d = new Date(t.date);
        if (isNaN(d.getTime())) return false;

        return (
            d.getFullYear() === parsed.year &&
            d.getMonth() === parsed.monthIndex
        );
    });
};
