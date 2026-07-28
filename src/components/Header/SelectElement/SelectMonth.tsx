import { createListCollection } from '@chakra-ui/react';

import { uiActions } from '@/store/ui-slice';

import { generateMonthItems } from '@/lib/utils';

import { SelectElement } from './SelectElement';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const months = createListCollection({
    items: generateMonthItems(12),
});

type Props = {
    name: string;
};

export const SelectMonth = ({ name }: Props) => {
    const dispatch = useAppDispatch();
    const { selectedMonth } = useAppSelector((state) => state.ui);

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
