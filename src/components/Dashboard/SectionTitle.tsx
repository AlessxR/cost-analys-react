import { Text } from '@chakra-ui/react';

type Props = {
    children: React.ReactNode;
    extra: string;
};

export const SectionTitle = ({ children, extra }: Props) => (
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
            {extra}
        </Text>
    </Text>
);
