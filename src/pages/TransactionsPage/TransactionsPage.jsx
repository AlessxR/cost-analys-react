import { useEffect, useState } from 'react';

import { Box, Flex, Input, Text } from '@chakra-ui/react';

import { Header } from '@/components/Header/Header';
import { TransactionCategory } from '@/components/TransactionCategory/TransactionCategory';
import { TransactionRow } from '@/components/TransactionRow/TransactionRow';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '@/store/transaction-slice';
import { fetchCategories } from '@/store/categories-slice';

export const TransactionsPage = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const dispatch = useDispatch();
    const { transactions, status, error } = useSelector(
        (state) => state.transactions,
    );

    const { categories } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchTransactions());
        dispatch(fetchCategories());
    }, [dispatch]);

    if (status === 'loading') return <p>Завантаження...</p>;
    if (status === 'failed') return <p>Помилка: {error}</p>;

    const filtered =
        activeFilter === 'all'
            ? transactions
            : transactions.filter(
                  (transaction) => transaction.category === activeFilter,
              );

    return (
        <Box p={{ base: '4', md: '8' }}>
            <Header titleHeader={'Транзакції'} />

            <Flex
                direction={{ base: 'column', md: 'row' }}
                gap={{ base: '3', md: '2' }}
                mb="4"
                mt={{ base: '4', md: '6' }}
                align={{ base: 'stretch', md: 'center' }}
            >
                <Flex
                    gap="2"
                    overflowX="auto"
                    flexShrink="0"
                    css={{
                        '&::-webkit-scrollbar': { display: 'none' },
                        scrollbarWidth: 'none',
                    }}
                >
                    {categories.map((category) => (
                        <TransactionCategory
                            key={category.value}
                            category={category}
                            isActive={activeFilter === category.value}
                            onClick={() => setActiveFilter(category.value)}
                        />
                    ))}
                </Flex>
                <Input
                    placeholder="Пошук..."
                    size="sm"
                    borderRadius="full"
                    minW={{ base: '0', md: '150px' }}
                    w={{ base: 'full', md: 'auto' }}
                    flex={{ base: '0 0 auto', md: '1' }}
                />
            </Flex>

            <Text fontSize="sm" color="gray.500" mb="3">
                {filtered.length}{' '}
                {filtered.length === 1
                    ? 'транзакція'
                    : filtered.length < 5
                      ? 'транзакції'
                      : 'транзакцій'}
            </Text>

            <Box bg="white" borderRadius="xl" overflow="hidden">
                {filtered.map((t) => (
                    <TransactionRow
                        key={t.id}
                        date={t.date}
                        title={t.title}
                        category={t.category}
                        amount={t.amount}
                    />
                ))}
                {filtered.length === 0 && (
                    <Box p="8" textAlign="center">
                        <Text color="gray.400">
                            Немає транзакцій за обраною категорією
                        </Text>
                    </Box>
                )}
            </Box>
        </Box>
    );
};
