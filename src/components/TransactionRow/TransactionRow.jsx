import { CATEGORY_COLORS } from '@/data/transactions';
import { Badge, Box, Flex, Text } from '@chakra-ui/react';

export const TransactionRow = ({ date, title, category, amount }) => {
    const isPositive = amount > 0;
    const badgeColors = CATEGORY_COLORS[category] ?? {
        bg: 'gray.100',
        color: 'gray.600',
    };

    return (
        <Flex
            px={{ base: '4', md: '5' }}
            py={{ base: '3', md: '4' }}
            align={{ base: 'flex-start', md: 'center' }}
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: '2', md: '0' }}
            borderBottom="1px solid"
            borderColor="gray.100"
        >
            <Flex flex="1" w="full" justify="space-between" align="center">
                <Text color="gray.500" fontSize="sm">
                    {date}
                </Text>
                <Text color="black" fontSize={{ base: 'sm', md: 'md' }}>
                    {title}
                </Text>
            </Flex>
            <Flex flex="1" w="full" justify="space-between" align="center">
                <Box>
                    <Badge
                        borderRadius="full"
                        px="3"
                        py="0.5"
                        bg={badgeColors.bg}
                        color={badgeColors.color}
                        fontWeight="normal"
                    >
                        {category}
                    </Badge>
                </Box>
                <Text
                    textAlign="right"
                    color={isPositive ? 'green.600' : 'red.500'}
                    fontWeight="medium"
                >
                    {isPositive ? '+' : '-'}₴
                    {Math.abs(amount).toLocaleString('uk-UA')}
                </Text>
            </Flex>
        </Flex>
    );
};
