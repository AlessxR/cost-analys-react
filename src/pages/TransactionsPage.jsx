import { Box, Flex, Heading, Input, Text } from '@chakra-ui/react';

import { useMonthFilter } from '@/hooks/useMonthFilter';

import {
    ErrorElement,
    Header,
    Preloader,
    TransactionCategory,
    TransactionRow,
} from '@/components';

export const TransactionsPage = () => {
    const {
        activeFilter,
        searchTerm,
        fetchStatus,
        categories,
        monthTransactions,
        filtered,
        updateActiveFilter,
        updateSearchTerm,
    } = useMonthFilter();

    if (fetchStatus === 'loading') return <Preloader />;
    if (fetchStatus === 'failed') return <ErrorElement />;

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
                            onClick={() => updateActiveFilter(category.value)}
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
                    value={searchTerm}
                    color="black"
                    onChange={(e) => updateSearchTerm(e.target.value)}
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

            {monthTransactions.length === 0 ? (
                <Heading color="black" textAlign="center">
                    Наразі транзакцій немає : (
                </Heading>
            ) : (
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
                                {searchTerm.trim()
                                    ? 'Нічого не знайдено за вашим запитом'
                                    : 'Немає транзакцій за обраною категорією'}
                            </Text>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};
