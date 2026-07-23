import { Box } from '@chakra-ui/react';

export const TransactionCategory = ({ category, isActive, onClick }) => (
    <Box
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onClick?.(e);
        }}
        onClick={onClick}
        px={{ base: '3', md: '4' }}
        py={{ base: '1', md: '1.5' }}
        borderRadius="full"
        fontSize={{ base: 'xs', md: 'sm' }}
        cursor="pointer"
        whiteSpace="nowrap"
        flexShrink="0"
        bg={isActive ? 'gray.900' : 'white'}
        color={isActive ? 'white' : 'gray.700'}
        border="1px solid"
        borderColor={isActive ? 'gray.900' : 'gray.200'}
    >
        {category.label}
    </Box>
);
