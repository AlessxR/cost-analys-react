import { Text } from '@chakra-ui/react';

type Props = {
    children: React.ReactNode;
    totalSpent: number | string;
};

export const SectionTitle = ({ children, totalSpent }: Props) => (
    <Text
        fontWeight="semibold"
        color="black"
        mb="4"
        fontSize={{ base: 'sm', md: 'md' }}
    >
        {children}
        <Text
            as="span"
            float="right"
            fontWeight="normal"
            color="gray.500"
            fontSize={{ base: 'xs', md: 'sm' }}
        >
            {totalSpent}
        </Text>
    </Text>
);
