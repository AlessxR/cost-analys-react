import { Badge, Box, Flex, Text } from '@chakra-ui/react';
import { CATEGORY_COLORS } from '../../data/transactions';

export const TransactionRow = ({ date, title, category, amount }) => {
    const isPositive = amount > 0;
    const badgeColors = CATEGORY_COLORS[category] ?? { bg: 'gray.100', color: 'gray.600' };

    return (
        <Flex px="5" py="4" align="center" borderBottom="1px solid" borderColor="gray.100">
            <Text flex="1" color="gray.500" fontSize="sm">
                {date}
            </Text>
            <Text flex="2" color="black">
                {title}
            </Text>
            <Box flex="1">
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
                flex="1"
                textAlign="right"
                color={isPositive ? 'green.600' : 'red.500'}
                fontWeight="medium"
            >
                {isPositive ? '+' : '-'}₴{Math.abs(amount).toLocaleString('uk-UA')}
            </Text>
        </Flex>
    );
};
