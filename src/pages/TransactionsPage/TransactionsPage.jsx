import { useState } from 'react';
import { Header } from '../../components/Header/Header';
import { TransactionRow } from '../../components/TransactionRow/TransactionRow';
import { Box, HStack, Input } from '@chakra-ui/react';
import { TRANSACTIONS, FILTER_CATEGORIES } from '../../data/transactions';
import { TransactionCategory } from '../../components/TransactionCategory/TransactionCategory';

export const TransactionsPage = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filtered =
        activeFilter === 'all'
            ? TRANSACTIONS
            : TRANSACTIONS.filter(
                  (transaction) => transaction.category === activeFilter,
              );

    return (
        <Box p="8">
            <Header titleHeader={'Транзакції'} />

            <HStack gap="2" mb="5" wrap="wrap" mt="6">
                {FILTER_CATEGORIES.map((category) => (
                    <TransactionCategory
                        key={category.value}
                        category={category}
                        isActive={activeFilter === category.value}
                        onClick={() => setActiveFilter(category.value)}
                    />
                ))}
                <Input
                    placeholder="Пошук..."
                    size="sm"
                    borderRadius="full"
                    flex="1"
                    minW="150px"
                />
            </HStack>

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
            </Box>
        </Box>
    );
};
