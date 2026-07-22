import { CATEGORIES } from '@/data';
import { createListCollection } from '@chakra-ui/react';
import { SelectElement } from '../SelectElement';

const categoriesCollection = createListCollection({
    items: CATEGORIES,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
});

export const SelectCategory = ({ name }) => (
    <SelectElement
        data={categoriesCollection}
        selectPlaceholder={'Виберіть категорію'}
        name={name}
    />
);
