import { Card, Text } from '@chakra-ui/react';

type Props = {
    title: string;
    value: string;
    subtitle?: string;
};

export const DashboardCard = ({ title, value, subtitle }: Props) => (
    <Card.Root bgColor="white" border="none">
        <Card.Body>
            <Text fontSize="sm" color="gray.500" mb="2">
                {title}
            </Text>
            <Text
                fontSize={{ base: '2xl', md: '3xl' }}
                color="black"
                fontWeight="semibold"
            >
                {value}
            </Text>
            {subtitle && (
                <Text fontSize="sm" color="gray.500">
                    {subtitle}
                </Text>
            )}
        </Card.Body>
    </Card.Root>
);
