import { render } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import { createListCollection } from '@chakra-ui/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

import { SelectElement } from '@/components';

const mockData = createListCollection({
    items: [
        { label: 'Продукти', value: 'Продукти' },
        { label: 'Транспорт', value: 'Транспорт' },
    ],
});

describe('SelectElement', () => {
    it('should match snapshot', () => {
        const { asFragment } = render(
            <ChakraProvider value={defaultSystem}>
                <SelectElement
                    data={mockData}
                    selectPlaceholder="Оберіть..."
                    name="category"
                    value={[]}
                    onValueChange={() => {}}
                />
            </ChakraProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
