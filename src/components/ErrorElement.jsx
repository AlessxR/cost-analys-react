import { Container, Heading } from '@chakra-ui/react';

export const ErrorElement = () => (
    <Container textAlign="center" mt="20">
        <Heading color="black">
            Не вдалося завантажити дані. <br /> Спробуйте оновити сторінку.
        </Heading>
    </Container>
);
