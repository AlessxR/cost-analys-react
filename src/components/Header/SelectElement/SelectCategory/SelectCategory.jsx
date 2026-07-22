import { createListCollection } from '@chakra-ui/react';

import { CATEGORIES } from '../../../../data/categories';
import { SelectElement } from '../SelectElement';

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
