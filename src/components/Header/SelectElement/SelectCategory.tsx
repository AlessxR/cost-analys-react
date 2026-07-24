import { createListCollection } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { SelectElement } from '@/components';

type Props = {
    name: string;
    value: string;
    onValueChange: () => void;
};

export const SelectCategory = ({ name, value, onValueChange }: Props) => {
    const { categories } = useSelector((state) => state.categories);

    const categoriesCollection = createListCollection({
        items: categories ?? [],
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
    });

    return (
        <SelectElement
            data={categoriesCollection}
            selectPlaceholder={'Виберіть категорію'}
            name={name}
            value={value}
            onValueChange={onValueChange}
        />
    );
};
