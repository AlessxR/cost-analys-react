import { ITransaction } from '@/types';
import {
    calculateCategoryBreakdown,
    formatCurrency,
    formatDateToString,
    generateMonthItems,
    getMonthlyData,
    getTransactionsForMonth,
    parseMonthValue,
} from '../../lib/utils';

export const mockTransactions: ITransaction[] = [
    {
        id: '1',
        title: 'Хліб',
        category: 'Продукти',
        amount: -200,
        date: '2025-01-15',
    },
];

describe('generateMonthItems', () => {
    it('should generate a list of months when a count argument is passed', () => {
        expect(generateMonthItems(1)).toEqual([
            {
                label: 'Липень 2026',
                value: 'july2026',
            },
        ]);
    });

    it('should return an empty array when no count argument is passed', () => {
        expect(generateMonthItems(0)).toEqual([]);
    });
});

describe('formatCurrency', () => {
    it('should format 1500 as 1 500 ₴', () => {
        expect(formatCurrency(1500)).toMatch(/1.500.₴/);
    });

    it('should format 0 as 0 ₴', () => {
        expect(formatCurrency(0)).toMatch(/0.₴/);
    });

    it('should format -1555 as 1 555 ₴', () => {
        expect(formatCurrency(-1555)).toMatch(/1.555.₴/);
    });
});

describe('calculateCategoryBreakdown', () => {
    it('should return an empty array when no transactions are passed', () => {
        expect(calculateCategoryBreakdown([])).toEqual([]);
    });

    it('should calculate the breakdown for a single category', () => {
        const result = calculateCategoryBreakdown(mockTransactions);

        expect(result).toEqual([{ label: 'Продукти', sum: 200, percent: 100 }]);
    });

    it('should calculate the breakdown for more than one category', () => {
        const transactions: ITransaction[] = [
            {
                id: '1',
                title: 'Хліб',
                category: 'Продукти',
                amount: -100,
                date: '2025-01-15',
            },
            {
                id: '2',
                title: 'Таксі',
                category: 'Транспорт',
                amount: -150,
                date: '2025-01-16',
            },
            {
                id: '3',
                title: 'Автобус',
                category: 'Транспорт',
                amount: -100,
                date: '2025-01-17',
            },
        ];

        const result = calculateCategoryBreakdown(transactions);

        expect(result).toEqual([
            { label: 'Транспорт', sum: 250, percent: 71 },
            { label: 'Продукти', sum: 100, percent: 29 },
        ]);
    });
});

describe('getMonthlyData', () => {
    it('should build the monthly spending chart data', () => {
        const transactions: ITransaction[] = [
            {
                id: '1',
                title: 'Хліб',
                category: 'Продукти',
                amount: -200,
                date: '2026-06-05',
            },
            {
                id: '2',
                title: 'Таксі',
                category: 'Транспорт',
                amount: -150,
                date: '2026-06-20',
            },
        ];

        const result = getMonthlyData(transactions);

        expect(result).toEqual([
            {
                key: '2026-1',
                label: 'Лют',
                value: 0,
            },
            {
                key: '2026-2',
                label: 'Бер',
                value: 0,
            },
            {
                key: '2026-3',
                label: 'Кві',
                value: 0,
            },
            {
                key: '2026-4',
                label: 'Тра',
                value: 0,
            },
            {
                key: '2026-5',
                label: 'Чер',
                value: 350,
            },
            {
                key: '2026-6',
                label: 'Лип',
                value: 0,
            },
        ]);
    });
});

describe('formatDateToString', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-07-28T12:00:00.000Z'));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should format an ISO date string to YYYY-MM-DD', () => {
        expect(formatDateToString('2026-06-17T10:30:00.000Z')).toBe(
            '2026-06-17',
        );
    });

    it('should format a Date object to YYYY-MM-DD', () => {
        const date = new Date('2026-01-05T00:00:00.000Z');
        expect(formatDateToString(date)).toBe('2026-01-05');
    });
});

describe('parseMonthValue', () => {
    it('should parse a month name and year into year and monthIndex', () => {
        expect(parseMonthValue('january2026')).toEqual({
            year: 2026,
            monthIndex: 0,
        });
    });

    it('should correctly parse the last month of a year', () => {
        expect(parseMonthValue('december2025')).toEqual({
            year: 2025,
            monthIndex: 11,
        });
    });

    it('should parse a month value regardless of letter case', () => {
        expect(parseMonthValue('DECEMBER2025')).toEqual({
            year: 2025,
            monthIndex: 11,
        });
    });

    it('should return null for a month value with leading digits', () => {
        expect(parseMonthValue('2523december2025')).toBeNull();
    });

    it('should trim whitespace before parsing a month value', () => {
        expect(parseMonthValue('      december2025           ')).toEqual({
            year: 2025,
            monthIndex: 11,
        });
    });
});

describe('getTransactionsForMonth', () => {
    it('should return an empty array when no transactions fall within the month', () => {
        const transactions: ITransaction[] = [
            {
                id: '1',
                title: 'Хліб',
                category: 'Продукти',
                amount: -100,
                date: '2026-06-17',
            },
        ];

        expect(getTransactionsForMonth(transactions, 'august2026')).toEqual([]);
    });

    it('should return transactions belonging to the given month', () => {
        const transactions: ITransaction[] = [
            {
                id: '1',
                title: 'Хліб',
                category: 'Продукти',
                amount: -100,
                date: '2026-06-17',
            },
            {
                id: '2',
                title: 'Таксі',
                category: 'Транспорт',
                amount: -250,
                date: '2026-06-18',
            },
            {
                id: '3',
                title: 'Кіно',
                category: 'Розваги',
                amount: -300,
                date: '2026-07-01',
            },
        ];

        const result = getTransactionsForMonth(transactions, 'june2026');

        expect(result).toEqual([transactions[0], transactions[1]]);
    });
});
