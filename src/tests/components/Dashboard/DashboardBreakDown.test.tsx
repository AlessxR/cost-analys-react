import { describe, it, expect } from 'vitest';

import { render } from '@testing-library/react';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { DashboardBreakDown } from '@/components';
import { ICategoryBreakdown } from '@/types';

const mockCategoryBreakDown: ICategoryBreakdown[] = [
    {
        label: 'Розваги',
        percent: 50,
        sum: 1440,
    },
    {
        label: 'Комунальні',
        percent: 50,
        sum: 1440,
    },
];

describe('DashboardBreakDown', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <ChakraProvider value={defaultSystem}>
                <DashboardBreakDown categoryBreakdown={mockCategoryBreakDown} />
            </ChakraProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
