import { render } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { DashboardChart } from '@/components';
import { ITransaction } from '@/types';

const mockTransactions: ITransaction[] = [
    {
        id: '1',
        amount: 500,
        category: 'Комунальні',
        date: '2026-09-15',
        title: 'Світло',
    },
];

describe('DashboardChart', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <ChakraProvider value={defaultSystem}>
                <DashboardChart transactions={mockTransactions} />
            </ChakraProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
