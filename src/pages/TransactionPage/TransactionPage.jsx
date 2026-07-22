import { Header } from '../../components/Header/Header';
import {
    Badge,
    Box,
    Container,
    Flex,
    HStack,
    Input,
    Text,
} from '@chakra-ui/react';

export const TransactionsPage = () => {
    return (
        <Box p="8">
            <Header titleHeader={'Транзакції'} />

            <HStack gap="2" mb="5" wrap="wrap" mt="6">
                <Box
                    px="4"
                    py="1.5"
                    borderRadius="full"
                    fontSize="sm"
                    bg="gray.900"
                    color="white"
                    border="1px solid"
                    borderColor="gray.900"
                >
                    Усі
                </Box>
                <Box
                    px="4"
                    py="1.5"
                    borderRadius="full"
                    fontSize="sm"
                    bg="white"
                    color="gray.700"
                    border="1px solid"
                    borderColor="gray.200"
                >
                    Продукти
                </Box>
                <Box
                    px="4"
                    py="1.5"
                    borderRadius="full"
                    fontSize="sm"
                    bg="white"
                    color="gray.700"
                    border="1px solid"
                    borderColor="gray.200"
                >
                    Транспорт
                </Box>
                <Box
                    px="4"
                    py="1.5"
                    borderRadius="full"
                    fontSize="sm"
                    bg="white"
                    color="gray.700"
                    border="1px solid"
                    borderColor="gray.200"
                >
                    Комунальні
                </Box>
                <Box
                    px="4"
                    py="1.5"
                    borderRadius="full"
                    fontSize="sm"
                    bg="white"
                    color="gray.700"
                    border="1px solid"
                    borderColor="gray.200"
                >
                    Розваги
                </Box>
                <Input
                    placeholder="Пошук..."
                    size="sm"
                    borderRadius="full"
                    flex="1"
                    minW="150px"
                />
            </HStack>

            <Box bg="white" borderRadius="xl" overflow="hidden">
                <Flex
                    px="5"
                    py="3"
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    color="gray.500"
                    fontSize="xs"
                    fontWeight="semibold"
                    letterSpacing="wide"
                >
                    <Text flex="1">ДАТА</Text>
                    <Text flex="2">ОПИС</Text>
                    <Text flex="1">КАТЕГОРІЯ</Text>
                    <Text flex="1" textAlign="right">
                        СУМА
                    </Text>
                </Flex>

                <Flex
                    px="5"
                    py="4"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="gray.100"
                >
                    <Text flex="1" color="gray.500" fontSize="sm">
                        20 лип
                    </Text>
                    <Text flex="2" color="black">
                        Сільпо, продукти
                    </Text>
                    <Box flex="1">
                        <Badge
                            borderRadius="full"
                            px="3"
                            py="0.5"
                            bg="green.50"
                            color="green.700"
                            fontWeight="normal"
                        >
                            Продукти
                        </Badge>
                    </Box>
                    <Text
                        flex="1"
                        textAlign="right"
                        color="red.500"
                        fontWeight="medium"
                    >
                        -₴684
                    </Text>
                </Flex>

                <Flex
                    px="5"
                    py="4"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="gray.100"
                >
                    <Text flex="1" color="gray.500" fontSize="sm">
                        19 лип
                    </Text>
                    <Text flex="2" color="black">
                        Заправка WOG
                    </Text>
                    <Box flex="1">
                        <Badge
                            borderRadius="full"
                            px="3"
                            py="0.5"
                            bg="orange.50"
                            color="orange.700"
                            fontWeight="normal"
                        >
                            Транспорт
                        </Badge>
                    </Box>
                    <Text
                        flex="1"
                        textAlign="right"
                        color="red.500"
                        fontWeight="medium"
                    >
                        -₴950
                    </Text>
                </Flex>

                <Flex
                    px="5"
                    py="4"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="gray.100"
                >
                    <Text flex="1" color="gray.500" fontSize="sm">
                        19 лип
                    </Text>
                    <Text flex="2" color="black">
                        Зарплата, Axels
                    </Text>
                    <Box flex="1">
                        <Badge
                            borderRadius="full"
                            px="3"
                            py="0.5"
                            bg="green.50"
                            color="green.700"
                            fontWeight="normal"
                        >
                            Дохід
                        </Badge>
                    </Box>
                    <Text
                        flex="1"
                        textAlign="right"
                        color="green.600"
                        fontWeight="medium"
                    >
                        +₴28 000
                    </Text>
                </Flex>

                <Flex
                    px="5"
                    py="4"
                    align="center"
                    borderBottom="1px solid"
                    borderColor="gray.100"
                >
                    <Text flex="1" color="gray.500" fontSize="sm">
                        18 лип
                    </Text>
                    <Text flex="2" color="black">
                        Комунальні послуги
                    </Text>
                    <Box flex="1">
                        <Badge
                            borderRadius="full"
                            px="3"
                            py="0.5"
                            bg="red.50"
                            color="red.600"
                            fontWeight="normal"
                        >
                            Комунальні
                        </Badge>
                    </Box>
                    <Text
                        flex="1"
                        textAlign="right"
                        color="red.500"
                        fontWeight="medium"
                    >
                        -₴1 240
                    </Text>
                </Flex>

                <Flex px="5" py="4" align="center">
                    <Text flex="1" color="gray.500" fontSize="sm">
                        17 лип
                    </Text>
                    <Text flex="2" color="black">
                        Кінотеатр Multiplex
                    </Text>
                    <Box flex="1">
                        <Badge
                            borderRadius="full"
                            px="3"
                            py="0.5"
                            bg="purple.50"
                            color="purple.600"
                            fontWeight="normal"
                        >
                            Розваги
                        </Badge>
                    </Box>
                    <Text
                        flex="1"
                        textAlign="right"
                        color="red.500"
                        fontWeight="medium"
                    >
                        -₴420
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
};
