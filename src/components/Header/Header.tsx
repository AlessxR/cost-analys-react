import { Flex, Heading } from '@chakra-ui/react';

import { AddButtonElement, SelectMonth } from '..';

type Props = {
    titleHeader: string;
};

export const Header = ({ titleHeader }: Props) => (
    <Flex
        direction={{ base: 'column', md: 'row' }}
        justify="space-between"
        align={{ base: 'stretch', md: 'center' }}
        gap={{ base: '3', md: '0' }}
    >
        <Heading color="black" size={{ base: 'lg', sm: 'xl', md: '3xl' }}>
            {titleHeader}
        </Heading>
        <Flex color="black" gap={2} align="center">
            <SelectMonth name="month" />
            <AddButtonElement />
        </Flex>
    </Flex>
);
