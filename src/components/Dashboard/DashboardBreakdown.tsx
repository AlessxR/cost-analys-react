import { formatCurrency } from '@/lib/utils';
import { Box, HStack, Text, Flex } from '@chakra-ui/react';

export const DashboardBreakDown = ({ categoryBreakdown }) => (
    <Flex direction="column" gap="3">
        {categoryBreakdown.map((item) => (
            <HStack key={item.label} justify="space-between">
                <HStack gap="2">
                    <Box w="2.5" h="2.5" borderRadius="full" bg="black" />
                    <Text color="black">{item.label}</Text>
                </HStack>
                <HStack gap="3">
                    <Text color="black">{formatCurrency(item.sum)}</Text>
                    <Text color="black" w="12" textAlign="right">
                        {item.percent}%
                    </Text>
                </HStack>
            </HStack>
        ))}
    </Flex>
);
