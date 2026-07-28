import {
    ListCollection,
    Portal,
    Select,
    SelectValueChangeDetails,
} from '@chakra-ui/react';

type Props = {
    data: ListCollection;
    selectPlaceholder: string;
    name: string;
    value: string[];
    onValueChange: (details: SelectValueChangeDetails<string>) => void;
};

export const SelectElement = ({
    data,
    selectPlaceholder,
    name,
    value,
    onValueChange,
}: Props) => (
    <Select.Root
        collection={data}
        size="sm"
        width={{ base: 'auto', md: '320px' }}
        minW="0"
        flex="1"
        value={value}
        onValueChange={onValueChange}
    >
        <Select.HiddenSelect name={name} />
        <Select.Control>
            <Select.Trigger>
                <Select.ValueText placeholder={selectPlaceholder} />
            </Select.Trigger>
            <Select.IndicatorGroup>
                <Select.Indicator />
            </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
            <Select.Positioner>
                <Select.Content>
                    {data.items.map((item) => (
                        <Select.Item item={item} key={item.value}>
                            {item.label}
                            <Select.ItemIndicator />
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Positioner>
        </Portal>
    </Select.Root>
);
