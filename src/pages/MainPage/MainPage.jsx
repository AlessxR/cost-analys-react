import { Dashboard } from '@/components/Dashboard/Dashboard';
import { Header } from '@/components/Header/Header';

import { Box } from '@chakra-ui/react';

export const MainPage = () => {
    return (
        <Box p={{ base: '4', md: '8' }}>
            <Header titleHeader={'Огляд'} />
            <Dashboard />
        </Box>
    );
};
