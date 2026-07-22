import { createListCollection } from '@chakra-ui/react';
import { SelectElement } from '../SelectElement';
import { CATEGORIES } from '../../../../data/categories';

const categoriesCollection = createListCollection({
    items: CATEGORIES,
    itemToString: (item) => item.label,
    itemToValue: (item) => item.value,
});

export const SelectCategory = ({ name }) => {
    return (
        <SelectElement
            data={categoriesCollection}
            selectPlaceholder={'Виберіть категорію'}
            name={name}
        />
    );
};
