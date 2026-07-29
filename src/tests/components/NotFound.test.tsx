import { render } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router';

import { NotFound } from '@/components';

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
