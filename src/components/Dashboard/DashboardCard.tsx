import { ReactNode } from 'react';

import { Card, defineStyle, Text } from '@chakra-ui/react';

type Props = {
    title: string;
    value: ReactNode;
    subtitle?: string;
};

const textStyle = defineStyle({
    fontSize: 'sm',
    color: 'gray.500',
});

export const DashboardCard = ({ title, value, subtitle }: Props) => (
    <Card.Root bgColor="white" border="none">
        <Card.Body>
            <Text css={textStyle} mb="2">
                {title}
            </Text>
            <Text
                fontSize={{ base: '2xl', md: '3xl' }}
                color="black"
                fontWeight="semibold"
            >
                {value}
            </Text>
            {subtitle && <Text css={textStyle}>{subtitle}</Text>}
        </Card.Body>
    </Card.Root>
);
