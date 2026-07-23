import {Box, Heading} from '@chakra-ui/react';
import {Link} from 'react-router';

export const NotFound = () => (
    <Box bg="gray.100" minH="100vh" p="8">
        <Heading color="black" textAlign="center">
            Такої сторінки не знайдено...
            <br/>
            <Link to="/">Повернутися назад</Link>
        </Heading>
    </Box>
);
