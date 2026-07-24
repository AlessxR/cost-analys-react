import { Box, HStack, Text, Flex } from '@chakra-ui/react';

import { calculateCategoryBreakdown } from '@/lib/utils';

export const DashboardBreakDown = ({ transactions }) => {
    const categoryBreakdown = calculateCategoryBreakdown(transactions);

    return (
        <Flex direction="column" gap="3">
            {categoryBreakdown.map((item) => (
                <HStack key={item.label} justify="space-between">
                    <HStack gap="2">
                        <Box
                            w="2.5"
                            h="2.5"
                            borderRadius="full"
                            color="white"
                            bg="black"
                        />
                        <Text color="black">{item.label}</Text>
                    </HStack>
                    <HStack gap="3">
                        <Text color="black">
                            ₴{item.sum.toLocaleString('uk-UA')}
                        </Text>
                        <Text color="black" w="12" textAlign="right">
                            {item.percent}%
                        </Text>
                    </HStack>
                </HStack>
            ))}
        </Flex>
    );
};
