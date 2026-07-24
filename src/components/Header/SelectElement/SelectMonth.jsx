import { createListCollection } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '@/store/ui-slice';
import { SelectElement } from './SelectElement';
import { generateMonthItems } from '@/lib/utils';

const months = createListCollection({
    items: generateMonthItems(12),
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
