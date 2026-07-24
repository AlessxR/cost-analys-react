import { Portal, Select } from '@chakra-ui/react';

export const SelectElement = ({
    data,
    selectPlaceholder,
    name,
    value,
    onValueChange,
}) => (
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
