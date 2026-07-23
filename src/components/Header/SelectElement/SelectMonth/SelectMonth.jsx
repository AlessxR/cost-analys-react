import { createListCollection } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { SelectElement } from '../SelectElement';
import { uiActions } from '@/store/month-slice';

const months = createListCollection({
    items: [
        { label: 'Червень', value: 'june2026' },
        { label: 'Липень', value: 'july2026' },
    ],
});

export const SelectMonth = ({ name }) => {
    const dispatch = useDispatch();
    const { selectedMonth } = useSelector((state) => state.ui);

    return (
        <SelectElement
            data={months}
            selectPlaceholder={'Виберіть місяць'}
            name={name}
            value={[selectedMonth]}
            onValueChange={(details) =>
                dispatch(uiActions.setSelectedMonth(details.value[0]))
            }
        />
    );
};
