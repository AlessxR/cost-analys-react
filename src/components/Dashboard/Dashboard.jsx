import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { MONTHLY_DATA } from '@/data';
import { DashboardCard } from './DashboardCard/DashboardCard';
import { useDispatch, useSelector } from 'react-redux';
import { DashboardBreakDown } from './DashboardBreakdown/DashboardBreakdown';
import { useEffect } from 'react';
import { fetchTransactions } from '@/store/transaction-slice';

const Card = ({ children, ...props }) => (
    <Box bg="white" borderRadius="xl" p={{ base: '4', md: '5' }} {...props}>
        {children}
    </Box>
);

export const Dashboard = () => {
    const dispatch = useDispatch();
    const { totalSpent, totalCategory } = useSelector(
        (state) => state.transactions,
    );

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    return (
        <Box bg="gray.100" p={{ base: '4', md: '6' }} minH="100vh">
            <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                gap="4"
                mb="4"
            >
                <DashboardCard
                    title="Всього витрачено"
                    description={'₴' + totalSpent}
                    information="+12% до минулого місяця"
                />

                {totalCategory && (
                    <DashboardCard
                        title="Найбільша категорія"
                        description={totalCategory.label}
                        information={`₴${totalCategory.sum} · ${totalCategory.percent}%`}
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

                    <Flex
                        align="flex-end"
                        gap={{ base: '1', md: '4' }}
                        h={{ base: '140px', md: '180px' }}
                    >
                        {MONTHLY_DATA.map((item) => (
                            <Flex
                                key={item.label}
                                direction="column"
                                align="center"
                                flex="1"
                                h="full"
                                justify="flex-end"
                                minW="0"
                            >
                                <Box
                                    w="full"
                                    h={`${item.value}%`}
                                    bg={
                                        item.value === 100
                                            ? 'green.600'
                                            : 'gray.300'
                                    }
                                    borderRadius="md"
                                />
                                <Text
                                    fontSize={{ base: '2xs', md: 'sm' }}
                                    color="black"
                                    mt="1"
                                    whiteSpace="nowrap"
                                >
                                    {item.label}
                                </Text>
                            </Flex>
                        ))}
                    </Flex>
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
