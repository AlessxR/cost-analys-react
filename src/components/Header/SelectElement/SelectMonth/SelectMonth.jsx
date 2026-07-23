import { createListCollection } from '@chakra-ui/react';
import { SelectElement } from '../SelectElement';

const months = createListCollection({
    items: [
        { label: 'Червень', value: 'june2026' },
        { label: 'Липень', value: 'july2026' },
    ],
});

export const SelectMonth = ({ name }) => {
    return (
        <SelectElement
            data={months}
            selectPlaceholder={'Виберіть місяць'}
            name={name}
        />
    );
};
