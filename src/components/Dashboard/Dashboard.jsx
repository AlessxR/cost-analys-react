import { Box, Flex, Grid, HStack, Text } from '@chakra-ui/react';

const monthlyData = [
    { label: 'Лют', value: 30 },
    { label: 'Бер', value: 48 },
    { label: 'Кві', value: 22 },
    { label: 'Тра', value: 55 },
    { label: 'Чер', value: 35 },
    { label: 'Лип', value: 100 },
];

const categories = [
    { label: 'Продукти', sum: '7 940', percent: 33, color: 'green.500' },
    { label: 'Транспорт', sum: '4 120', percent: 17, color: 'orange.600' },
    { label: 'Комунальні', sum: '3 860', percent: 16, color: 'red.500' },
    { label: 'Розваги', sum: '2 750', percent: 11, color: 'purple.300' },
    { label: "Здоров'я", sum: '2 210', percent: 9, color: 'orange.300' },
    { label: 'Інше', sum: '3 500', percent: 14, color: 'gray.500' },
];

const Card = ({ children, ...props }) => (
    <Box bg="white" borderRadius="xl" p="5" {...props}>
        {children}
    </Box>
);

export const Dashboard = () => {
    return (
        <Box bg="gray.100" p="6" minH="100vh">
            <Grid templateColumns="repeat(3, 1fr)" gap="4" mb="4">
                <Card>
                    <Text fontSize="sm" color="gray.500" mb="2">
                        Всього витрачено
                    </Text>
                    <Text fontSize="3xl" color="black" fontWeight="semibold">
                        ₴24 380
                    </Text>
                    <Text fontSize="sm" color="red.500" mt="1">
                        +12% до минулого місяця
                    </Text>
                </Card>

                <Card>
                    <Text fontSize="sm" color="gray.500" mb="2">
                        Залишок бюджету
                    </Text>
                    <Text fontSize="3xl" color="black" fontWeight="semibold">
                        ₴5 620
                    </Text>
                    <Text fontSize="sm" color="gray.500" mt="1">
                        із ₴30 000 плану
                    </Text>
                </Card>

                <Card>
                    <Text fontSize="sm" color="gray.500" mb="2">
                        Найбільша категорія
                    </Text>
                    <Text fontSize="2xl" fontWeight="semibold" color="red.600">
                        Продукти
                    </Text>
                    <Text fontSize="sm" color="gray.500" mt="1">
                        ₴7 940 · 33%
                    </Text>
                </Card>
            </Grid>

            <Grid templateColumns="1.3fr 1fr" gap="4">
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

                    <Flex align="flex-end" gap="4" h="180px">
                        {monthlyData.map((item) => (
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
                                            : 'black.200'
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
                        {categories.map((item) => (
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
