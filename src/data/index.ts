import { FiGrid, FiList } from 'react-icons/fi';

export type Category = keyof typeof CATEGORY_COLORS;

export const MONTH_LABELS = [
    'Січ',
    'Лют',
    'Бер',
    'Кві',
    'Тра',
    'Чер',
    'Лип',
    'Сер',
    'Вер',
    'Жов',
    'Лис',
    'Гру',
];

export const MONTH_NAMES = [
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

export const CATEGORY_COLORS = {
    Продукти: { bg: 'green.50', color: 'green.700' },
    Транспорт: { bg: 'orange.50', color: 'orange.700' },
    Дохід: { bg: 'green.50', color: 'green.700' },
    Комунальні: { bg: 'red.50', color: 'red.600' },
    Розваги: { bg: 'purple.50', color: 'purple.600' },
} as const;

export const NAV_ITEMS = [
    { id: '/', label: 'Огляд', icon: FiGrid },
    { id: '/transactions', label: 'Транзакції', icon: FiList },
];
