import { Provider } from 'react-redux';
import { describe, it, expect } from 'vitest';

import { render } from '@testing-library/react';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import store from '@/store';
import { TransactionRow } from '@/components';

describe('TransactionRow', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <Provider store={store}>
                <ChakraProvider value={defaultSystem}>
                    <TransactionRow
                        date="july26"
                        amount={500}
                        category="Продукти"
                        title="магазинчик"
                    />
                </ChakraProvider>
            </Provider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
