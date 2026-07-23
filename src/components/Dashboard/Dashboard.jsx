import { useMemo } from 'react';
import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import {
    calculateCategoryBreakdown,
    calculateTotalSpent,
    getTransactionsForMonth,
} from '@/lib/utils';
import { DashboardCard } from './DashboardCard/DashboardCard';
import { DashboardBreakDown } from './DashboardBreakdown/DashboardBreakdown';
import { DashboardChart } from './DashboardChart/DashboardChart';
import { SelectMonth } from '../Header/SelectElement/SelectMonth/SelectMonth';

const Card = ({ children, ...props }) => (
    <Box bg="white" borderRadius="xl" p={{ base: '4', md: '5' }} {...props}>
        {children}
    </Box>
);

export const Dashboard = () => {
    const { transactions } = useSelector((state) => state.transactions);
    const { selectedMonth } = useSelector((state) => state.ui);

    const monthTransactions = useMemo(
        () => getTransactionsForMonth(transactions, selectedMonth),
        [transactions, selectedMonth],
    );

    const totalSpent = useMemo(
        () => calculateTotalSpent(monthTransactions),
        [monthTransactions],
    );

    const totalCategory = useMemo(
        () => calculateCategoryBreakdown(monthTransactions)[0],
        [monthTransactions],
    );

    return (
        <Box bg="gray.100" p={{ base: '4', md: '6' }} minH="100vh">
            <Flex justify="flex-end" mb="4">
                <SelectMonth name="month" />
            </Flex>

            <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                gap="4"
                mb="4"
            >
                <DashboardCard
                    title="Всього витрачено"
                    value={'₴' + totalSpent}
                />

                {totalCategory && (
                    <DashboardCard
                        title="Найбільша категорія"
                        value={totalCategory.label}
                        subtitle={`₴${totalCategory.sum} · ${totalCategory.percent}%`}
                    />
                )}
            </Grid>

            <Grid templateColumns={{ base: '1fr', md: '1.3fr 1fr' }} gap="4">
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

                    <DashboardChart />
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
                    <DashboardBreakDown />
                </Card>
            </Grid>
        </Box>
    );
};
