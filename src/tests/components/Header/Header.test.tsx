import { render } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '@/store';

import { Header } from '@/components';

describe('HeaderElement', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <ChakraProvider value={defaultSystem}>
                    <Header titleHeader="header" />
                </ChakraProvider>
            </Provider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
