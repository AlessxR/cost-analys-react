import { render } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import { Preloader } from '../../components/index';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

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
