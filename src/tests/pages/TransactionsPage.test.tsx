import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';

import { render } from '@testing-library/react';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import store from '@/store';
import { TransactionsPage } from '@/pages';

describe('TransactionsPage', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <ChakraProvider value={defaultSystem}>
                    <TransactionsPage />
                </ChakraProvider>
            </Provider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
