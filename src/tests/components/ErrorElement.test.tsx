import { render } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

import { ErrorElement } from '@/components';

describe('ErrorElement', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <ChakraProvider value={defaultSystem}>
                <ErrorElement />
            </ChakraProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
