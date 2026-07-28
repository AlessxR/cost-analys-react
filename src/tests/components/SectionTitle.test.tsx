import { render } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import { SectionTitle } from '../../components/index';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

describe('SectionTitle', () => {
    it('should match snapshot with children and totalSpent', () => {
        const { asFragment } = render(
            <ChakraProvider value={defaultSystem}>
                <SectionTitle totalSpent="1200 UAH">Expenses</SectionTitle>
            </ChakraProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
