import { createListCollection } from '@chakra-ui/react';
import { SelectElement } from '../SelectElement';

const categories = createListCollection({
    items: [
        { label: 'Продукти', value: 'products' },
        { label: 'Транспорт', value: 'transports' },
    ],
});

export const SelectCategory = ({ name }) => {
    return (
        <SelectElement
            data={categories}
            selectPlaceholder={'Виберіть категорію'}
            name={name}
        />
    );
};
