import { describe, it, expect, vi } from 'vitest';

import { Provider } from 'react-redux';

import { render } from '@testing-library/react';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Dashboard } from '@/components';
import store from '@/store';
import { useDashboard } from '@/hooks/useDashboard';
import { ITransaction } from '@/types';

vi.mock('@/hooks/useDashboard');

const mockUseDashboard = vi.mocked(useDashboard);

const defaultResult = {
    transactions: [] as ITransaction[],
    categoryBreakdown: [],
    monthTransactions: [],
    fetchStatus: 'loading' as const,
    totalSpent: 0,
    topCategory: null,
};

describe('Dashboard', () => {
    it('should match snapshot when loading', () => {
        mockUseDashboard.mockReturnValue(defaultResult);

        const { asFragment } = render(
            <ChakraProvider value={defaultSystem}>
                <Dashboard />
            </ChakraProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
