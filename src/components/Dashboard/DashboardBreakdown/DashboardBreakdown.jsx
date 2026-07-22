import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, HStack, Text, Flex } from '@chakra-ui/react';
import { fetchTransactions } from '@/store/transaction-slice';
import { calculateCategoryBreakdown } from '@/lib/utils';

export const DashboardBreakDown = () => {
    const dispatch = useDispatch();
    const { transactions } = useSelector((state) => state.transactions);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

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
                            bg={item.color}
                        />
                        <Text color="black">{item.label}</Text>
                    </HStack>
                    <HStack gap="3">
                        <Text color="black">
                            ₴{item.sum.toLocaleString('uk-UA')}
                        </Text>
                        <Text color="black" w="10" textAlign="right">
                            {item.percent}%
                        </Text>
                    </HStack>
                </HStack>
            ))}
        </Flex>
    );
};
