import { NAV_ITEMS } from '../../data/sidebar';
import { Box, Flex, HStack, Text as ChakraText } from '@chakra-ui/react';

export const Sidebar = () => (
    <Box w="220px" bg="white" p="4" h="100vh">
        <ChakraText fontWeight="bold" fontSize="lg" mb="6" px="2" color="black">
            Бюджет
        </ChakraText>
        <Flex direction="column" gap="1">
            {NAV_ITEMS.map((item) => (
                <HStack
                    key={item.id}
                    px="3"
                    py="2"
                    borderRadius="md"
                    bg={item.active ? 'green.600' : 'transparent'}
                    color={item.active ? 'black' : 'gray.400'}
                >
                    <item.icon />
                    <ChakraText>{item.label}</ChakraText>
                </HStack>
            ))}
        </Flex>
    </Box>
);
