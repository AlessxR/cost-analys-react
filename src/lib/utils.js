import { MONTH_LABELS } from '@/data';

const MONTH_NAMES = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
];

export const generateMonthItems = (count = 12) => {
    const now = new Date();
    const items = [];

    for (let i = 0; i < count; i++) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthIndex = date.getMonth();
        const monthName = MONTH_NAMES[monthIndex];
        const year = date.getFullYear();
        const value = `${monthName}${year}`;
        const label = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;

        items.push({ label, value });
    }

    return items;
};

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
    january: 0,
    february: 1,
    march: 2,
    april: 3,
    may: 4,
    june: 5,
    july: 6,
    august: 7,
    september: 8,
    october: 9,
    november: 10,
    december: 11,
};

export const parseMonthValue = (value) => {
    if (typeof value !== 'string' || !value.trim()) return null;
    const lower = value.toLowerCase();
    for (const [name, monthIndex] of Object.entries(MONTH_VALUE_MAP)) {
        if (lower.startsWith(name)) {
            const year = lower.slice(name.length);
            if (/^\d{4}$/.test(year)) {
                return { year: Number(year), monthIndex };
            }
        }
    }
    return null;
};

export const getTransactionsForMonth = (transactions = [], monthValue) => {
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
