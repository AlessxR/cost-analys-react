import {
    calculateCategoryBreakdown,
    formatCurrency,
    formatDateToString,
    generateMonthItems,
    getMonthlyData,
    getTransactionsForMonth,
    parseMonthValue,
} from './utils';

describe('generateMonthItems', () => {
    it('генерація місяців з переданим аргументом', () => {
        expect(generateMonthItems(1)).toEqual([
            {
                label: 'Липень 2026',
                value: 'july2026',
            },
        ]);
    });

    it('генерація місяців без переданого аргумента', () => {
        expect(generateMonthItems(0)).toEqual([]);
    });
});

describe('formatCurrency', () => {
    it('форматує 1500 в 1 500 ₴', () => {
        expect(formatCurrency(1500)).toMatch(/1.500.₴/);
    });

    it('форматує 0 в 0 ₴', () => {
        expect(formatCurrency(0)).toMatch(/0.₴/);
    });

    it('форматування -1555 в 1 555 ₴', () => {
        expect(formatCurrency(-1555)).toMatch(/1.555.₴/);
    });
});

describe('calculateCategoryBreakdown', () => {
    it('підрахунок витрат за місяці без переданого аргументу', () => {
        expect(calculateCategoryBreakdown([])).toEqual([]);
    });

    it('підрахунок з 1 категорією', () => {
        const transactions = [
            {
                id: '1',
                title: 'Хліб',
                category: 'Продукти',
                amount: -100,
                date: '2026-06-17',
            },
        ];

        const result = calculateCategoryBreakdown(transactions);

        expect(result).toEqual([{ label: 'Продукти', sum: 100, percent: 100 }]);
    });

    it('підрахунок з більше 1', () => {
        const transactions = [
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
        ];

        const result = calculateCategoryBreakdown(transactions);

        expect(result).toEqual([
            { label: 'Транспорт', sum: 250, percent: 71 },
            { label: 'Продукти', sum: 100, percent: 29 },
        ]);
    });
});

describe('getMonthlyData', () => {
    it('Отримання графіку витрат по місяцям', () => {
        const transactions = [
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

    it('форматування дати до виду YYYY-MM-DD', () => {
        expect(formatDateToString('2026-06-17T10:30:00.000Z')).toBe(
            '2026-06-17',
        );
    });

    it('форматування object дати до виду YYYY-MM-DD', () => {
        const date = new Date('2026-01-05T00:00:00.000Z');
        expect(formatDateToString(date)).toBe('2026-01-05');
    });
});

describe('parseMonthValue', () => {
    it('форматування місяць + рік', () => {
        expect(parseMonthValue('january2026')).toEqual({
            year: 2026,
            monthIndex: 0,
        });
    });

    it('форматування останнього місяця in a year', () => {
        expect(parseMonthValue('december2025')).toEqual({
            year: 2025,
            monthIndex: 11,
        });
    });

    it('форматування дати з різним кейсом слів', () => {
        expect(parseMonthValue('DECEMBER2025')).toEqual({
            year: 2025,
            monthIndex: 11,
        });
    });

    it('форматування дати з цифрами', () => {
        expect(parseMonthValue('2523december2025')).toBeNull();
    });

    it('форматування дати з пробілами', () => {
        expect(parseMonthValue('      december2025           ')).toEqual({
            year: 2025,
            monthIndex: 11,
        });
    });
});

describe('getTransactionsForMonth', () => {
    it('повертає порожній масив, коли жодна транзакція не потрапляє в місяць', () => {
        const transactions = [
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

    it('повертає транзакції за вказаний місяць', () => {
        const transactions = [
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
