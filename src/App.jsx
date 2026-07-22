import { Sidebar } from './components/Sidebar/Sidebar';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router';

const App = () => {
    return (
        <Flex bg="gray.100" minH="100vh">
            <Sidebar />
            <Box flex="1" ml={{ base: '0', md: '220px' }}>
                <Outlet />
            </Box>
        </Flex>
    );
};

export default App;
