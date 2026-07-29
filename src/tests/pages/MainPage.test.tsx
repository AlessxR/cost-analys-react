import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';

import { render } from '@testing-library/react';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import store from '@/store';
import { MainPage } from '@/pages';

describe('MainPage', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <ChakraProvider value={defaultSystem}>
                    <MainPage />
                </ChakraProvider>
            </Provider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
