import { MONTH_LABELS, MONTH_NAMES } from '@/data';

const getExpenses = (transactions) =>
    transactions.filter((el) => Number(el.amount) < 0);

const getAbsAmount = (el) => Math.abs(Number(el.amount));

export const formatCurrency = (value, { showSign = false } = {}) => {
    const amount = Number(value) || 0;
    const formatted = new Intl.NumberFormat('uk-UA', {
        style: 'currency',
        currency: 'UAH',
        maximumFractionDigits: 0,
    }).format(Math.abs(amount));

    if (!showSign) return formatted;

    return amount < 0 ? `-${formatted}` : `+${formatted}`;
};

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
    getExpenses(transactions).reduce((acc, el) => acc + getAbsAmount(el), 0);

export const calculateCategoryBreakdown = (transactions) => {
    const expenses = getExpenses(transactions);
    const totalSpent = expenses.reduce((acc, el) => acc + getAbsAmount(el), 0);

    const categoryTotals = expenses.reduce((acc, el) => {
        acc[el.category] = (acc[el.category] || 0) + getAbsAmount(el);
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

    const monthMap = new Map(months.map((m) => [m.key, m]));

    transactions.forEach((transaction) => {
        const amount = Number(transaction.amount) || 0;
        if (amount >= 0) return;

        const d = new Date(transaction.date);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        const month = monthMap.get(key);
        if (month) month.value += Math.abs(amount);
    });

    return months;
};

export const formatDateToString = (date) => {
    const d = new Date(date || Date.now());

    return isNaN(d)
        ? new Date().toISOString().split('T')[0]
        : d.toISOString().split('T')[0];
};

export const parseMonthValue = (value) => {
    if (!value) return null;

    const month = MONTH_NAMES.find((month) => value.startsWith(month));

    if (!month) return null;

    return {
        monthIndex: MONTH_NAMES.indexOf(month),
        year: Number(value.slice(month.length)),
    };
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
