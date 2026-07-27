import { CATEGORY_COLORS } from '@/data';

import { Badge, Flex, Text } from '@chakra-ui/react';

type Props = {
    date: string;
    title: string;
    category: string;
    amount: number;
};

export const TransactionRow = ({ date, title, category, amount }: Props) => {
    const badgeColors = CATEGORY_COLORS[category] ?? {
        bg: 'gray.100',
        color: 'gray.600',
    };

    return (
        <Flex
            px={{ base: '3', md: '5' }}
            py={{ base: '3', md: '4' }}
            direction={{ base: 'column', md: 'row' }}
            gap={{ base: '1', md: '0' }}
            align={{ base: 'stretch', md: 'center' }}
            borderBottom="1px solid"
            borderColor="gray.100"
        >
            <Flex
                flex="1"
                minW="0"
                direction={{ base: 'row', md: 'row' }}
                align="center"
                justify="space-between"
                gap="2"
            >
                <Text
                    color="black"
                    fontSize={{ base: 'sm', md: 'md' }}
                    fontWeight="medium"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap"
                    minW="0"
                >
                    {title}
                </Text>
                <Badge
                    display={{ base: 'none', md: 'inline-flex' }}
                    borderRadius="full"
                    px="3"
                    py="0.5"
                    bg={badgeColors.bg}
                    color={badgeColors.color}
                    fontWeight="normal"
                    whiteSpace="nowrap"
                    flexShrink="0"
                >
                    {category}
                </Badge>
            </Flex>
            <Flex
                align="center"
                gap="2"
                justify={{ base: 'space-between', md: 'flex-end' }}
                flex={{ base: 'none', md: '1' }}
            >
                <Flex align="center" gap="2">
                    <Text color="gray.400" fontSize="xs" whiteSpace="nowrap">
                        {date}
                    </Text>
                    <Badge
                        display={{ base: 'inline-flex', md: 'none' }}
                        borderRadius="full"
                        px="2"
                        py="0.5"
                        bg={badgeColors.bg}
                        color={badgeColors.color}
                        fontWeight="normal"
                        fontSize="xs"
                        whiteSpace="nowrap"
                    >
                        {category}
                    </Badge>
                </Flex>
                <Text
                    fontWeight="semibold"
                    fontSize="sm"
                    whiteSpace="nowrap"
                    flexShrink="0"
                    color="red"
                >
                    -₴{Math.abs(amount).toLocaleString('uk-UA')}
                </Text>
            </Flex>
        </Flex>
    );
};
