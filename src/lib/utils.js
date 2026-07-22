// lib/utils.js
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
