import { Box, Flex, Grid, HStack, Text } from '@chakra-ui/react';

import { CATEGORY_BREAKDOWN, MONTHLY_DATA } from '../../data/dashboard';
import { DashboardCard } from './DashboardCard/DashboardCard';

const Card = ({ children, ...props }) => (
    <Box bg="white" borderRadius="xl" p={{ base: '4', md: '5' }} {...props}>
        {children}
    </Box>
);

export const Dashboard = () => {
    return (
        <Box bg="gray.100" p={{ base: '4', md: '6' }} minH="100vh">
            <Grid
                templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
                gap="4"
                mb="4"
            >
                <DashboardCard
                    title="Всього витрачено"
                    description="₴24 380"
                    information="+12% до минулого місяця"
                />

                <DashboardCard
                    title="Найбільша категорія"
                    description="Продукти"
                    information="₴7 940 · 33%"
                />
            </Grid>

            <Grid templateColumns={{ base: '1fr', md: '1.3fr 1fr' }} gap="4">
                <Card>
                    <Text fontWeight="semibold" color="black" mb="6">
                        Динаміка за 6 місяців
                        <Text
                            as="span"
                            float="right"
                            fontWeight="normal"
                            color="gray.500"
                        >
                            ₴24 380
                        </Text>
                    </Text>

                    <Flex
                        align="flex-end"
                        gap={{ base: '2', md: '4' }}
                        h="180px"
                    >
                        {MONTHLY_DATA.map((item) => (
                            <Flex
                                key={item.label}
                                direction="column"
                                align="center"
                                flex="1"
                                h="full"
                                justify="flex-end"
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
                                <Text fontSize="sm" color="black" mt="2">
                                    {item.label}
                                </Text>
                            </Flex>
                        ))}
                    </Flex>
                </Card>

                <Card>
                    <Text fontWeight="semibold" color="black" mb="4">
                        Витрати за категоріями
                    </Text>
                    <Flex direction="column" gap="3">
                        {CATEGORY_BREAKDOWN.map((item) => (
                            <HStack key={item.label} justify="space-between">
                                <HStack gap="2">
                                    <Box
                                        w="2.5"
                                        h="2.5"
                                        borderRadius="full"
                                        bg={item.color}
                                    />
                                    <Text color="black">{item.label}</Text>
                                </HStack>
                                <HStack gap="3">
                                    <Text color="black">₴{item.sum}</Text>
                                    <Text
                                        color="black"
                                        w="10"
                                        textAlign="right"
                                    >
                                        {item.percent}%
                                    </Text>
                                </HStack>
                            </HStack>
                        ))}
                    </Flex>
                </Card>
            </Grid>
        </Box>
    );
};
