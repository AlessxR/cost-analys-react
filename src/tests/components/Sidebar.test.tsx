import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

import { Sidebar } from '@/components';

describe('Sidebar', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <ChakraProvider value={defaultSystem}>
                    <Sidebar />
                </ChakraProvider>
            </MemoryRouter>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
