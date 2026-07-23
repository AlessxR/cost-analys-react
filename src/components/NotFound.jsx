import { Heading } from '@chakra-ui/react';
import { Link } from 'react-router';

export const NotFound = () => (
    <Heading color="white" textAlign={'center'}>
        Такої сторінки не знайдено...
        <Link to="/">Повернутися назад</Link>
    </Heading>
);
