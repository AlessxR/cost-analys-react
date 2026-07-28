import { render } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import { NotFound } from '../../components/index';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router';

describe('NotFound', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <ChakraProvider value={defaultSystem}>
                    <NotFound />
                </ChakraProvider>
            </MemoryRouter>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
