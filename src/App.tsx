import { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { fetchTransactions } from './store/transaction-slice';
import { fetchCategories } from './store/categories-slice';

import { Sidebar } from './components';

import { useAppDispatch } from './store/hooks';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTransactions());
        dispatch(fetchCategories());
    }, [dispatch]);

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
