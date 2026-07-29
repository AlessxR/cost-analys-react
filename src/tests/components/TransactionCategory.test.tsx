import { fireEvent, render } from '@testing-library/react';

import { describe, it, expect } from 'vitest';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ICategory } from '@/types';
import { TransactionCategory } from '@/components';

const mockCategories: ICategory = {
    label: 'Розваги',
    value: 'Розваги',
};

describe('TransactionCategory', () => {
    it('should match snapshot when active', () => {
        const { asFragment } = render(
            <ChakraProvider value={defaultSystem}>
                <TransactionCategory
                    category={mockCategories}
                    isActive={true}
                    onClick={vi.fn()}
                />
            </ChakraProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot without active', () => {
        const { asFragment } = render(
            <ChakraProvider value={defaultSystem}>
                <TransactionCategory
                    category={mockCategories}
                    isActive={false}
                    onClick={vi.fn()}
                />
            </ChakraProvider>,
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('should match snapshot with click on button', () => {
        const onClick = vi.fn();
        const { getByRole } = render(
            <ChakraProvider value={defaultSystem}>
                <TransactionCategory
                    category={mockCategories}
                    isActive={false}
                    onClick={onClick}
                />
            </ChakraProvider>,
        );
        fireEvent.click(getByRole('button'));
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
