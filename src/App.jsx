import './App.css';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Box, Flex } from '@chakra-ui/react';
import { MainPage } from './pages/MainPage/MainPage';
import { TransactionsPage } from './pages/TransactionPage/TransactionPage';

export const App = () => {
    return (
        <Flex bg="gray.100" minH="100vh">
            <Sidebar />
            <Box flex="1">
                <MainPage />
            </Box>
        </Flex>
    );
};

export default App;
