import { render } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

import { Preloader } from '@/components';

describe('Preloader', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <ChakraProvider value={defaultSystem}>
                <Preloader />
            </ChakraProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
