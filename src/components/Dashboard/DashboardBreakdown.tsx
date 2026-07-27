import { formatCurrency } from '@/lib/utils';
import { CategoryBreakdown } from '@/types';
import { Box, HStack, Text, Flex } from '@chakra-ui/react';

type Props = {
    categoryBreakdown: CategoryBreakdown[];
};

export const DashboardBreakDown = ({ categoryBreakdown }: Props) => (
    <Flex direction="column" gap="3">
        {categoryBreakdown.map((category) => (
            <HStack key={category.label} justify="space-between">
                <HStack gap="2">
                    <Box w="2.5" h="2.5" borderRadius="full" bg="black" />
                    <Text color="black">{category.label}</Text>
                </HStack>
                <HStack gap="3">
                    <Text color="black">{formatCurrency(category.sum)}</Text>
                    <Text color="black" w="12" textAlign="right">
                        {category.percent}%
                    </Text>
                </HStack>
            </HStack>
        ))}
    </Flex>
);
