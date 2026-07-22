import { Card, Text } from '@chakra-ui/react';

export const DashboardCard = ({ title, description, information }) => (
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
                {description}
            </Text>
            <Text fontSize="sm" color="gray.500" mt="1">
                {information}
            </Text>
        </Card.Body>
    </Card.Root>
);
