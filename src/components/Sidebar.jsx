import { useState } from 'react';
import { NavLink } from 'react-router';
import { FiMenu, FiX } from 'react-icons/fi';

import {
    Box,
    Flex,
    HStack,
    IconButton,
    Text as ChakraText,
} from '@chakra-ui/react';
import { NAV_ITEMS } from '@/data';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <IconButton
                aria-label="Меню"
                color="black"
                display={{ base: 'flex', md: 'none' }}
                position="fixed"
                top="4"
                left="4"
                zIndex="20"
                bgColor="white"
                size="sm"
                onClick={() => setIsOpen(true)}
            >
                <FiMenu />
            </IconButton>

            {isOpen && (
                <Box
                    display={{ base: 'block', md: 'none' }}
                    position="fixed"
                    inset="0"
                    bg="blackAlpha.400"
                    zIndex="30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <Box
                w="220px"
                bg="white"
                p="4"
                h="100vh"
                position="fixed"
                top="0"
                left="0"
                zIndex="40"
                transform={{
                    base: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                    md: 'translateX(0)',
                }}
                transition="transform 0.2s ease"
            >
                <HStack justify="space-between" mb="6">
                    <ChakraText
                        fontWeight="bold"
                        fontSize="lg"
                        px="2"
                        color="black"
                    >
                        Аналіз витрат
                    </ChakraText>
                    <IconButton
                        aria-label="Закрити меню"
                        icon={<FiX />}
                        display={{ base: 'flex', md: 'none' }}
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsOpen(false)}
                    />
                </HStack>
                <Flex direction="column" gap="1">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            to={item.id}
                            key={item.id}
                            onClick={() => setIsOpen(false)}
                        >
                            {({ isActive }) => (
                                <HStack
                                    px="3"
                                    py="2"
                                    borderRadius="md"
                                    bg={isActive ? 'green.600' : 'transparent'}
                                    color={isActive ? 'black' : 'gray.400'}
                                >
                                    <item.icon />
                                    <ChakraText>{item.label}</ChakraText>
                                </HStack>
                            )}
                        </NavLink>
                    ))}
                </Flex>
            </Box>
        </>
    );
};
