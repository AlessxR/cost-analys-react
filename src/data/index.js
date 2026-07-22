import { FiGrid, FiList } from 'react-icons/fi';

export const CATEGORY_COLORS = {
    Продукти: { bg: 'green.50', color: 'green.700' },
    Транспорт: { bg: 'orange.50', color: 'orange.700' },
    Дохід: { bg: 'green.50', color: 'green.700' },
    Комунальні: { bg: 'red.50', color: 'red.600' },
    Розваги: { bg: 'purple.50', color: 'purple.600' },
};

export const MONTHLY_DATA = [
    { label: 'Лют', value: 30 },
    { label: 'Бер', value: 48 },
    { label: 'Кві', value: 22 },
    { label: 'Тра', value: 55 },
    { label: 'Чер', value: 35 },
    { label: 'Лип', value: 100 },
];

export const CATEGORY_BREAKDOWN = [
    { label: 'Продукти', sum: '7 940', percent: 33, color: 'green.500' },
    { label: 'Транспорт', sum: '4 120', percent: 17, color: 'orange.600' },
    { label: 'Комунальні', sum: '3 860', percent: 16, color: 'red.500' },
    { label: 'Розваги', sum: '2 750', percent: 11, color: 'purple.300' },
    { label: "Здоров'я", sum: '2 210', percent: 9, color: 'orange.300' },
    { label: 'Інше', sum: '3 500', percent: 14, color: 'gray.500' },
];

export const NAV_ITEMS = [
    { id: '/', label: 'Огляд', icon: FiGrid },
    { id: '/transactions', label: 'Транзакції', icon: FiList },
];
