import { useState } from 'react';

import { Box, Flex, Input } from '@chakra-ui/react';
import { TRANSACTIONS } from '@/data/transactions';
import { FILTER_CATEGORIES } from '@/data/categories';

import { Header } from '@/components/Header/Header';
import { TransactionCategory } from '@/components/TransactionCategory/TransactionCategory';
import { TransactionRow } from '@/components/TransactionRow/TransactionRow';

export const TransactionsPage = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filtered =
        activeFilter === 'all'
            ? TRANSACTIONS
            : TRANSACTIONS.filter(
                  (transaction) => transaction.category === activeFilter,
              );

    return (
        <Box p={{ base: '4', md: '8' }}>
            <Header titleHeader={'Транзакції'} />

            <Flex
                gap="2"
                mb="5"
                mt="6"
                overflowX="auto"
                pb="2"
                css={{
                    '&::-webkit-scrollbar': { display: 'none' },
                    scrollbarWidth: 'none',
                }}
            >
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
                    minW="150px"
                    flex={{ base: '0 0 auto', md: '1' }}
                />
            </Flex>

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
