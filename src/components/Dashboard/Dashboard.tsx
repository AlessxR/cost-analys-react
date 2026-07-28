import { ReactNode } from 'react';

import { Box, Grid, Heading } from '@chakra-ui/react';

import { formatCurrency } from '@/lib/utils';

import { useDashboard } from '@/hooks/useDashboard';

import {
    DashboardCard,
    ErrorElement,
    SectionTitle,
    DashboardChart,
    DashboardBreakDown,
    Preloader,
} from '..';

type Props = {
    children: ReactNode;
};

const Card = ({ children, ...props }: Props) => (
    <Box bg="white" borderRadius="xl" p={{ base: '4', md: '5' }} {...props}>
        {children}
    </Box>
);

export const Dashboard = () => {
    const {
        fetchStatus,
        monthTransactions,
        totalSpent,
        topCategory,
        transactions,
        categoryBreakdown,
    } = useDashboard();

    if (fetchStatus === 'loading' || fetchStatus === 'idle')
        return <Preloader />;
    if (fetchStatus === 'failed') return <ErrorElement />;

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
                            value={formatCurrency(totalSpent)}
                        />

                        {topCategory && (
                            <DashboardCard
                                title="Найбільша категорія"
                                value={topCategory.label}
                                subtitle={`${formatCurrency(topCategory.sum)} · ${topCategory.percent}%`}
                            />
                        )}
                    </Grid>

                    <Grid
                        templateColumns={{ base: '1fr', md: '1.3fr 1fr' }}
                        gap="4"
                    >
                        <Card>
                            <SectionTitle
                                totalSpent={formatCurrency(totalSpent)}
                            >
                                Динаміка за 6 місяців
                            </SectionTitle>

                            <DashboardChart transactions={transactions} />
                        </Card>

                        <Card>
                            <SectionTitle
                                totalSpent={formatCurrency(totalSpent)}
                            >
                                Витрати за категоріями
                            </SectionTitle>
                            <DashboardBreakDown
                                categoryBreakdown={categoryBreakdown}
                            />
                        </Card>
                    </Grid>
                </>
            )}
        </Box>
    );
};
