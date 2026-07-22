import { Header } from '../../components/Header/Header';
import { Dashboard } from '../../components/Dashboard/Dashboard';
import { Box } from '@chakra-ui/react';

export const MainPage = () => {
    return (
        <Box p="8">
            <Header titleHeader={'Огляд'} />
            <Dashboard />
        </Box>
    );
};
