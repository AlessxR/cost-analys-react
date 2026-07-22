import { Box } from '@chakra-ui/react';

export const TransactionCategory = ({ category, isActive, onClick }) => (
    <Box
        onClick={onClick}
        px="4"
        py="1.5"
        borderRadius="full"
        fontSize="sm"
        cursor="pointer"
        bg={isActive ? 'gray.900' : 'white'}
        color={isActive ? 'white' : 'gray.700'}
        border="1px solid"
        borderColor={isActive ? 'gray.900' : 'gray.200'}
    >
        {category.label}
    </Box>
);
