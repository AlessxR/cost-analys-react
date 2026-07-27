import { Dashboard, Header } from '@/components';
import { Box } from '@chakra-ui/react';

export const MainPage = () => (
    <Box p={{ base: '4', md: '8' }}>
        <Header titleHeader={'Огляд'} />
        <Dashboard />
    </Box>
);
