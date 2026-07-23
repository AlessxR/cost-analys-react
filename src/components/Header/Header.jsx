import { Flex, Heading } from '@chakra-ui/react';
import { SelectMonth } from './SelectElement/SelectMonth/SelectMonth';
import { AddButtonElement } from './AddButtonElement/AddButtonElement';

export const Header = ({ titleHeader }) => {
    return (
        <Flex
            justifyContent="space-between"
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'stretch', md: 'center' }}
            gap={{ base: '4', md: '0' }}
        >
            <Heading color="black" size={{ base: 'xl', md: '3xl' }}>
                {titleHeader}
            </Heading>
            <Flex color="black" gap={3} wrap="wrap">
                <SelectMonth name="month" />
                <AddButtonElement />
            </Flex>
        </Flex>
    );
};
