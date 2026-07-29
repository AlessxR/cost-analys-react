import { render } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { DashboardCard } from '@/components';

describe('DashboardElement', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <ChakraProvider value={defaultSystem}>
                <DashboardCard title="title" value="test" subtitle="subtitle" />
            </ChakraProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
