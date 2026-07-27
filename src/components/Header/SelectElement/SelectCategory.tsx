import { createListCollection, ListCollection } from '@chakra-ui/react';

import { SelectElement } from '@/components';
import { useAppSelector } from '@/store/hooks';

type Props = {
    name: string;
    value: string[];
    onValueChange: (value: string) => void;
};

export const SelectCategory = ({ name, value, onValueChange }: Props) => {
    const { categories } = useAppSelector((state) => state.categories);

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
