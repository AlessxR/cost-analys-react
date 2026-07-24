import { useMemo } from 'react';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import {
    calculateCategoryBreakdown,
    calculateTotalSpent,
    getTransactionsForMonth,
} from '@/lib/utils';

import { DashboardCard } from './DashboardCard';
import { DashboardBreakDown } from './DashboardBreakdown';
import { DashboardChart } from './DashboardChart';
import { Preloader } from '../Preloader';

const Card = ({ children, ...props }) => (
    <Box bg="white" borderRadius="xl" p={{ base: '4', md: '5' }} {...props}>
        {children}
    </Box>
);

export const Dashboard = () => {
    const { transactions, status } = useSelector((state) => state.transactions);
    const { selectedMonth } = useSelector((state) => state.ui);

    const monthTransactions = useMemo(
        () => getTransactionsForMonth(transactions, selectedMonth),
        [transactions, selectedMonth],
    );

    const totalSpent = useMemo(
        () => calculateTotalSpent(monthTransactions),
        [monthTransactions],
    );

    const topCategory = useMemo(
        () => calculateCategoryBreakdown(monthTransactions)[0],
        [monthTransactions],
    );

    if (status === 'loading') return <Preloader />;

    return (
        <Box p={{ base: '4', md: '6' }} minH="100vh">
            {!monthTransactions.length ? (
                <Heading color="black" textAlign="center">
                    Транзакцій за цей місяць не було...
                </Heading>
            ) : (
                <>
                    <Grid
                        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                        gap="4"
                        mb="4"
                    >
                        <DashboardCard
                            title="Всього витрачено"
                            value={'₴' + totalSpent}
                        />

                        {topCategory && (
                            <DashboardCard
                                title="Найбільша категорія"
                                value={topCategory.label}
                                subtitle={`₴${topCategory.sum} · ${topCategory.percent}%`}
                            />
                        )}
                    </Grid>

                    <Grid
                        templateColumns={{ base: '1fr', md: '1.3fr 1fr' }}
                        gap="4"
                    >
                        <Card>
                            <Text
                                fontWeight="semibold"
                                color="black"
                                mb="4"
                                fontSize={{ base: 'sm', md: 'md' }}
                            >
                                Динаміка за 6 місяців
                                <Text
                                    as="span"
                                    float="right"
                                    fontWeight="normal"
                                    color="gray.500"
                                    fontSize={{ base: 'xs', md: 'sm' }}
                                >
                                    ₴{totalSpent}
                                </Text>
                            </Text>

                            <DashboardChart transactions={transactions} />
                        </Card>

                        <Card>
                            <Text
                                fontWeight="semibold"
                                color="black"
                                mb="4"
                                fontSize={{ base: 'sm', md: 'md' }}
                            >
                                Витрати за категоріями
                            </Text>
                            <DashboardBreakDown
                                transactions={monthTransactions}
                            />
                        </Card>
                    </Grid>
                </>
            )}
        </Box>
    );
};
