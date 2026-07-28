import { render } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import { ErrorElement } from '../../components/index';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

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
