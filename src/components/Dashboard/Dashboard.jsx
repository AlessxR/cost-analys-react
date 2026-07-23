import { Box, Grid, Heading } from '@chakra-ui/react';
import { formatCurrency } from '@/lib/utils';

import { DashboardCard } from './DashboardCard';
import { DashboardBreakDown } from './DashboardBreakdown';
import { DashboardChart } from './DashboardChart';
import { Preloader } from '../Preloader';
import { SectionTitle } from './SectionTitle';
import { ErrorElement } from '../ErrorElement';
import { useDashboard } from '@/hooks/useDashboard';

const Card = ({ children, ...props }) => (
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

    if (fetchStatus === 'loading') return <Preloader />;
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
                            <SectionTitle extra={formatCurrency(totalSpent)}>
                                Динаміка за 6 місяців
                            </SectionTitle>

                            <DashboardChart transactions={transactions} />
                        </Card>

                        <Card>
                            <SectionTitle extra={totalSpent}>
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
