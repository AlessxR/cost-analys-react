import { Box, Flex, Heading } from '@chakra-ui/react';
import { AddButtonElement } from './AddButtonElement/AddButtonElement';
import { SelectMonth } from './SelectElement/SelectMonth/SelectMonth';

export const Header = ({ titleHeader }) => {
    return (
        <Flex justifyContent={'space-between'}>
            <Box>
                <Heading color="black" size="3xl">
                    {titleHeader}
                </Heading>
            </Box>
            <Flex color="black" gap={5}>
                <SelectMonth name="month" />
                <AddButtonElement />
            </Flex>
        </Flex>
    );
};
